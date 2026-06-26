from pydantic import BaseModel
from app.models.payment import PaymentMethod, PaymentStatus


class PaymentRecord(BaseModel):
    order_id: str
    method: PaymentMethod
    transaction_ref: str | None = None


class PaymentOut(BaseModel):
    id: str
    order_id: str
    method: PaymentMethod
    status: PaymentStatus
    amount: float
    transaction_ref: str | None

    class Config:
        from_attributes = True
