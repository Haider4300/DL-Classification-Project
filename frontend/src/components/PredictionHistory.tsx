import type { HistoryEntry } from '../lib/types'
import Card from './Card'

interface Props {
  history: HistoryEntry[]
  onClear: () => void
}

const CLASS_EMOJI: Record<string, string> = {
  airplane: '✈️', car: '🚗', cat: '🐱', dog: '🐶',
  flower: '🌸', fruit: '🍎', motorbike: '🏍️', person: '🧑',
}

export default function PredictionHistory({ history, onClear }: Props) {
  if (history.length === 0) {
    return (
      <Card title="History" empty>
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <p className="text-sm text-slate-400">Your predictions will appear here</p>
        </div>
      </Card>
    )
  }

  return (
    <Card
      title={`History (${history.length})`}
      action={
        <button onClick={onClear} className="text-xs text-slate-400 hover:text-rose-500 transition-colors">
          Clear all
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium uppercase tracking-wide text-slate-400 pb-2">Image</th>
              <th className="text-left text-xs font-medium uppercase tracking-wide text-slate-400 pb-2">Class</th>
              <th className="text-right text-xs font-medium uppercase tracking-wide text-slate-400 pb-2">Confidence</th>
              <th className="text-right text-xs font-medium uppercase tracking-wide text-slate-400 pb-2">Latency</th>
              <th className="text-right text-xs font-medium uppercase tracking-wide text-slate-400 pb-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                <td className="py-2.5">
                  <img src={entry.imageUrl} alt={entry.filename}
                    className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                </td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
                    {CLASS_EMOJI[entry.label] ?? '🖼️'} <span className="capitalize">{entry.label}</span>
                  </span>
                </td>
                <td className="py-2.5 text-right tabular-nums font-semibold text-slate-700">
                  {(entry.confidence * 100).toFixed(1)}%
                </td>
                <td className="py-2.5 text-right tabular-nums text-slate-400 text-xs">
                  {entry.inference_ms.toFixed(0)} ms
                </td>
                <td className="py-2.5 text-right text-slate-400 text-xs whitespace-nowrap">
                  {entry.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}