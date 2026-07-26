from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
import joblib
import os
import json
import numpy as np
from PIL import Image
import io
import auth, models, schemas, database
from sqlalchemy.orm import Session
import google.generativeai as genai

router = APIRouter(
    prefix="/api/ml",
    tags=["Machine Learning"]
)

model_path = os.path.join(os.path.dirname(__file__), "..", "crop_model.joblib")
try:
    crop_model = joblib.load(model_path)
except Exception:
    crop_model = None

@router.post("/predict-crop")
def recommend_crop(data: schemas.CropInput, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    if not crop_model:
        raise HTTPException(status_code=500, detail="Crop recommendation model not loaded")
    
    features = np.array([[
        data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall
    ]])
    
    try:
        proba = crop_model.predict_proba(features)[0]
        top_3_idx = np.argsort(proba)[-3:][::-1]
        classes = crop_model.classes_
        top_crops = [
            {"crop": str(classes[i]), "confidence": round(float(proba[i]) * 100, 1)}
            for i in top_3_idx
        ]
        history_item = models.CropRecommendationHistory(
            user_id=current_user.id,
            nitrogen=data.N, phosphorus=data.P, potassium=data.K,
            temperature=data.temperature, humidity=data.humidity, ph=data.ph, rainfall=data.rainfall,
            recommended_crop=top_crops[0]["crop"]
        )
        db.add(history_item)
        db.commit()
        return {"top_crops": top_crops}
    except Exception:
        prediction = crop_model.predict(features)[0]
        history_item = models.CropRecommendationHistory(
            user_id=current_user.id,
            nitrogen=data.N, phosphorus=data.P, potassium=data.K,
            temperature=data.temperature, humidity=data.humidity, ph=data.ph, rainfall=data.rainfall,
            recommended_crop=str(prediction)
        )
        db.add(history_item)
        db.commit()
        return {"top_crops": [{"crop": str(prediction), "confidence": 99.0}]}

@router.post("/predict-disease")
async def detect_disease(file: UploadFile = File(...), current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    try:
        try:
            from tensorflow.lite.python.interpreter import Interpreter
        except ImportError:
            import tflite_runtime.interpreter as tflite
            Interpreter = tflite.Interpreter
            
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert('RGB')
        
        # 1. Resize and extract pixel values [0, 255] for TFLite model [1, 224, 224, 3]
        image = image.resize((224, 224))
        input_data = np.expand_dims(np.array(image, dtype=np.float32), axis=0)
        
        # 2. Load model and predict
        model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "disease_model.tflite")
        if not os.path.exists(model_path):
            raise Exception("TFLite model file not found. Please re-upload disease_model.tflite.")
            
        interpreter = Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        
        output_data = interpreter.get_tensor(output_details[0]['index'])[0]
        
        # Get highest probability
        predicted_idx = np.argmax(output_data)
        confidence = round(float(output_data[predicted_idx]) * 100, 1)
        
        # Load class names
        classes_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "class_names.json")
        if not os.path.exists(classes_path):
            raise Exception("class_names.json file not found. Please re-upload it.")
            
        with open(classes_path, 'r') as f:
            class_names = json.load(f)
            
        prediction = class_names[predicted_idx] if predicted_idx < len(class_names) else "Unknown"
        
        # 3. Get treatments using Gemini API
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-flash-latest')
        
        prompt = f"The crop disease detected is '{prediction}'. Provide remedies. Use exactly this JSON schema: {{'organic': ['string'], 'chemical': ['string'], 'fertilizer': ['string']}}"
        
        try:
            response = model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                )
            )
            treatments = json.loads(response.text)
        except Exception as api_err:
            print(f"Gemini API Error: {api_err}")
            treatments = {
                "organic": ["Ensure proper spacing for air circulation."],
                "chemical": ["Consult local agricultural guidelines for chemical options."],
                "fertilizer": ["Ensure balanced NPK application based on soil test."]
            }
        
        # Parse crop from disease name (e.g., "Tomato___Early_blight" -> "Tomato", "Early blight")
        crop_name = "Unknown"
        disease_name = str(prediction)
        
        if "___" in str(prediction):
            parts = str(prediction).split("___")
            crop_name = parts[0].replace("_", " ")
            disease_name = parts[1].replace("_", " ")
        elif " " in str(prediction):
            parts = str(prediction).split(" ")
            crop_name = parts[0]
            disease_name = " ".join(parts[1:])
            
        result = {
            "crop": crop_name,
            "disease": disease_name,
            "confidence": confidence,
            "treatments": {
                "organic": treatments.get("organic", []),
                "chemical": treatments.get("chemical", []),
                "fertilizer": treatments.get("fertilizer", [])
            }
        }
        
        history_item = models.DiseaseDetectionHistory(
            user_id=current_user.id,
            crop_name=crop_name,
            disease_name=disease_name,
            confidence=str(confidence)
        )
        db.add(history_item)
        db.commit()
        
        return result
    except Exception as e:
        print(f"Error in Disease ML Pipeline: {e}")
        return {
            "crop": "Unknown",
            "disease": "Analysis Failed",
            "confidence": 0,
            "treatments": {
                "organic": ["Please try again"],
                "chemical": ["Please try again"],
                "fertilizer": ["Please try again"]
            }
        }

@router.post("/chat")
def chat_with_agronomist(chat: schemas.ChatRequest, current_user: models.User = Depends(auth.get_current_user)):
    try:
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content(f"You are an AI Agronomist for CropAdvice. Answer this: {chat.message}")
        return {"reply": response.text}
    except Exception:
        return {"reply": "Hello! I am the AI Agronomist. (Mocked response, configure Gemini API key for real answers)"}

@router.get("/chat/history")
def get_chat_history(current_user: models.User = Depends(auth.get_current_user)):
    return [
        {"role": "assistant", "content": "Welcome to CropAdvice AI! How can I help you today?", "id": 1, "created_at": "2023-01-01T12:00:00Z"}
    ]
