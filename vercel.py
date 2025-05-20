from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any
from datetime import datetime
import time

# Create a minimal FastAPI app specifically for Vercel
app = FastAPI()

# Configure CORS - allow Vercel frontend domains and localhost
allowed_origins = [
    "http://localhost:3000",
    "https://lyra-hahnghx00-lakshya-lohanis-projects.vercel.app",
    "https://*.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data storage (in memory for simplicity)
chat_history = []

@app.get("/")
async def root():
    return {"message": "Lyra AI API is running!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "environment": "vercel"}

@app.get("/api/config")
async def get_config():
    """Return safe configuration information"""
    return {
        "version": "1.0.0",
        "is_production": True,
        "deployment_region": "unknown"
    }

@app.post("/api/chat/message")
async def create_chat_message(content: Dict[str, Any] = Body(...)):
    """Handle chat messages"""
    user_content = content.get("content", "")
    msg_id = int(time.time() * 1000)
    
    user_message = {
        "id": f"user-{msg_id}",
        "sender": "user",
        "content": user_content,
        "timestamp": datetime.now().isoformat()
    }
    
    chat_history.append(user_message)
    
    # Generate a simple response
    lyra_response = {
        "id": f"lyra-{msg_id+1}",
        "sender": "lyra",
        "content": f"You said: **{user_content}**\n\nI can help you with that! 😊",
        "timestamp": datetime.now().isoformat()
    }
    
    chat_history.append(lyra_response)
    return lyra_response

@app.get("/api/chat/history")
async def get_chat_history():
    """Get chat history"""
    return {"messages": chat_history}

@app.delete("/api/chat/history")
async def clear_chat_history():
    """Clear chat history"""
    chat_history.clear()
    return {"status": "success", "message": "Chat history cleared"}
