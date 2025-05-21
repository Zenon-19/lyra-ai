from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any
from datetime import datetime
import os
import uuid

# Create a minimal FastAPI app specifically for Vercel
app = FastAPI(
    title="Lyra AI Backend",
    description="Simplified Backend API for Lyra AI Assistant on Vercel",
    version="1.0.0"
)

# Configure CORS - allow Vercel frontend domains and localhost
allowed_origins = [
    "http://localhost:3000",
    "https://lyra-ai.vercel.app",  # Adjust this to your actual Vercel domain
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


# --- Conversation Memory Helper ---
def get_recent_history(n=10):
    # Return the last n user+lyra messages for context
    return chat_history[-n*2:] if len(chat_history) > n*2 else chat_history[:]


# --- AI Agent Logic (with context) ---
def generate_lyra_response(user_message: str, history: list) -> str:
    """
    Simple AI agent logic for Lyra. Replace this with a real LLM call for production.
    Uses recent conversation context for more continuity.
    """
    user_message_lower = user_message.lower().strip()
    # Example: context-aware response
    if not user_message_lower:
        return "I'm here! How can I help you today?"
    if "hello" in user_message_lower or "hi" in user_message_lower:
        return "Hello! 👋 How can I assist you today?"
    if "dark mode" in user_message_lower:
        return "Switching to dark mode! 🌙 (Try toggling your theme in the UI.)"
    if "light mode" in user_message_lower:
        return "Switching to light mode! ☀️ (Try toggling your theme in the UI.)"
    if "help" in user_message_lower:
        return "Of course! Please tell me what you need help with."
    if "weather" in user_message_lower:
        return "I can't check the weather yet, but I can help you with tasks, notes, and more!"
    if "thank" in user_message_lower:
        return "You're welcome! 😊"
    # Use last user message for continuity
    if len(history) > 2:
        last_user = next((m for m in reversed(history[:-1]) if m['sender'] == 'user'), None)
        if last_user and last_user['content'].strip().lower() == user_message_lower:
            return "You just asked that! 😊 Anything else I can help with?"
    # Fallback: echo with encouragement
    return f"You said: **{user_message}**\n\nLet me know if you need anything else! 🤖"


# Chat endpoints
@app.post("/api/chat/message")
async def create_chat_message(content: Dict[str, Any] = Body(...)):
    """Handle chat messages"""
    user_content = content.get("content", "")
    user_message = {
        "id": str(uuid.uuid4()),
        "sender": "user",
        "content": user_content,
        "timestamp": datetime.now().isoformat()
    }
    chat_history.append(user_message)

    # Use the AI agent logic with recent context
    lyra_content = generate_lyra_response(user_content, get_recent_history())
    lyra_response = {
        "id": str(uuid.uuid4()),
        "sender": "lyra",
        "content": lyra_content,
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
    new_memory = {
        "id": str(uuid.uuid4()),
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
