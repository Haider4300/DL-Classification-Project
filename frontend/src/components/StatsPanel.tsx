import type { HealthResponse, HistoryEntry } from '../lib/types'
import Card from './Card'

interface Props {
  health: HealthResponse | null
  history: HistoryEntry[]
}

const CLASS_EMOJI: Record<string, string> = {
  airplane: '✈️', car: '🚗', cat: '🐱', dog: '🐶',
  flower: '🌸', fruit: '🍎', motorbike: '🏍️', person: '🧑',
}

export default function StatsPanel({ health, history }: Props) {
  const total = history.length
  const avgConf = total > 0
    ? (history.reduce((s, e) => s + e.confidence, 0) / total * 100).toFixed(1)
    : '—'
  const avgMs = total > 0
    ? (history.reduce((s, e) => s + e.inference_ms, 0) / total).toFixed(0)
    : '—'

  const classCounts: Record<string, number> = {}
  history.forEach((e) => { classCounts[e.label] = (classCounts[e.label] ?? 0) + 1 })
  const sorted = Object.entries(classCounts).sort((a, b) => b[1] - a[1])

  return (
    <Card title="Stats">
      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Total', value: total || '0' },
          { label: 'Avg Conf.', value: total ? `${avgConf}%` : '—' },
          { label: 'Avg Speed', value: total ? `${avgMs}ms` : '—' },
          { label: 'Classes', value: health?.classes.length ?? 8 },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-slate-800 tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Distribution */}
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">Session Distribution</p>
      {sorted.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4">No predictions yet</p>
      ) : (
        <div className="space-y-2">
          {sorted.map(([label, count]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-sm">{CLASS_EMOJI[label] ?? '🖼️'}</span>
              <div className="w-16 text-xs text-slate-600 capitalize truncate">{label}</div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full prob-bar"
                  style={{ width: `${(count / total) * 100}%` }} />
              </div>
              <span className="text-xs text-slate-400 tabular-nums w-4 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Classes */}
      {health && (
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">Supported Classes</p>
          <div className="flex flex-wrap gap-1.5">
            {health.classes.map((cls) => (
              <span key={cls} className="px-2 py-0.5 rounded-full text-xs bg-brand-50 text-brand-700 capitalize">
                {CLASS_EMOJI[cls]} {cls}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}