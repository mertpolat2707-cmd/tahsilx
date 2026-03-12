import uuid
from sqlalchemy import select, func

from app.db.models.payment_link import PaymentLink


async def create_payment_link(
    db,
    merchant,
    title,
    amount_tl,
    quantity=1,
    description=None,
    expires_at=None,
    installment=None,
    category=None,
    customer_name=None,
    customer_phone=None,
    delivery_info=None,
    refund_policy=None,
    provider="TEST",
    provider_payment_id=None,
    share_count=0,
    currency="TRY",
    **kwargs,
):
    link = PaymentLink(
        public_id=str(uuid.uuid4()),
        merchant_id=merchant.id,
        title=title,
        description=description,
        amount_kurus=int(amount_tl * 100),
        currency=currency,
        quantity=quantity,
        customer_name=customer_name,
        customer_phone=customer_phone,
        delivery_info=delivery_info,
        refund_policy=refund_policy,
        status="PENDING",
        provider=provider,
        provider_payment_id=provider_payment_id,
        share_count=share_count,
        expires_at=expires_at,
    )

    db.add(link)
    await db.commit()
    await db.refresh(link)

    return link


async def list_links(db, merchant_id, status=None, limit=20, offset=0):
    query = (
        select(PaymentLink)
        .where(PaymentLink.merchant_id == merchant_id)
        .order_by(PaymentLink.created_at.desc())
    )

    if status:
        query = query.where(PaymentLink.status == status)

    query = query.offset(offset).limit(limit)

    result = await db.execute(query)
    return result.scalars().all()


async def get_merchant_dashboard(db, merchant_id):
    total_amount_result = await db.execute(
        select(func.coalesce(func.sum(PaymentLink.amount_kurus), 0)).where(
            PaymentLink.merchant_id == merchant_id
        )
    )
    total_amount_kurus = total_amount_result.scalar() or 0

    active_links_result = await db.execute(
        select(func.count(PaymentLink.id)).where(
            PaymentLink.merchant_id == merchant_id,
            PaymentLink.status == "PENDING",
        )
    )
    active_links = active_links_result.scalar() or 0

    successful_payments_result = await db.execute(
        select(func.count(PaymentLink.id)).where(
            PaymentLink.merchant_id == merchant_id,
            PaymentLink.status == "PAID",
        )
    )
    successful_payments = successful_payments_result.scalar() or 0

    return {
        "total_amount": total_amount_kurus // 100,
        "active_links": active_links,
        "successful_payments": successful_payments,
    }