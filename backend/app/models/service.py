from sqlalchemy import Column, String, Float, Boolean, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.session import Base
from app.models.base import TimestampMixin, gen_uuid

class Service(Base, TimestampMixin):
    __tablename__ = "services"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    name = Column(String, nullable=False)          # e.g. "Wash & Fold", "Dry Cleaning", "Duvet Cleaning"
    category = Column(String, nullable=False, default="General")  # e.g. "BASKETS", "DUVETS", "CARPETS & MATS", "ROYAL SERVICES"
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)           # base price in KES
    unit = Column(String, default="per_kg")          # per_kg, per_item, per_month, custom
    is_active = Column(Boolean, default=True)
