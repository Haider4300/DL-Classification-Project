import type { HealthResponse, PredictionResponse } from './types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${BASE_URL}/health`)
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`)
  return res.json()
}

export async function predict(file: File): Promise<PredictionResponse> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(err.detail ?? `Prediction failed: ${res.status}`)
  }
  return res.json()
}