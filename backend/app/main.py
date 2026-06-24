from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, services, orders

app = FastAPI(title="Royal Rinse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(services.router)
app.include_router(orders.router)


@app.get("/")
def root():
    return {"status": "Royal Rinse API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
