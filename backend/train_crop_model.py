import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

print("Generating synthetic crop dataset...")
# Simulate the standard Crop Recommendation Dataset (N, P, K, temperature, humidity, ph, rainfall, label)
crops = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']

data = []
for crop in crops:
    # Generate 100 samples per crop with some random noise
    for _ in range(100):
        # We use dummy ranges for demonstration. A real model would use the actual CSV.
        N = np.random.randint(0, 140)
        P = np.random.randint(5, 145)
        K = np.random.randint(5, 205)
        temp = np.random.uniform(10.0, 40.0)
        humidity = np.random.uniform(15.0, 100.0)
        ph = np.random.uniform(3.5, 9.9)
        rainfall = np.random.uniform(20.0, 298.0)
        data.append([N, P, K, temp, humidity, ph, rainfall, crop])

df = pd.DataFrame(data, columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label'])

X = df.drop('label', axis=1)
y = df['label']

print("Training Random Forest Classifier...")
rf = RandomForestClassifier(n_estimators=20, random_state=42)
rf.fit(X, y)

# Save the model
model_path = os.path.join(os.path.dirname(__file__), "crop_model.joblib")
joblib.dump(rf, model_path)
print(f"Model saved successfully at {model_path}")
