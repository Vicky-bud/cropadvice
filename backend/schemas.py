from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from models import UserRole

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class FarmerProfileBase(BaseModel):
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    farm_size_acres: Optional[int] = None
    primary_soil_type: Optional[str] = None
    phone_number: Optional[str] = None

class FarmerProfileUpdate(FarmerProfileBase):
    pass

class FarmerProfile(FarmerProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserInDBBase(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime
    profile: Optional[FarmerProfile] = None

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ChatMessage(BaseModel):
    role: str
    content: str
    
class AssistantChatMessageResponse(ChatMessage):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []

class ChatResponse(BaseModel):
    reply: str

class ActivityHistoryItem(BaseModel):
    id: int
    type: str # "crop_recommendation" or "disease_detection"
    title: str
    description: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
