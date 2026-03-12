import hashlib
import hmac

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.models.payment_link import PaymentLink, PaymentStatus
from app.db.models.transaction import Transaction


def verify_test_signature(body: bytes, signature: str) -> bool:
    expected = hmac.new(
        settings.WEBHOOK_TEST_SECRET.encode("utf-8"),
        body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


def _calculate_fee(amount_kurus: int, bps: int) -> int:
    return round(amount_kurus * bps / 10000)


async def mark_paid(db: AsyncSession, public_id: str, provider_event_id: str | None, raw_payload: dict):
    res = await db.execute(select(PaymentLink).where(PaymentLink.public_id == public_id))
    link = res.scalar_one_or_none()
    if not link:
        raise ValueError("Payment link bulunamadı")

    if provider_event_id:
        r2 = await db.execute(select(Transaction).where(Transaction.provider_event_id == provider_event_id))
        if r2.scalar_one_or_none():
            return link

    if link.status == PaymentStatus.PAID:
        return link

    amount_kurus = link.amount_kurus
    provider_fee_kurus = _calculate_fee(amount_kurus, settings.PROVIDER_COMMISSION_BPS)
    platform_fee_kurus = _calculate_fee(amount_kurus, settings.PLATFORM_COMMISSION_BPS)
    merchant_net_kurus = max(amount_kurus - provider_fee_kurus - platform_fee_kurus, 0)

    link.status = PaymentStatus.PAID

    tx = Transaction(
        payment_link_id=link.id,
        provider_event_id=provider_event_id,
        status="SUCCESS",
        amount_kurus=amount_kurus,
        provider_fee_kurus=provider_fee_kurus,
        platform_fee_kurus=platform_fee_kurus,
        merchant_net_kurus=merchant_net_kurus,
        raw_payload=raw_payload,
    )
    db.add(tx)
    await db.commit()
    await db.refresh(link)
    return link
