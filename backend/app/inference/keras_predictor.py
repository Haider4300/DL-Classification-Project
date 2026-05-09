import time
import io
import numpy as np
from PIL import Image

from app.core.config import settings
from app.schemas.prediction import PredictionResponse, ClassProbability


class KerasPredictor:
    def __init__(self):
        self.model = None
        self.model_name = settings.APP_MODEL_PATH.replace("\\", "/").split("/")[-1]

    def load(self):
        path = settings.APP_MODEL_PATH

        # Strategy 1: keras.saving (TF 2.16+)
        try:
            import keras
            self.model = keras.saving.load_model(path, compile=False)
            print(f"✅ Model loaded (keras.saving): {path}")
            return
        except Exception as e1:
            print(f"   Strategy 1 failed: {e1}")

        # Strategy 2: keras.models
        try:
            import keras
            self.model = keras.models.load_model(path, compile=False)
            print(f"✅ Model loaded (keras.models): {path}")
            return
        except Exception as e2:
            print(f"   Strategy 2 failed: {e2}")

        # Strategy 3: tf.keras
        try:
            import tensorflow as tf
            self.model = tf.keras.models.load_model(path, compile=False)
            print(f"✅ Model loaded (tf.keras): {path}")
            return
        except Exception as e3:
            print(f"   Strategy 3 failed: {e3}")

        # Strategy 4: safe_mode=False
        try:
            import keras
            self.model = keras.models.load_model(path, compile=False, safe_mode=False)
            print(f"✅ Model loaded (safe_mode=False): {path}")
            return
        except Exception as e4:
            print(f"   Strategy 4 failed: {e4}")

        print(f"❌ All strategies failed: {path}")
        self.model = None

    def is_loaded(self) -> bool:
        return self.model is not None

    def _is_transfer_learning_model(self) -> bool:
        """Detect if the loaded model is EfficientNet-based (transfer learning)."""
        model_path = settings.APP_MODEL_PATH.lower()
        if "transfer" in model_path:
            return True
        # Also check model layer names for EfficientNet
        if self.model is not None:
            try:
                for layer in self.model.layers:
                    if "efficientnet" in layer.name.lower():
                        return True
            except Exception:
                pass
        return False

    def predict(self, image_bytes: bytes) -> PredictionResponse:
        if not self.is_loaded():
            raise RuntimeError("Model is not loaded")

        start = time.perf_counter()

        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        target_size = tuple(settings.APP_IMAGE_SIZE)  # (224,224) for TL, (150,150) for CNN
        img = img.resize(target_size, Image.LANCZOS)
        arr = np.array(img, dtype=np.float32)

        if self._is_transfer_learning_model():
            # ✅ EfficientNetB3 has built-in preprocessing inside the model.
            # Training used image_dataset_from_directory which feeds raw 0-255 pixel values.
            # Do NOT divide by 255 — feed raw pixels directly.
            pass  # arr stays as 0-255
        else:
            # ✅ Plain CNN was trained with manual rescaling (/ 255.0)
            arr = arr / 255.0

        arr = np.expand_dims(arr, axis=0)  # (1, H, W, 3)

        raw_probs = self.model.predict(arr, verbose=0)[0]
        inference_ms = (time.perf_counter() - start) * 1000

        class_names = settings.APP_CLASS_NAMES
        top_idx = int(np.argmax(raw_probs))

        probabilities = [
            ClassProbability(label=class_names[i], probability=float(raw_probs[i]))
            for i in range(len(class_names))
        ]
        probabilities.sort(key=lambda x: x.probability, reverse=True)

        return PredictionResponse(
            label=class_names[top_idx],
            confidence=float(raw_probs[top_idx]),
            probabilities=probabilities,
            model_name=self.model_name,
            inference_ms=round(inference_ms, 2),
        )
