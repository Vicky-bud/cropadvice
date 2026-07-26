from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import schemas, models, auth, database

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)

@router.get("/", response_model=schemas.FarmerProfile)
def get_profile(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    profile = db.query(models.FarmerProfile).filter(models.FarmerProfile.user_id == current_user.id).first()
    if not profile:
        profile = models.FarmerProfile(user_id=current_user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/", response_model=schemas.FarmerProfile)
def update_profile(profile_update: schemas.FarmerProfileUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    profile = db.query(models.FarmerProfile).filter(models.FarmerProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    for key, value in profile_update.dict(exclude_unset=True).items():
        setattr(profile, key, value)
        
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/activity", response_model=list[schemas.ActivityHistoryItem])
def get_activity_history(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    crop_history = db.query(models.CropRecommendationHistory).filter(models.CropRecommendationHistory.user_id == current_user.id).all()
    disease_history = db.query(models.DiseaseDetectionHistory).filter(models.DiseaseDetectionHistory.user_id == current_user.id).all()
    
    activities = []
    for item in crop_history:
        activities.append({
            "id": item.id,
            "type": "crop_recommendation",
            "title": f"Crop Recommendation: {item.recommended_crop}",
            "description": f"Recommended based on NPK: {item.nitrogen}-{item.phosphorus}-{item.potassium}",
            "created_at": item.created_at
        })
        
    for item in disease_history:
        activities.append({
            "id": item.id,
            "type": "disease_detection",
            "title": f"Disease Detection: {item.disease_name}",
            "description": f"Crop: {item.crop_name} (Confidence: {item.confidence}%)",
            "created_at": item.created_at
        })
        
    activities.sort(key=lambda x: x["created_at"], reverse=True)
    
    for i, activity in enumerate(activities):
        activity["id"] = i + 1
        
    return activities
