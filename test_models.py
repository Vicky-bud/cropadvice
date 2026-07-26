import requests
import os
from dotenv import load_dotenv

load_dotenv()
gemini_key = os.getenv("GEMINI_API_KEY")

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={gemini_key}"
response = requests.get(url)
models = response.json().get("models", [])
for m in models:
    if "generateContent" in m.get("supportedGenerationMethods", []):
        print(m["name"])
