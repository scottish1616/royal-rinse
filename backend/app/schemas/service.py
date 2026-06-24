from pydantic import BaseModel


class ServiceOut(BaseModel):
    id: str
    name: str
    category: str
    description: str | None
    price: float
    unit: str
    is_active: bool

    class Config:
        from_attributes = True
