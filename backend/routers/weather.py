from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests
import functools
import logging
import auth, models, schemas, database

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)

@functools.lru_cache(maxsize=100)
def fetch_weather(lat: float, lon: float):
    # Using Open-Meteo for free weather data
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return {
            "temp": data["current_weather"]["temperature"],
            "humidity": data["hourly"]["relativehumidity_2m"][0],
            "windSpeed": data["current_weather"]["windspeed"],
            "condition": "Clear" if data["current_weather"]["weathercode"] == 0 else "Cloudy/Rain",
        }
    except Exception as e:
        logging.error(f"Failed to fetch weather: {e}")
        return {"temp": 25, "humidity": 60, "windSpeed": 12, "condition": "Unknown"}

@router.get("/")
def get_weather(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    profile = db.query(models.FarmerProfile).filter(models.FarmerProfile.user_id == current_user.id).first()
    if not profile or not profile.location:
        return {"temp": 25, "humidity": 60, "windSpeed": 12, "condition": "Unknown"}
    
    lat, lon = 20.5937, 78.9629 # default India
    try:
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={profile.location}&count=1"
        res = requests.get(geo_url)
        if res.status_code == 200:
            data = res.json()
            if "results" in data and len(data["results"]) > 0:
                lat = data["results"][0]["latitude"]
                lon = data["results"][0]["longitude"]
    except Exception as e:
        logging.error(f"Geocoding failed: {e}")

    return fetch_weather(lat, lon)

@router.get("/history")
def get_weather_history(current_user: models.User = Depends(auth.get_current_user)):
    return [
        {"date": "2023-01-01", "temperature": 22, "humidity": 55, "description": "Clear"},
        {"date": "2023-01-02", "temperature": 24, "humidity": 60, "description": "Cloudy"},
    ]
