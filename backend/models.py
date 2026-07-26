from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from database import Base

class UserRole(str, enum.Enum):
    farmer = "farmer"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.farmer)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    profile = relationship("FarmerProfile", back_populates="user", uselist=False)
    crop_history = relationship("CropRecommendationHistory", back_populates="user", order_by="desc(CropRecommendationHistory.created_at)")
    disease_history = relationship("DiseaseDetectionHistory", back_populates="user", order_by="desc(DiseaseDetectionHistory.created_at)")
    chat_history = relationship("AssistantChatMessage", back_populates="user", order_by="asc(AssistantChatMessage.created_at)")

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    location = Column(String, nullable=True) # E.g., City, State
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    farm_size_acres = Column(Integer, nullable=True)
    primary_soil_type = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    
    
    user = relationship("User", back_populates="profile")

class CropRecommendationHistory(Base):
    __tablename__ = "crop_recommendation_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Inputs
    nitrogen = Column(Integer)
    phosphorus = Column(Integer)
    potassium = Column(Integer)
    temperature = Column(Integer)
    humidity = Column(Integer)
    ph = Column(Integer)
    rainfall = Column(Integer)
    
    # Output
    recommended_crop = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="crop_history")

class DiseaseDetectionHistory(Base):
    __tablename__ = "disease_detection_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    crop_name = Column(String)
    disease_name = Column(String)
    confidence = Column(String) # Stored as string like "95.5%" or float, string is fine
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="disease_history")

class AssistantChatMessage(Base):
    __tablename__ = "assistant_chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    role = Column(String) # "user" or "model"
    content = Column(String)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="chat_history")
