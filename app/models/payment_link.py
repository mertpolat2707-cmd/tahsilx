from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.base import Base


class PaymentLink(Base):
    __tablename__ = "payment_links"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    public_id = Column(String, unique=True, index=True)
    title = Column(String)
    amount_kurus = Column(Integer)
    status = Column(String, default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)