import React, { useMemo, useState } from 'react'
import axios from 'axios'
import CfInput from './ui/CfInput.jsx'
import LockButton from './ui/LockButton.jsx'

export default function Consulta() {
  const [cf, setCf] = useState('')
  const [risultato, setRisultato] = useState(null)

  // Stili minimi coerenti con CfInput riutilizzabile
  const styles = {
    label: { display: 'block', fontSize: 14, fontWeight: 700, color: '#1f2d3d', marginBottom: 6 },
    input: {
      width: '300px',
      padding: '12px 14px',
      borderRadius: '12px',
      border: '1px solid #e6e8ef',
      background: '#fbfbfe',
      outline: 'none',
      boxSizing: 'border-box',
      fontSize: 16
    },
    helperBad: { fontSize: 13, color: '#cc2936', marginTop: 6 },
  }

  const cfValid = useMemo(() => /^[A-Z0-9]{16}$/.test(cf.trim().toUpperCase()), [cf])

  const handleSearch = async () => {
    if (!cfValid) return
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      const res = await axios.post('/segnalazioni/check', { cf: cf.trim().toUpperCase() }, {
        headers: { 'X-CSRF-TOKEN': token }
      })
      setRisultato(res.data?.found ? 'segnalazione presente' : 'Nessuna segnalazione presente')
    } catch (err) {
      console.error(err)
      setRisultato('Errore durante la ricerca')
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#524f98' }}>Inserisci il codice fiscale da verificare</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <CfInput 
          value={cf}
          onChange={setCf} 
          styles={styles} 
          label={''} 
        />

        <LockButton
          onClick={handleSearch}
          disabled={!cfValid}
          loading={false}
          text="Cerca"
          lockedText="🔒 Cerca"
          style={{ width: '300px', marginTop: '12px' }}
        />
      </div>

      {risultato && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              fontWeight: 600,
              width: '300px',
              textAlign: 'center',
              background: risultato === 'segnalazione presente' ? '#fdecea' : '#e7f6ec',
              color: risultato === 'segnalazione presente' ? '#cc2936' : '#1e8e3e',
            }}
          >
            {risultato}
          </div>
        </div>
      )}
    </div>
  )
}