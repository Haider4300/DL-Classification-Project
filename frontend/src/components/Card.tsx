import { ReactNode } from 'react'

interface Props {
  title: string
  action?: ReactNode
  children: ReactNode
  empty?: boolean
  className?: string
}

export default function Card({ title, action, children, empty, className = '' }: Props) {
  return (
    <div className={`rounded-2xl border bg-white p-6 shadow-sm ${empty ? 'border-dashed bg-white/60 border-slate-300' : 'border-slate-200'} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  )
}