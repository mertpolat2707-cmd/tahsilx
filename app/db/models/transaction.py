from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    payment_link_id: Mapped[int] = mapped_column(ForeignKey("payment_links.id"), index=True)

    provider_event_id: Mapped[str | None] = mapped_column(String(128), nullable=True, index=True)
    status: Mapped[str] = mapped_column(String(32))
    amount_kurus: Mapped[int] = mapped_column(Integer, default=0)
    provider_fee_kurus: Mapped[int] = mapped_column(Integer, default=0)
    platform_fee_kurus: Mapped[int] = mapped_column(Integer, default=0)
    merchant_net_kurus: Mapped[int] = mapped_column(Integer, default=0)
    raw_payload: Mapped[dict] = mapped_column(JSON)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
