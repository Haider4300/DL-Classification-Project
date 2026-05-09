export interface ClassProbability {
  label: string
  probability: number
}

export interface PredictionResponse {
  label: string
  confidence: number
  probabilities: ClassProbability[]
  model_name: string
  inference_ms: number
}

export interface HealthResponse {
  status: 'online' | 'degraded' | 'offline'
  model_name: string
  classes: string[]
  model_loaded: boolean
}

export interface HistoryEntry {
  id: string
  timestamp: string
  label: string
  confidence: number
  inference_ms: number
  imageUrl: string
  filename: string
}