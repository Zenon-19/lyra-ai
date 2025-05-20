import requests
import json

BASE_URL = "https://lyra-ge7e62up5-lakshya-lohanis-projects.vercel.app"

def test_health():
    response = requests.get(f"{BASE_URL}/api/health")
    print("Health check:")
    print(f"Status code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("\n")

def test_config():
    response = requests.get(f"{BASE_URL}/api/config")
    print("Config check:")
    print(f"Status code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("\n")

def test_chat_message():
    data = {"content": "Hello, Lyra!"}
    response = requests.post(f"{BASE_URL}/api/chat/message", json=data)
    print("Chat message test:")
    print(f"Status code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("\n")

def test_chat_history():
    response = requests.get(f"{BASE_URL}/api/chat/history")
    print("Chat history test:")
    print(f"Status code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("\n")

if __name__ == "__main__":
    print(f"Testing Lyra AI API at {BASE_URL}\n")
    test_health()
    test_config()
    test_chat_message()
    test_chat_history()
