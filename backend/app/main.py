from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from app.api.routes import health, predict
from app.services.predictor_service import predictor_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    predictor_service.load()
    yield


app = FastAPI(title="DL Image Classifier", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(health.router, prefix="/api/v1")
app.include_router(predict.router, prefix="/api/v1")

# Serve React frontend
static_dir = Path(__file__).parent / "static"
if static_dir.exists():
    app.mount("/assets", StaticFiles(directory=str(static_dir / "assets")), name="assets")

    @app.get("/")
    async def serve_frontend():
        return FileResponse(str(static_dir / "index.html"))

    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        return FileResponse(str(static_dir / "index.html"))