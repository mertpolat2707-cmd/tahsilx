from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_token
from app.db.models.merchant import Merchant
from app.db.session import get_db
from app.schemas.merchant import MerchantDashboardOut
from app.schemas.payment_link import PaymentLinkCreateIn, PaymentLinkOut
from app.services.payment_service import create_payment_link, get_merchant_dashboard, list_links

router = APIRouter(prefix="/payment-links", tags=["payment-links"])
bearer = HTTPBearer()


async def get_current_merchant(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
    db: AsyncSession = Depends(get_db),
) -> Merchant:
    payload = decode_token(creds.credentials)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Geçersiz token")

    merchant_id = int(payload["sub"])
    res = await db.execute(select(Merchant).where(Merchant.id == merchant_id))
    merchant = res.scalar_one_or_none()
    if not merchant:
        raise HTTPException(status_code=401, detail="Kullanıcı bulunamadı")
    return merchant


@router.post("", response_model=PaymentLinkOut)
async def create_link(
    body: PaymentLinkCreateIn,
    merchant: Merchant = Depends(get_current_merchant),
    db: AsyncSession = Depends(get_db),
):
    try:
        link = await create_payment_link(
            db=db,
            merchant=merchant,
            title=body.title,
            amount_tl=body.amount_tl,
            quantity=body.quantity,
            description=body.description,
            customer_name=body.customer_name,
            customer_phone=body.customer_phone,
            refund_policy=body.refund_policy,
            delivery_info=body.delivery_info,
        )
        return link
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("", response_model=list[PaymentLinkOut])
async def get_links(
    status: str | None = Query(default=None, description="PENDING veya PAID gibi"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    merchant: Merchant = Depends(get_current_merchant),
    db: AsyncSession = Depends(get_db),
):
    links = await list_links(db, merchant.id, status, limit, offset)
    return links


@router.get("/dashboard", response_model=MerchantDashboardOut)
async def dashboard(
    merchant: Merchant = Depends(get_current_merchant),
    db: AsyncSession = Depends(get_db),
):
    return await get_merchant_dashboard(db, merchant.id)
