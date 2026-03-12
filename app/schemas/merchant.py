from pydantic import BaseModel, EmailStr


class MerchantOut(BaseModel):
    id: int
    email: EmailStr
    phone: str
    kyc_status: str
    mode: str
    daily_limit_kurus: int

    model_config = {"from_attributes": True}


class MerchantDashboardOut(BaseModel):
    total_amount: int
    active_links: int
    successful_payments: int