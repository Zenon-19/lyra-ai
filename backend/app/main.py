from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, chat, memory, skills, voice
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

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(memory.router, prefix="/api", tags=["memory"])
app.include_router(skills.router, prefix="/api", tags=["skills"])
app.include_router(voice.router, prefix="/api", tags=["voice"])

@app.on_event("startup")
async def startup_event():
    # Start Prometheus metrics server
    start_http_server(settings.METRICS_PORT)
    # Initialize database
    await init_db()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
