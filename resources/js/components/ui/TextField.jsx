import React from 'react'

export default function TextField({
  label,
  placeholder = '',
  value,
  onChange,
  onFocus,
  inputProps = {},
  labelStyle = {},
  inputStyle = {},
}) {
  return (
    <>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        style={inputStyle}
        {...inputProps}
      />
    </>
  )
}