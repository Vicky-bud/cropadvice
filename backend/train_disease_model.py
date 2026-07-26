import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import json
import os

def generate_mock_disease_data(num_samples=1000):
    # Features: mean_r, mean_g, mean_b, std_r, std_g, std_b
    # Classes: 
    # 0: Healthy
    # 1: Apple Scab
    # 2: Tomato Early Blight
    # 3: Potato Late Blight
    
    np.random.seed(42)
    features = []
    labels = []
    
    for _ in range(num_samples):
        disease = np.random.randint(0, 4)
        if disease == 0: # Healthy (Green)
            r = np.random.normal(50, 10)
            g = np.random.normal(150, 20)
            b = np.random.normal(50, 10)
        elif disease == 1: # Apple Scab (Dark spots)
            r = np.random.normal(100, 15)
            g = np.random.normal(100, 15)
            b = np.random.normal(40, 10)
        elif disease == 2: # Tomato Early Blight (Brown concentric rings)
            r = np.random.normal(130, 20)
            g = np.random.normal(110, 20)
            b = np.random.normal(60, 15)
        elif disease == 3: # Potato Late Blight (Pale green/brown)
            r = np.random.normal(140, 20)
            g = np.random.normal(130, 20)
            b = np.random.normal(90, 15)
            
        std_r = np.random.normal(30, 5)
        std_g = np.random.normal(30, 5)
        std_b = np.random.normal(30, 5)
        
        features.append([r, g, b, std_r, std_g, std_b])
        labels.append(disease)
        
    return np.array(features), np.array(labels)

def train_and_save_model():
    print("Generating synthetic image feature dataset...")
    X, y = generate_mock_disease_data(2000)
    
    print("Training Random Forest Classifier for Disease Detection...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Map the classes so predict returns the string names
    model.classes_ = np.array(["Healthy", "Apple Scab", "Tomato Early Blight", "Potato Late Blight"])
    
    model_path = os.path.join(os.path.dirname(__file__), "disease_model.joblib")
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")
    
    treatments = {
        "Healthy": ["No treatment required.", "Continue standard watering and fertilization routine."],
        "Apple Scab": ["Apply fungicides containing captan or myclobutanil.", "Remove and destroy fallen leaves to prevent fungal spores from overwintering."],
        "Tomato Early Blight": ["Use a copper-based fungicide.", "Ensure proper spacing between plants for air circulation.", "Water at the base of the plant to keep leaves dry."],
        "Potato Late Blight": ["Apply chlorothalonil or copper fungicide.", "Remove infected plants immediately to stop the spread.", "Avoid overhead irrigation."]
    }
    
    treatments_path = os.path.join(os.path.dirname(__file__), "disease_treatments.json")
    with open(treatments_path, 'w') as f:
        json.dump(treatments, f, indent=4)
    print(f"Treatments dictionary saved to {treatments_path}")

if __name__ == "__main__":
    train_and_save_model()
