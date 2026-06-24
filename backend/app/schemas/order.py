from datetime import datetime
from pydantic import BaseModel


class OrderItemCreate(BaseModel):
    service_id: str
    quantity: float


class OrderCreate(BaseModel):
    pickup_address: str
    delivery_address: str
    pickup_time: datetime
    delivery_time: datetime | None = None
    notes: str | None = None
    items: list[OrderItemCreate]


class OrderItemOut(BaseModel):
    id: str
    service_id: str
    quantity: float
    unit_price: float
    subtotal: float

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: str
    status: str
    pickup_address: str
    delivery_address: str
    pickup_time: datetime | None
    delivery_time: datetime | None
    total_amount: float
    notes: str | None
    items: list[OrderItemOut]

    class Config:
        from_attributes = True
