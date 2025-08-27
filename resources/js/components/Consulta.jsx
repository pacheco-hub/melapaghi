// resources/js/components/Consulta.jsx
import React, { useMemo, useState } from 'react'
import axios from 'axios'

export default function Consulta() {
  // stato per il campo di input
  const [cf, setCf] = useState('')
  const [risultato, setRisultato] = useState(null)

  // --- Validazione CF: 16 caratteri, A-Z 0-9 ---
  const cfUpper = useMemo(() => cf.toUpperCase(), [cf])
  const cfLen = cfUpper.trim().length
  const cfValid = useMemo(() => /^[A-Z0-9]{16}$/.test(cfUpper.trim()), [cfUpper])
  const helperNode = useMemo(() => {
    if (cfLen === 0) return null
    if (cfLen < 16) return <div style={{ color: '#cc2936', fontSize: 13, marginTop: 6 }}>Mancano {16 - cfLen} caratteri.</div>
    if (cfLen > 16) return <div style={{ color: '#cc2936', fontSize: 13, marginTop: 6 }}>Hai inserito {cfLen - 16} caratteri in più.</div>
    if (!cfValid) return <div style={{ color: '#cc2936', fontSize: 13, marginTop: 6 }}>Usa solo lettere A–Z e numeri 0–9.</div>
  }, [cfLen, cfValid])

  // funzione placeholder che useremo poi per fare la ricerca
  const handleSearch = async () => {
    if (!cfValid) return

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      const res = await axios.post('/segnalazioni/check', { cf: cfUpper }, {
        headers: { 'X-CSRF-TOKEN': token }
      })

      if (res.data.found) {
        setRisultato('segnalazione presente')
      } else {
        setRisultato('Nessuna segnalazione presente')
      }
    } catch (err) {
      console.error(err)
      setRisultato('Errore durante la ricerca')
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#524f98' }}>Inserisci il codice fiscale da verificare</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Codice Fiscale"
          value={cfUpper}
          onChange={(e) => setCf(e.target.value)}
          autoComplete="off"
          style={{
            width: '300px',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleSearch}
          disabled={!cfValid}
          style={{
            width: '300px',
            marginTop: '12px',
            padding: '14px',
            border: 'none',
            borderRadius: '30px',
            background: cfValid ? '#ffbf00' : '#d1d5db',
            color: '#1f2d3d',
            fontWeight: 'bold',
            cursor: cfValid ? 'pointer' : 'not-allowed'
          }}
        >
          {cfValid ? 'Cerca' : '🔒 Cerca'}
        </button>
        <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>{helperNode}</div>
      </div>

      {/* Mostreremo qui il risultato */}
      {risultato && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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