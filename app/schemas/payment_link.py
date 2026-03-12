from datetime import datetime
from pydantic import BaseModel, Field


class PaymentLinkCreateIn(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    amount_tl: float = Field(gt=0)
    quantity: int = Field(default=1, ge=1, le=999)
    description: str | None = None
    customer_name: str | None = None
    customer_phone: str | None = None
    refund_policy: str | None = None
    delivery_info: str | None = None


class PaymentLinkOut(BaseModel):
    id: int
    public_id: str
    title: str
    amount_kurus: int
    currency: str
    quantity: int
    status: str
    provider: str
    share_count: int
    created_at: datetime
    expires_at: datetime

    model_config = {"from_attributes": True}


class PaymentLinkPublicOut(BaseModel):
    public_id: str
    title: str
    description: str | None
    amount_kurus: int
    currency: str
    quantity: int
    refund_policy: str | None
    delivery_info: str | None
    status: str
    expires_at: datetime
