from app.inference.keras_predictor import KerasPredictor

_predictor: KerasPredictor | None = None


def get_predictor() -> KerasPredictor:
    global _predictor
    if _predictor is None:
        _predictor = KerasPredictor()
    return _predictor