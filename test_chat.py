import requests
import os
from dotenv import load_dotenv

load_dotenv()
gemini_key = os.getenv("GEMINI_API_KEY")

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={gemini_key}"
contents = []
contents.append({
    "role": "user",
    "parts": [{"text": "You are CropAdvice's expert Agricultural AI Assistant."}]
})
contents.append({
    "role": "model",
    "parts": [{"text": "Understood."}]
})
contents.append({
    "role": "user",
    "parts": [{"text": "Hello, what is a tractor?"}]
})
payload = {
    "contents": contents
}
headers = {"Content-Type": "application/json"}
response = requests.post(url, json=payload, headers=headers)
print("Status Code:", response.status_code)
print("Response:", response.text)
