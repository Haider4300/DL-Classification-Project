import { useState } from 'react'
import { useHealth } from './hooks/useHealth'
import { predict } from './lib/api'
import type { PredictionResponse, HistoryEntry } from './lib/types'
import HealthBadge from './components/HealthBadge'
import PredictionForm from './components/PredictionForm'
import PredictionResult from './components/PredictionResult'
import PredictionHistory from './components/PredictionHistory'
import StatsPanel from './components/StatsPanel'

export default function App() {
  const { health, status } = useHealth()
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  async function handlePredict(file: File) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await predict(file)
      setResult(data)
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString(),
        label: data.label,
        confidence: data.confidence,
        inference_ms: data.inference_ms,
        imageUrl: URL.createObjectURL(file),
        filename: file.name,
      }
      setHistory((prev) => [entry, ...prev].slice(0, 20))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .26 2.75-1.15 2.75H3.948c-1.41 0-2.15-1.75-1.15-2.75L5 14.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">DL Image Classifier</h1>
              <p className="text-xs text-slate-400 mt-0.5">CNN · 8 Natural Image Classes</p>
            </div>
          </div>
          <HealthBadge status={status} modelName={health?.model_name} />
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Row 1: Upload + Result side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionForm onPredict={handlePredict} loading={loading} />
          <PredictionResult result={result} loading={loading} error={error} />
        </div>

        {/* Row 2: History (wide) + Stats (narrow) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PredictionHistory history={history} onClear={() => setHistory([])} />
          </div>
          <div>
            <StatsPanel health={health} history={history} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 py-6 border-t border-slate-200 text-center text-xs text-slate-400">
        DL Image Classifier · Built with React + Vite + FastAPI · Trained on Natural Images Dataset
      </footer>
    </div>
  )
}