from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.db.session import get_db
from app.models.user import User
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.service import Service
from app.schemas.order import OrderCreate, OrderOut
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderOut, status_code=201)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Order must include at least one item")

    order = Order(
        customer_id=current_user.id,
        pickup_address=payload.pickup_address,
        delivery_address=payload.delivery_address,
        pickup_time=payload.pickup_time,
        delivery_time=payload.delivery_time,
        notes=payload.notes,
        total_amount=0,
    )
    db.add(order)
    db.flush()  # get order.id before adding items

    total = 0.0
    for item in payload.items:
        service = db.query(Service).filter(Service.id == item.service_id).first()
        if not service:
            raise HTTPException(status_code=404, detail=f"Service {item.service_id} not found")

        subtotal = service.price * item.quantity
        total += subtotal

        order_item = OrderItem(
            order_id=order.id,
            service_id=service.id,
            quantity=item.quantity,
            unit_price=service.price,
            subtotal=subtotal,
        )
        db.add(order_item)

    order.total_amount = total
    db.commit()
    db.refresh(order)
    return order


@router.get("", response_model=list[OrderOut])
def list_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Order)
        .options(joinedload(Order.items))
        .filter(Order.customer_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )


@router.get("/{order_id}", response_model=OrderOut)
def get_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = (
        db.query(Order)
        .options(joinedload(Order.items))
        .filter(Order.id == order_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.customer_id != current_user.id and current_user.role not in ["staff", "admin", "driver"]:
        raise HTTPException(status_code=403, detail="Not authorized to view this order")
    return order
