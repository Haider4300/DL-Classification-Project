import type { PredictionResponse } from '../lib/types'
import Card from './Card'

interface Props {
  result: PredictionResponse | null
  loading: boolean
  error: string | null
}

const CLASS_EMOJI: Record<string, string> = {
  airplane: '✈️', car: '🚗', cat: '🐱', dog: '🐶',
  flower: '🌸', fruit: '🍎', motorbike: '🏍️', person: '🧑',
}

export default function PredictionResult({ result, loading, error }: Props) {
  if (error) {
    return (
      <Card title="Prediction Result">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <strong className="font-semibold">Error:</strong> {error}
        </div>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card title="Prediction Result">
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-10 bg-slate-100 rounded-xl w-2/3" />
          <div className="h-5 bg-slate-100 rounded-xl w-1/2" />
          <div className="mt-2 space-y-2.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-3 bg-slate-100 rounded w-20" />
                <div className="flex-1 h-3 bg-slate-100 rounded-full" />
                <div className="h-3 bg-slate-100 rounded w-10" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card title="Prediction Result" empty>
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl">🔍</div>
          <p className="text-sm text-slate-400">Upload an image and click<br /><strong className="font-medium text-slate-500">Run Classification</strong></p>
        </div>
      </Card>
    )
  }

  return (
    <Card title="Prediction Result">
      {/* Top result */}
      <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-brand-50 border border-brand-100">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{CLASS_EMOJI[result.label] ?? '🖼️'}</span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-400 mb-0.5">Predicted</p>
            <p className="text-2xl font-bold text-brand-700 capitalize">{result.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-400 mb-0.5">Confidence</p>
          <p className="text-2xl font-bold text-brand-700 tabular-nums">{(result.confidence * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* All class bars */}
      <div className="space-y-2.5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">All Probabilities</p>
        {result.probabilities.map((p) => {
          const isTop = p.label === result.label
          return (
            <div key={p.label} className="flex items-center gap-3">
              <div className="w-20 text-xs text-slate-600 capitalize truncate flex items-center gap-1">
                <span>{CLASS_EMOJI[p.label] ?? '🖼️'}</span>
                <span>{p.label}</span>
              </div>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full prob-bar ${isTop ? 'bg-brand-600' : 'bg-slate-300'}`}
                  style={{ width: `${p.probability * 100}%` }}
                />
              </div>
              <div className={`w-12 text-right text-xs tabular-nums font-semibold ${isTop ? 'text-brand-600' : 'text-slate-400'}`}>
                {(p.probability * 100).toFixed(1)}%
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono">{result.model_name}</span>
        <span>{result.inference_ms.toFixed(1)} ms inference</span>
      </div>
    </Card>
  )
}