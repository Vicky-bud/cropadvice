from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database import engine
import models
from routers import auth, profile, ml, weather
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Train ML model if not exists
import os
model_path = os.path.join(os.path.dirname(__file__), "crop_model.joblib")
if not os.path.exists(model_path):
    print("Model not found. Training synthetic model...")
    import subprocess
    subprocess.run(["python", os.path.join(os.path.dirname(__file__), "train_crop_model.py")])

app = FastAPI(
    title="CropAdvice API",
    description="Smart Crop Advisor System API",
    version="1.0.0",
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(ml.router)
app.include_router(weather.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to CropAdvice API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
