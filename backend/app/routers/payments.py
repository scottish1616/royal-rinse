from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User, UserRole
from app.models.order import Order
from app.models.payment import Payment, PaymentStatus
from app.schemas.payment import PaymentRecord, PaymentOut
from app.core.dependencies import require_role

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("", response_model=PaymentOut, status_code=201)
def record_payment(
    payload: PaymentRecord,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.staff, UserRole.admin)),
):
    order = db.query(Order).filter(Order.id == payload.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    existing = db.query(Payment).filter(Payment.order_id == order.id).first()
    if existing:
        existing.method = payload.method
        existing.status = PaymentStatus.completed
        existing.transaction_ref = payload.transaction_ref
        db.commit()
        db.refresh(existing)
        return existing

    payment = Payment(
        order_id=order.id,
        method=payload.method,
        status=PaymentStatus.completed,
        amount=order.total_amount,
        transaction_ref=payload.transaction_ref,
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


@router.get("/order/{order_id}", response_model=PaymentOut)
def get_payment_for_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.staff, UserRole.admin, UserRole.driver)),
):
    payment = db.query(Payment).filter(Payment.order_id == order_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="No payment recorded for this order")
    return payment
