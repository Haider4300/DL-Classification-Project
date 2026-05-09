from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # ── Switch to the transfer learning model (EfficientNetB3, 99.8% val acc) ──
    APP_MODEL_PATH: str = "../natural_images_transfer_learning.keras"
    APP_IMAGE_SIZE: List[int] = [224, 224]   # EfficientNetB3 expects 224x224
    APP_CLASS_NAMES: List[str] = [
        "airplane", "car", "cat", "dog",
        "flower", "fruit", "motorbike", "person"
    ]
    APP_API_PREFIX: str = "/api/v1"
    APP_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    APP_MAX_UPLOAD_BYTES: int = 8 * 1024 * 1024  # 8 MiB

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
