from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import health, predict
from app.services.predictor_service import get_predictor


@asynccontextmanager
async def lifespan(app: FastAPI):
    predictor = get_predictor()
    predictor.load()
    print(f"✅ Model loaded: {settings.APP_MODEL_PATH}")
    yield
    print("🔴 Shutting down...")


app = FastAPI(
    title="Natural Images Classifier",
    description="Classifies images into 8 categories using a CNN model",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.APP_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix=settings.APP_API_PREFIX)
app.include_router(predict.router, prefix=settings.APP_API_PREFIX)


@app.get("/")
def root():
    return {
        "service": "Natural Images Classifier API",
        "docs": "/docs",
        "health": f"{settings.APP_API_PREFIX}/health",
        "predict": f"{settings.APP_API_PREFIX}/predict",
    }