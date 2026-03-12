import enum
from datetime import datetime

from sqlalchemy import String, DateTime, Enum, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class KycStatus(str, enum.Enum):
    NONE = "NONE"
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class Mode(str, enum.Enum):
    TEST = "TEST"
    LIVE = "LIVE"


class Merchant(Base):
    __tablename__ = "merchants"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    phone: Mapped[str] = mapped_column(String(32), index=True)
    password_hash: Mapped[str] = mapped_column(String(255))

    kyc_status: Mapped[KycStatus] = mapped_column(Enum(KycStatus), default=KycStatus.NONE)
    mode: Mapped[Mode] = mapped_column(Enum(Mode), default=Mode.TEST)

    daily_limit_kurus: Mapped[int] = mapped_column(Integer, default=200_000)  # 2,000 TL
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)