from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.prediction import PredictionResponse
from app.services.predictor_service import get_predictor
from app.core.config import settings

router = APIRouter(tags=["predict"])

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type: {file.content_type}. Use JPEG, PNG, or WebP."
        )

    image_bytes = await file.read()
    if len(image_bytes) > settings.APP_MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Max size is {settings.APP_MAX_UPLOAD_BYTES // (1024*1024)} MiB."
        )

    predictor = get_predictor()
    if not predictor.is_loaded():
        raise HTTPException(
            status_code=503,
            detail="Model is not loaded. Please check your model file path."
        )

    try:
        result = predictor.predict(image_bytes)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")