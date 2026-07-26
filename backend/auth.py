from datetime import datetime, timedelta
from typing import Optional
import os

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from supabase import create_client, Client

import database, models

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://zmcbohkeamxrmcwbnyay.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "sb_publishable_xe6nd1yK8BLoPpvh7Y5AqQ_p9_YEDG7")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("WARNING: Supabase URL or Key not set. Authentication will fail.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        res = supabase.auth.get_user(token)
        if not res or not res.user:
            raise credentials_exception
        user_data = res.user
        email = user_data.email
        full_name = user_data.user_metadata.get("full_name", "") if user_data.user_metadata else ""
    except Exception as e:
        raise credentials_exception

    if email is None:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.email == email).first()
    
    # Just-In-Time Provisioning
    if user is None:
        try:
            user = models.User(
                email=email,
                hashed_password="SUPABASE_AUTH_DUMMY",
                full_name=full_name
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
            # Initialize an empty profile for the new user
            new_profile = models.FarmerProfile(user_id=user.id)
            db.add(new_profile)
            db.commit()
        except Exception:
            db.rollback()
            # If it fails, it means another concurrent thread already created the user.
            user = db.query(models.User).filter(models.User.email == email).first()
        
    return user
