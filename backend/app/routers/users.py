from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserListOut
from app.core.dependencies import require_role

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserListOut])
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.admin)),
):
    return db.query(User).order_by(User.created_at.desc()).all()


@router.get("/drivers", response_model=list[UserListOut])
def list_drivers(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.staff, UserRole.admin)),
):
    return db.query(User).filter(User.role == UserRole.driver, User.is_active == True).all()
