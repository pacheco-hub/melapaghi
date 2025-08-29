import React from 'react'

export default function PhoneInput({
  label = '',
  value = '',
  onValueChange,           // callback: string formattata es. "333-123-4567"
  placeholder = 'Inserisci numero di telefono',
  labelStyle = {},
  inputStyle = {},
  inputProps = {},
  maxDigits = 10,          // 10 cifre come ora
}) {
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, maxDigits)
    let formatted = digits
    if (digits.length > 3 && digits.length <= 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3)
    } else if (digits.length > 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6)
    }
    onValueChange?.(formatted)
  }

  return (
    <>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="tel"
        maxLength={12}            // 10 cifre + 2 trattini
        style={inputStyle}
        {...inputProps}
      />
    </>
  )
}