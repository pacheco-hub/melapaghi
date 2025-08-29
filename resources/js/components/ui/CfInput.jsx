import { useMemo, useState } from 'react'

export default function CfInput({
  label = 'Codice fiscale *',
  value,
  onChange,          // (newValue) => void
  styles             // passaci l’oggetto styles del form per coerenza visiva
}) {
  const [touched, setTouched] = useState(false)

  const safeValue = useMemo(() => (value || "").toString(), [value]);
  const cfUpper = useMemo(() => safeValue.toUpperCase(), [safeValue]);
  const cfTrim  = useMemo(() => cfUpper.trim(), [cfUpper]);
  const len     = cfTrim.length;
  const valid   = useMemo(() => /^[A-Z0-9]{16}$/.test(cfTrim), [cfTrim]);

  const helperNode = useMemo(() => {
    if (len === 0) return null
    if (len < 16) return <div style={styles.helperBad}>Mancano {16 - len} caratteri.</div>
    if (len > 16) return <div style={styles.helperBad}>Hai inserito {len - 16} caratteri in più.</div>
    if (!valid)   return <div style={styles.helperBad}>Il CF deve essere alfanumerico (A–Z, 0–9).</div>
    return null
  }, [len, valid, styles])

  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input
        style={{
          ...styles.input,
          borderColor: touched ? (valid ? '#1e8e3e' : '#cc2936') : '#e6e8ef'
        }}
        placeholder="RSSMRA80A01H501U"
        value={cfUpper}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setTouched(true)}
        maxLength={32}
        inputMode="text"
        autoComplete="off"
      />
      {helperNode}
    </div>
  )
}