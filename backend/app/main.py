from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router as lyra_router
from app.core.config import settings
from app.db.init_db import init_db
import sentry_sdk
from prometheus_client import start_http_server

app = FastAPI(
    title="Lyra AI Backend",
    description="Backend API for Lyra AI Assistant",
    version="1.0.0"
)

# Configure Sentry
sentry_sdk.init(dsn=settings.SENTRY_DSN)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include new single router for all endpoints
app.include_router(lyra_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    # Start Prometheus metrics server
    start_http_server(settings.METRICS_PORT)
    # Initialize database
    await init_db()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
