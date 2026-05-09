type Status = 'checking' | 'online' | 'degraded' | 'offline'

interface Props {
  status: Status
  modelName?: string
}

const config: Record<Status, { dot: string; text: string; label: string }> = {
  checking: { dot: 'bg-amber-400 animate-pulse', text: 'text-amber-600', label: 'Checking…' },
  online:   { dot: 'bg-emerald-500',             text: 'text-emerald-700', label: 'API Online' },
  degraded: { dot: 'bg-amber-400 animate-pulse', text: 'text-amber-600',  label: 'Degraded' },
  offline:  { dot: 'bg-rose-500',                text: 'text-rose-600',   label: 'API Offline' },
}

export default function HealthBadge({ status, modelName }: Props) {
  const c = config[status]
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
      <span className={`text-xs font-medium ${c.text}`}>{c.label}</span>
      {modelName && status === 'online' && (
        <span className="text-xs text-slate-400 font-mono ml-1 hidden sm:inline">{modelName}</span>
      )}
    </div>
  )
}