from pydantic import BaseModel
from app.models.user import UserRole


class UserListOut(BaseModel):
    id: str
    full_name: str
    email: str
    phone_number: str
    role: UserRole
    is_active: bool

    class Config:
        from_attributes = True
