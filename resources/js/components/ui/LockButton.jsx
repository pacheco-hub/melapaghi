

import React from 'react'

export default function LockButton({
  text = 'Invia',
  loading = false,
  disabled = false,
  onClick,
  style = {},
}) {
  const baseStyle = {
    width: '100%',
    border: 'none',
    borderRadius: 30,
    padding: '14px 18px',
    fontSize: 16,
    fontWeight: 800,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: disabled ? 'none' : '0 8px 18px rgba(255,191,0,0.35)',
    transition: 'background 0.3s, color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    lineHeight: 1,
    ...style,
  }

  const enabledStyle = {
    background: '#ffbf00',
    color: '#1f2d3d',
  }

  const disabledStyle = {
    background: '#d1d5db',
    color: '#6b7280',
  }

  return (
    <button
      type="button"
      style={{ ...baseStyle, ...(disabled ? disabledStyle : enabledStyle) }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {disabled ? `🔒 ${text}` : (loading ? 'Invio…' : text)}
    </button>
  )
}