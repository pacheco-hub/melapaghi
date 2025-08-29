import React, { useMemo, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { format, set } from 'date-fns'
import TextField from './ui/TextField.jsx'
import MoneyInput from './ui/MoneyInput.jsx'
import PhoneInput from './ui/PhoneInput.jsx'
import DateRangeMonthPicker from './ui/DateRangeMonthPicker.jsx'
import Toast from './ui/Toast.jsx'
import CfInput from './ui/CfInput.jsx'
import LockButton from './ui/LockButton.jsx'

export default function SegnalaForm() {
  // Stato "motivo"
  const [motivo, setMotivo] = useState('morosita')
  // Stato Codice Fiscale (unico campo obbligatorio per ora)
  const [cf, setCf] = useState('')
  // Stato telefono
  const [tel, setTel] = useState('')
  // Stato files
  const [files, setFiles] = useState([])
  // Stato importo
  const [importo, setImporto] = useState('')
  // Date range state for periodo della locazione
  const [range, setRange] = useState([null, null])
  const [startDate, endDate] = range
  const [singleValue, setSingleValue] = useState(null)

  const [loading, setLoading] = useState(false)
  const [esito, setEsito] = useState(null)
  const [errori, setErrori] = useState(null)

  const handleSubmit = async () => {
    if (!cfValid) return
    setLoading(true); setEsito(null); setErrori(null)

    try {
      const fd = new FormData()
      // inquilino
      fd.append('cf', cf.toUpperCase())
      fd.append('nome', /* stato nome se lo aggiungi */ '')
      fd.append('cognome', '')
      fd.append('citta', '')
      fd.append('periodo', (startDate && endDate) ? `${format(startDate, 'MM/yyyy')} - ${format(endDate, 'MM/yyyy')}` : '')
      fd.append('tipo_contratto', '')
      fd.append('motivo', motivo)
      fd.append('motivo_altro', '')          // se presente
      fd.append('importo', importo.replace('€','') || '0')              // in euro (string)

      // segnalante
      fd.append('cf_segnalante', '')
      fd.append('nome_segnalante', '')
      fd.append('cognome_segnalante', '')
      fd.append('email_segnalante', '')
      fd.append('tel_segnalante', tel)       // formattato
      fd.append('iban_segnalante', '')

      fd.append('dichiaro', '1')

      // file
      files.forEach((f, i) => fd.append(`allegati[${i}]`, f))

      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      await axios.post('/segnalazioni', fd, {
        headers: { 'X-CSRF-TOKEN': token, 'Content-Type': 'multipart/form-data' }
      })

      setEsito('Segnalazione inviata con successo.')
      setFiles([])
      setTel('')
      setCf('')
      setMotivo('morosita')
      setRange([null, null])
    } catch (err) {
      setErrori(err.response?.data?.errors ?? { _generic: ['Errore in invio'] })
    } finally {
      setLoading(false)
    }
  }

  // Handle file input changes
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  // Rimuovi un file dall'elenco in base all'indice
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const motivoOptions = [
    { value: 'morosita', label: 'Morosità' },
    { value: 'sfratto', label: 'Sfratto convalidato' },
    { value: 'danni', label: 'Danni materiali' },
    { value: 'altro', label: 'Altro (specificare)' }
  ]

  // ---- STILI ----
  const controlHeight = 46
  const styles = {
    page: { background: 'transparent' },
    card: {
      maxWidth: 980,
      margin: '2px auto 32px auto',
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 24px 48px rgba(20, 23, 38, 0.08)',
      padding: '28px 28px 36px',
      border: '1px solid rgba(20,23,38,0.06)'
    },
    header: { fontSize: 22, fontWeight: 800, color: '#1f2d3d', marginBottom: 8, textAlign: 'center' },
    sub: { color: '#4a5568', marginBottom: 20 },
    hr: { border: 0, height: 1, background: 'rgba(20,23,38,0.08)', margin: '20px 0' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 },
    col: {},
    label: { display: 'block', fontSize: 14, fontWeight: 700, color: '#1f2d3d', marginBottom: 6 },
    input: {
      width: '100%', boxSizing: 'border-box',
      border: '1px solid #e6e8ef', borderRadius: 12,
      padding: '12px 14px', fontSize: 16, outline: 'none', background: '#fbfbfe',
      minHeight: controlHeight, display: 'block'
    },
    textarea: {
      width: '100%', minHeight: 96, boxSizing: 'border-box',
      border: '1px solid #e6e8ef', borderRadius: 12,
      padding: '12px 14px', fontSize: 16, outline: 'none', background: '#fbfbfe', resize: 'vertical'
    },
    checkboxRow: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 },
    checkbox: { width: 18, height: 18 },
    helper: { fontSize: 13, color: '#5a6b8a', marginTop: 6 },
    helperBad: { fontSize: 13, color: '#cc2936', marginTop: 6 },
    helperGood: { fontSize: 13, color: '#1e8e3e', marginTop: 6 },
    buttonWrap: { marginTop: 28 },
    button: {
      width: '100%', border: 'none', borderRadius: 30,
      padding: '14px 18px', fontSize: 16, fontWeight: 800,
      background: '#ffbf00', color: '#1f2d3d', cursor: 'pointer',
      boxShadow: '0 8px 18px rgba(255,191,0,0.35)'
    },
    buttonDisabled: {
      width: '100%', border: 'none', borderRadius: 30,
      padding: '14px 18px', fontSize: 16, fontWeight: 800,
      background: '#d1d5db', color: '#6b7280', cursor: 'not-allowed',
      boxShadow: 'none'
    },
    sectionTitle: { fontSize: 18, fontWeight: 800, color: '#1f2d3d', marginTop: 14 }
  }

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%', borderRadius: 12, height: 51,
      borderColor: '#e6e8ef', backgroundColor: '#fbfbfe',
      paddingLeft: 14, paddingRight: 14, paddingTop: 0, paddingBottom: 0,
      fontSize: 16,
      boxShadow: state.isFocused ? '0 0 0 1px #ffbf00' : 'none',
      '&:hover': { borderColor: '#ffbf00' }
    }),
    valueContainer: (provided) => ({ ...provided, padding: '0', fontSize: 16 }),
    input: (provided) => ({ ...provided, margin: 0, padding: 0, fontSize: 16 }),
    indicatorsContainer: (provided) => ({ ...provided, padding: 0 }),
    dropdownIndicator: (provided) => ({ ...provided, padding: 4 }),
    option: (provided, state) => ({
      ...provided,
      fontSize: 16, backgroundColor: state.isFocused ? '#ffef99' : 'white', color: '#1f2d3d', cursor: 'pointer'
    }),
    menu: (provided) => ({ ...provided, borderRadius: 12, overflow: 'hidden' })
  }

  // ---- LOGICA CF ----
  const cfValid = useMemo(
    () => /^[A-Z0-9]{16}$/.test(cf.trim().toUpperCase()),
    [cf]
  )

  // ---- LOGICA IMPORTO E TEL ----
  const isDisabled = !cfValid

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>Segnala un moroso</div>
        <div style={styles.helper}>Tutti i campi sono obbligatori</div>

        {/* DATI INQUILINO */}
        <div style={styles.sectionTitle}>Dati moroso segnalato</div>
        <div style={styles.row}>
          <div style={styles.col}>
            <CfInput
              value={cf}
              onChange={setCf}
              styles={styles}
            />
          </div>
          <div style={styles.col}>
            <MoneyInput
              label="Importo danni"
              value={importo}
              onValueChange={setImporto}
              placeholder="€0"
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <TextField
              label="Nome"
              placeholder="Mario"
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </div>
          <div style={styles.col}>
            <TextField
              label="Cognome"
              placeholder="Rossi"
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Città e provincia</label>
            <input style={styles.input} placeholder="Verona (VR)" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Periodo della locazione</label>
           <DateRangeMonthPicker
              mode="range"
              precision="month"
              value={[startDate, endDate]}
              onChange={setRange}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Tipologia di contratto</label>
            <input style={styles.input} placeholder="4+4 / transitorio / studenti" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Motivo della segnalazione</label>
            <Select
              options={motivoOptions}
              value={motivoOptions.find(opt => opt.value === motivo)}
              onChange={(opt) => setMotivo(opt.value)}
              styles={customSelectStyles}
            />
          </div>
        </div>

        {motivo === 'altro' && (
          <div style={{ ...styles.row, gridTemplateColumns: '1fr' }}>
            <div style={styles.col}>
              <label style={styles.label}>Specifica il motivo</label>
              <textarea style={styles.textarea} placeholder="Scrivi qui il motivo della segnalazione" />
            </div>
          </div>
        )}

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Documenti allegati</label>
            <input style={styles.input} type="file" multiple onChange={handleFileChange} />
            {files.length > 0 && (
              <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                {files.map((file, index) => {
                  const sizeKB = file.size / 1024
                  const sizeMB = sizeKB / 1024
                  const sizeDisplay = sizeMB >= 1 ? `${sizeMB.toFixed(2)} MB` : `${sizeKB.toFixed(2)} KB`
                  return (
                    <li
                      key={index}
                      style={{
                        fontSize: 14,
                        color: '#4a5568',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        padding: '6px 0',
                        borderBottom: '1px dashed #e6e8ef'
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.name} ({sizeDisplay})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        title="Rimuovi questo file"
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: '#cc2936',
                          cursor: 'pointer',
                          fontSize: 16,
                          lineHeight: 1
                        }}
                      >
                        ❌
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div style={styles.col}></div>
        </div>

        <hr style={styles.hr} />

        {/* DATI SEGNALANTE */}
        <div style={styles.sectionTitle}>Dati del segnalante (riservati)</div>
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Codice fiscale</label>
            <input style={styles.input} placeholder="RSSMRA80A01H501U" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>IBAN</label>
            <input style={styles.input} placeholder="IT60X0542811101000000123456" />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <TextField
              label="Nome"
              placeholder="Mario"
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </div>
         <div style={styles.col}>
            <TextField
              label="Cognome"
              placeholder="Rossi"
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} placeholder="mario.rossi@email.it" />
          </div>
          <div style={styles.col}>
            <PhoneInput
              label="Telefono"
              value={tel}
              onValueChange={setTel}
              placeholder="Inserisci numero di telefono"
              labelStyle={styles.label}
              inputStyle={styles.input}
            />
          </div>
        </div>

        <div style={styles.checkboxRow}>
          <input style={styles.checkbox} id="dichiaro" type="checkbox" />
          <label htmlFor="dichiaro" style={{ ...styles.helper, fontSize: 14 }}>
            Dichiaro che le informazioni sono vere e documentabili (artt. 76-77 DPR 445/2000).
          </label>
        </div>

        <div style={styles.buttonWrap}>
          <LockButton
            onClick={handleSubmit}
            disabled={isDisabled || loading}
            loading={loading}
            fullWidth
            label="Invia segnalazione"
            text="Invia Segnalazione"
            lockedText="🔒 Invia Segnalazione"
          />
        </div>
      </div>
      {esito && (
        <Toast
          message={esito}
          type="success"
          onClose={() => setEsito(null)}
          duration={4000}
        />
      )}
      {errori &&
        Object.values(errori)
          .flat()
          .map((msg, i) => (
            <Toast
              key={i}
              message={msg}
              type="error"
              onClose={() => setErrori(null)}
              duration={6000}
            />
          ))}
    </div>
  )
}