from fastapi import APIRouter
from app.schemas.prediction import HealthResponse
from app.services.predictor_service import get_predictor
from app.core.config import settings

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health():
    predictor = get_predictor()
    loaded = predictor.is_loaded()
    return HealthResponse(
        status="online" if loaded else "degraded",
        model_name=predictor.model_name,
        classes=settings.APP_CLASS_NAMES,
        model_loaded=loaded,
    )