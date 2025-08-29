import React from 'react'

export default function MoneyInput({
  label = '',
  value = '',
  onValueChange,            // callback che riceve la stringa normalizzata (es: "€123")
  placeholder = '€0',
  labelStyle = {},
  inputStyle = {},
  inputProps = {},
}) {
  const handleChange = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, '')
    const next = digits ? `€${digits}` : ''
    onValueChange?.(next)
  }

  return (
    <>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
        style={inputStyle}
        {...inputProps}
      />
    </>
  )
}