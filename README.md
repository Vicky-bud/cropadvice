# 🌾 CropAdvice - Smart Agriculture Platform

CropAdvice is an end-to-end, full-stack web application designed to empower farmers with Machine Learning-driven insights and AI assistance. It bridges the gap between traditional farming and modern technology by providing accurate crop recommendations, real-time disease detection, and an intelligent agronomist chatbot.

## ✨ Features

- **Crop Recommendation Engine**: Uses an ML Random Forest model to analyze soil metrics (Nitrogen, Phosphorus, Potassium, pH) and climate data to recommend the optimal crops for high yield.
- **Disease Detection Vision Model**: Upload a photo of a sick plant leaf, and the deep learning Convolutional Neural Network (CNN) instantly detects the disease and provides confidence scores alongside actionable treatment plans.
- **AI Agronomist Chatbot**: Powered by Google's Gemini 1.5 Flash, the conversational AI remembers chat history and acts as a 24/7 expert agricultural consultant.
- **Hyper-Local Weather Dashboard**: Integrates with the Open-Meteo API to fetch real-time weather forecasts based on the farmer's geolocation.
- **Full Authentication**: Secure user registration and login using JWTs and hashed passwords.
- **Beautiful UI/UX**: Fully responsive, mobile-first design built with Tailwind CSS, featuring a stunning manual Dark Mode toggle.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, React Router
- **Backend**: FastAPI (Python), SQLAlchemy, Uvicorn, Passlib (Bcrypt)
- **Database**: SQLite (Development) -> PostgreSQL (Production ready)
- **Machine Learning**: Scikit-Learn (Joblib), TensorFlow/Keras
- **AI Engine**: Google Gemini API
- **External APIs**: Open-Meteo (Weather), Nominatim (Reverse Geocoding)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy passlib[bcrypt] pyjwt python-multipart scikit-learn numpy pillow requests
   ```
4. Set up your `.env` file in the `backend` directory:
   ```env
   SECRET_KEY=your_super_secret_key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Ensure the ML models (`crop_recommendation_model.joblib` and `disease_model.h5`) are placed in the root of the backend folder.
6. Run the server:
   ```bash
   python -m uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

The platform will be accessible at `http://localhost:5173`.

## 📈 Future Enhancements
- Expanded disease detection dataset for regional crops.
- Multi-language support for accessibility across different farming communities.
- SMS/Email notifications for extreme weather alerts.

---

