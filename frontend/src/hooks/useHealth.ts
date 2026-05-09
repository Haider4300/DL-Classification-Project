import { useState, useEffect } from 'react'
import { fetchHealth } from '../lib/api'
import type { HealthResponse } from '../lib/types'

export function useHealth() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [status, setStatus] = useState<'checking' | 'online' | 'degraded' | 'offline'>('checking')

  useEffect(() => {
    let cancelled = false

    async function check() {
      try {
        const data = await fetchHealth()
        if (!cancelled) {
          setHealth(data)
          setStatus(data.status)
        }
      } catch {
        if (!cancelled) {
          setHealth(null)
          setStatus('offline')
        }
      }
    }

    check()
    const interval = setInterval(check, 10_000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { health, status }
}