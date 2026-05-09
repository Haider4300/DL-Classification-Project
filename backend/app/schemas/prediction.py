# from pydantic import BaseModel
# from typing import List


# class ClassProbability(BaseModel):
#     label: str
#     probability: float


# class PredictionResponse(BaseModel):
#     label: str
#     confidence: float
#     probabilities: List[ClassProbability]
#     model_name: str
#     inference_ms: float


# class HealthResponse(BaseModel):
#     status: str
#     model_name: str
#     classes: List[str]
#     model_loaded: bool

from pydantic import BaseModel, ConfigDict
from typing import List


class ClassProbability(BaseModel):
    label: str
    probability: float


class PredictionResponse(BaseModel):
    # Suppress Pydantic warning about "model_" namespace conflict
    model_config = ConfigDict(protected_namespaces=())

    label: str
    confidence: float
    probabilities: List[ClassProbability]
    model_name: str
    inference_ms: float


class HealthResponse(BaseModel):
    # Suppress Pydantic warning about "model_" namespace conflict
    model_config = ConfigDict(protected_namespaces=())

    status: str          # "online" | "degraded" | "offline"
    model_name: str
    classes: List[str]
    model_loaded: bool