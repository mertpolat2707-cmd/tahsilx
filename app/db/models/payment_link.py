import enum
from datetime import datetime, timedelta
import secrets

from sqlalchemy import String, DateTime, Enum, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class PaymentStatus(str, enum.Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    FAILED = "FAILED"
    CANCELED = "CANCELED"
    EXPIRED = "EXPIRED"


class Provider(str, enum.Enum):
    TEST = "TEST"
    PAYTR = "PAYTR"
    IYZICO = "IYZICO"


def generate_public_id() -> str:
    return secrets.token_urlsafe(8).replace("-", "").replace("_", "")[:12]


class PaymentLink(Base):
    __tablename__ = "payment_links"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    merchant_id: Mapped[int] = mapped_column(ForeignKey("merchants.id"), index=True)
    merchant = relationship("Merchant", backref="payment_links")

    public_id: Mapped[str] = mapped_column(String(32), unique=True, index=True, default=generate_public_id)

    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    amount_kurus: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(8), default="TRY")
    quantity: Mapped[int] = mapped_column(Integer, default=1)

    customer_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    customer_phone: Mapped[str | None] = mapped_column(String(32), nullable=True)

    refund_policy: Mapped[str | None] = mapped_column(Text, nullable=True)
    delivery_info: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[PaymentStatus] = mapped_column(Enum(PaymentStatus), default=PaymentStatus.PENDING, index=True)
    provider: Mapped[Provider] = mapped_column(Enum(Provider), default=Provider.TEST)

    provider_payment_id: Mapped[str | None] = mapped_column(String(128), nullable=True)

    share_count: Mapped[int] = mapped_column(Integer, default=0)
    last_shared_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    expires_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.utcnow() + timedelta(days=7))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)