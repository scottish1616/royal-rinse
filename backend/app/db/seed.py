"""
Seed script for Royal Rinse service catalog.
Run with: python -m app.db.seed
"""
from app.db.session import SessionLocal
from app.models.service import Service

SERVICES = [
    # BASKETS
    {"name": "Small Basket", "description": "Small laundry basket — wash & fold", "price": 300, "unit": "per_item", "category": "BASKETS"},
    {"name": "Medium Basket", "description": "Medium laundry basket — wash & fold", "price": 350, "unit": "per_item", "category": "BASKETS"},
    {"name": "Narrow Large Basket", "description": "Narrow large laundry basket — wash & fold", "price": 400, "unit": "per_item", "category": "BASKETS"},
    {"name": "Large Basket", "description": "Large laundry basket — wash & fold", "price": 450, "unit": "per_item", "category": "BASKETS"},

    # DUVETS
    {"name": "4x6 Duvet", "description": "Duvet cleaning — 4x6 size", "price": 300, "unit": "per_item", "category": "DUVETS"},
    {"name": "5x6 Duvet", "description": "Duvet cleaning — 5x6 size", "price": 350, "unit": "per_item", "category": "DUVETS"},
    {"name": "6x6 Duvet", "description": "Duvet cleaning — 6x6 size", "price": 400, "unit": "per_item", "category": "DUVETS"},

    # CARPETS & MATS
    {"name": "Hard Carpet", "description": "Hard carpet deep cleaning", "price": 200, "unit": "per_item", "category": "CARPETS & MATS"},
    {"name": "Door Mat", "description": "Door mat cleaning", "price": 100, "unit": "per_item", "category": "CARPETS & MATS"},
    {"name": "Mat", "description": "Standard mat cleaning", "price": 300, "unit": "per_item", "category": "CARPETS & MATS"},

    # ROYAL SERVICES (from Figma visual preview)
    {"name": "Wash & Fold", "description": "Machine washed and professionally folded. Perfect for everyday garments.", "price": 250, "unit": "per_kg", "category": "ROYAL SERVICES"},
    {"name": "Dry Cleaning", "description": "Expert care for delicate fabrics, suits, gowns, and formal wear.", "price": 450, "unit": "per_item", "category": "ROYAL SERVICES"},
    {"name": "Wash & Iron", "description": "Washed and crisp-pressed to perfection. Business-ready every time.", "price": 350, "unit": "per_kg", "category": "ROYAL SERVICES"},
    {"name": "Bulk Laundry", "description": "Hotels, Airbnbs, and businesses — we handle high-volume orders with ease.", "price": 0, "unit": "custom", "category": "ROYAL SERVICES"},
    {"name": "Express Service", "description": "6-hour turnaround for urgent orders. Pickup and delivery same day.", "price": 600, "unit": "per_kg", "category": "ROYAL SERVICES"},
    {"name": "Subscription Plans", "description": "Weekly or monthly plans at discounted rates. Never run out of fresh clothes.", "price": 4500, "unit": "per_month", "category": "ROYAL SERVICES"},
]


def seed_services():
    db = SessionLocal()
    try:
        created, skipped = 0, 0
        for item in SERVICES:
            exists = db.query(Service).filter(Service.name == item["name"]).first()
            if exists:
                skipped += 1
                continue
            db.add(Service(**item, is_active=True))
            created += 1
        db.commit()
        print(f"Seed complete: {created} created, {skipped} already existed (skipped).")
    finally:
        db.close()


if __name__ == "__main__":
    seed_services()
