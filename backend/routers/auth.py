from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import schemas, models, auth, database

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

# Routes handled natively by Supabase on the frontend

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user
