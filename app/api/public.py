from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import HTMLResponse, PlainTextResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.payment_link import PaymentLink
from app.services.paytr_service import create_iframe_token, verify_callback_hash

router = APIRouter(prefix="/public", tags=["public"])


def render_error_page(title: str, message: str, status_code: int = 400) -> HTMLResponse:
    html = f"""
    <!doctype html>
    <html lang="tr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{title} - Paylind</title>
        <style>
            html, body {{
                margin: 0;
                padding: 0;
                background: #f5f7fb;
                font-family: Arial, sans-serif;
                color: #111827;
            }}
            .container {{
                max-width: 720px;
                margin: 60px auto;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(0,0,0,.08);
                overflow: hidden;
            }}
            .header {{
                padding: 24px 28px;
                border-bottom: 1px solid #e5e7eb;
            }}
            .brand {{
                font-size: 26px;
                font-weight: 800;
                margin: 0;
            }}
            .content {{
                padding: 28px;
            }}
            .title {{
                font-size: 22px;
                font-weight: 700;
                margin: 0 0 12px 0;
            }}
            .message {{
                color: #4b5563;
                font-size: 15px;
                line-height: 1.6;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="brand">Paylind</div>
            </div>
            <div class="content">
                <div class="title">{title}</div>
                <div class="message">{message}</div>
            </div>
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html, status_code=status_code)


@router.get("/pay/{public_id}", response_class=HTMLResponse)
async def open_payment_page(
    public_id: str,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> HTMLResponse:
    stmt = select(PaymentLink).where(PaymentLink.public_id == public_id)
    result = await db.execute(stmt)
    link = result.scalars().first()

    if not link:
        return render_error_page(
            title="Ödeme Linki Bulunamadı",
            message="Bu ödeme linki bulunamadı veya kaldırılmış olabilir.",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    user_ip = request.client.host if request.client else "127.0.0.1"

    try:
        token_response = create_iframe_token(
            merchant_oid=link.public_id,
            email="customer@test.com",
            payment_amount=link.amount_kurus,
            user_name="Customer",
            user_address="Istanbul",
            user_phone="5555555555",
            user_ip=user_ip,
            title=link.title,
        )
    except Exception as exc:
        return render_error_page(
            title="Ödeme Sistemi Hatası",
            message=f"PayTR token isteği başarısız oldu: {str(exc)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    if token_response.get("status") != "success":
        reason = token_response.get("reason", "Bilinmeyen hata")
        return render_error_page(
            title="Ödeme Başlatılamadı",
            message=f"PayTR token alınamadı: {reason}",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    iframe_token = token_response.get("token")
    if not iframe_token:
        return render_error_page(
            title="Ödeme Başlatılamadı",
            message="PayTR token cevabında geçerli bir token bulunamadı.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    amount_tl = f"{link.amount_kurus / 100:.2f}"

    html = f"""
    <!doctype html>
    <html lang="tr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{link.title} - Paylind</title>
        <style>
            html, body {{
                margin: 0;
                padding: 0;
                background: #f5f7fb;
                font-family: Arial, sans-serif;
                color: #111827;
            }}
            .container {{
                max-width: 980px;
                margin: 24px auto;
                background: #fff;
                border-radius: 18px;
                box-shadow: 0 12px 32px rgba(0,0,0,.08);
                overflow: hidden;
            }}
            .header {{
                padding: 24px 28px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
                flex-wrap: wrap;
            }}
            .brand {{
                font-size: 28px;
                font-weight: 800;
                margin: 0;
            }}
            .subtitle {{
                color: #6b7280;
                font-size: 14px;
                margin-top: 4px;
            }}
            .summary {{
                text-align: right;
            }}
            .summary-title {{
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 4px;
            }}
            .summary-amount {{
                font-size: 28px;
                font-weight: 800;
            }}
            .content {{
                padding: 0;
            }}
            .iframe-wrap {{
                padding: 0;
                background: #fff;
            }}
            iframe {{
                display: block;
                width: 100%;
                min-height: 820px;
                border: 0;
            }}
            .footer {{
                padding: 16px 24px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 13px;
                background: #fafafa;
            }}
            @media (max-width: 640px) {{
                .summary {{
                    text-align: left;
                }}
                .summary-amount {{
                    font-size: 24px;
                }}
                iframe {{
                    min-height: 720px;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div>
                    <div class="brand">Paylind</div>
                    <div class="subtitle">Güvenli ödeme ekranı</div>
                </div>
                <div class="summary">
                    <div class="summary-title">{link.title}</div>
                    <div class="summary-amount">{amount_tl} TL</div>
                </div>
            </div>

            <div class="content">
                <div class="iframe-wrap">
                    <iframe
                        src="https://www.paytr.com/odeme/guvenli/{iframe_token}"
                        scrolling="no"
                        title="Paylind Güvenli Ödeme">
                    </iframe>
                </div>
            </div>

            <div class="footer">
                Bu ödeme sayfası Paylind altyapısı üzerinden güvenli şekilde sunulmaktadır.
            </div>
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html)


@router.post("/paytr/callback")
async def paytr_callback(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> PlainTextResponse:
    form_data = await request.form()

    merchant_oid = form_data.get("merchant_oid")
    status_value = form_data.get("status")
    total_amount = form_data.get("total_amount")
    hash_value = form_data.get("hash")

    if not merchant_oid or not status_value or not total_amount or not hash_value:
        return PlainTextResponse("BAD REQUEST", status_code=400)

    if not verify_callback_hash(merchant_oid, status_value, total_amount, hash_value):
        return PlainTextResponse("HASH ERROR", status_code=400)

    stmt = select(PaymentLink).where(PaymentLink.public_id == merchant_oid)
    result = await db.execute(stmt)
    link = result.scalars().first()

    if not link:
        return PlainTextResponse("OK")

    if status_value == "success":
        link.status = "PAID"
        await db.commit()

    return PlainTextResponse("OK")