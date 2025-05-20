# Simplified vercel_app.py without uuid dependency
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any
from datetime import datetime
import os
import time

# Create a minimal FastAPI app specifically for Vercel
app = FastAPI(
    title="Lyra AI Backend",
    description="Simplified Backend API for Lyra AI Assistant on Vercel",
    version="1.0.0"
)

# Configure CORS - allow Vercel frontend domains and localhost
allowed_origins = [
    "http://localhost:3000",
    "https://lyra-5k7lygtcl-lakshya-lohanis-projects.vercel.app",
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
memory_items = []

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "environment": "vercel"}

@app.get("/api/config")
async def get_config():
    """Return safe configuration information"""
    return {
        "version": "1.0.0",
        "is_production": os.environ.get("VERCEL_ENV") == "production",
        "deployment_region": os.environ.get("VERCEL_REGION", "unknown")
    }

# Chat endpoints
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

# Memory endpoints
@app.get("/api/memory")
async def get_memories():
    """Get memories"""
    return {"memories": memory_items}

@app.post("/api/memory")
async def create_memory(memory: Dict[str, Any] = Body(...)):
    """Create a new memory"""
    msg_id = int(time.time() * 1000)
    new_memory = {
        "id": f"mem-{msg_id}",
        "title": memory.get("title", "New Memory"),
        "content": memory.get("content", ""),
        "type": memory.get("type", "conversation"),
        "timestamp": datetime.now().isoformat()
    }
    memory_items.append(new_memory)
    return new_memory

# Skills endpoints
@app.get("/api/skills")
async def get_skills():
    """Get available skills"""
    return {
        "skills": [
            {"id": "web_search", "name": "Web Search", "icon": "🔍", "active": True},
            {"id": "document_analysis", "name": "Document Analysis", "icon": "📝", "active": True},
            {"id": "data_visualization", "name": "Data Visualization", "icon": "📊", "active": False},
            {"id": "code_assistant", "name": "Code Assistant", "icon": "💻", "active": True}
        ]
    }

# Handle 404 errors
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "The requested API endpoint was not found"}
    )
