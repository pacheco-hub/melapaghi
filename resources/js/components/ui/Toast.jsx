import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!duration) return
    const t = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  const base = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    padding: '12px 20px',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 9999,
    maxWidth: 320,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    userSelect: 'none'
  }
  const palette = {
    success: { background: '#e7f6ec', color: '#1e8e3e' },
    error:   { background: '#fdecea', color: '#cc2936' }
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onClick={() => onClose?.()}
      style={{ ...base, ...(palette[type] || palette.success) }}
    >
      {type === 'success' ? '✅ ' : '⚠️ '}
      {message}
    </div>
  )
}