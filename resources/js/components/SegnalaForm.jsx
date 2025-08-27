import React, { useMemo, useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import axios from 'axios'
import DatePicker from "react-datepicker";
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

function Toast({ message, type, onClose, duration }) {
  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const baseStyle = {
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
    // Removed color: '#fff', typeStyles will set color
  }

  // Updated to match ContattiForm
  const typeStyles = {
    success: { background: '#e7f6ec', color: '#1e8e3e' },
    error: { background: '#fdecea', color: '#cc2936' }
  }

  return (
    <div
      style={{ ...baseStyle, ...typeStyles[type] }}
      onClick={onClose}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  )
}

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
  // Touched state for inputs
  const [touched, setTouched] = useState({ cf: false })

  const [loading, setLoading] = useState(false)
  const [esito, setEsito] = useState(null)
  const [errori, setErrori] = useState(null)

  // Handle phone input changes (auto-format: 3-3-4-3 as digits grow)
  const handleTelChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    let formatted = digits
    if (digits.length > 3 && digits.length <= 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3)
    } else if (digits.length > 6 ) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6)
    }
    setTel(formatted)
  }

  // Handle importo input, numeric only, with euro symbol
  const handleImportoChange = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, '')
    setImporto(digits ? `€${digits}` : '')
  }

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
      setTouched({ cf: false })
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

  // Lista anni per il DatePicker (ultimi 20 anni)
  const years = useMemo(() => {
    const now = new Date().getFullYear();
    const span = 20; // last 20 years (inclusive)
    return Array.from({ length: span + 1 }, (_, i) => now - i);
  }, []);

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

  // Custom header per DatePicker: frecce cambiano ANNO, titolo è un select degli anni
  const renderDpHeader = ({ date, changeYear, decreaseYear, increaseYear }) => {
    const currentYear = new Date().getFullYear();
    const isAtMaxYear = date.getFullYear() >= currentYear;
    return (
      <div className="melap-dp__headerbar">
        <button
          type="button"
          className="melap-dp__nav"
          onClick={decreaseYear}
          aria-label="Anno precedente"
        >
          ‹
        </button>
        <div className="melap-dp__title">
          <select
            className="melap-dp__year"
            value={date.getFullYear()}
            onChange={(e) => changeYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="melap-dp__nav"
          onClick={isAtMaxYear ? undefined : increaseYear}
          aria-label="Anno successivo"
          disabled={isAtMaxYear}
        >
          ›
        </button>
      </div>
    );
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
  const cfUpper = useMemo(() => cf.toUpperCase(), [cf])
  const cfLen = cfUpper.trim().length
  const cfValid = useMemo(() => /^[A-Z0-9]{16}$/.test(cfUpper.trim()), [cfUpper])
  const cfMessageNode = useMemo(() => {
    if (cfLen === 0) return null
    if (cfLen < 16) return <div style={styles.helperBad}>Mancano {16 - cfLen} caratteri.</div>
    if (cfLen > 16) return <div style={styles.helperBad}>Hai inserito {cfLen - 16} caratteri in più.</div>
    if (!cfValid) return <div style={styles.helperBad}>Il CF deve essere alfanumerico (A–Z, 0–9).</div>
  }, [cfLen, cfValid])

  // ---- LOGICA IMPORTO E TEL ----
  const isDisabled = !cfValid

  const dpInputCss = `
    .melap-date-wrapper { width: 100%; display: block; position: relative; }
    .melap-date-input {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #e6e8ef;
      border-radius: 12px;
      padding: 12px 14px 12px 40px;
      font-size: 16px;
      outline: none;
      background: #fbfbfe;
      min-height: ${controlHeight}px;
      display: block;
      position: relative; /* establish stacking context under the icon */
    }
    .melap-date-wrapper .melap-date-icon {
      position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
      font-size: 18px; opacity: .65; pointer-events: none;
      z-index: 2; /* make sure the icon sits above the input */
    }
    /* Calendar panel */
    .melap-dp { border: 0; border-radius: 16px; box-shadow: 0 24px 48px rgba(20,23,38,.12); overflow: hidden; }
    .melap-dp .react-datepicker__header { background: #f5f4ff; border-bottom: 1px solid rgba(20,23,38,.06); padding-top: 8px; }
    .melap-dp__headerbar { display:flex; align-items:center; justify-content:space-between; padding: 8px 12px; }
    .melap-dp__title { font-weight: 800; color: #1f2d3d; }
    .melap-dp__nav { background: #ffffff; border: 1px solid rgba(20,23,38,.08); width:28px; height:28px; border-radius: 8px; cursor:pointer; }
    .melap-dp__nav:hover { border-color: #ffbf00; }
    .melap-dp__nav:disabled { opacity: .35; cursor: not-allowed; }
    .melap-dp .react-datepicker__month { margin: 8px; }
    .melap-dp .react-datepicker__month-text { border-radius: 10px; padding: 6px 8px; }
    .melap-dp .react-datepicker__month-text:hover { background: #ffef99; }
    .melap-dp .react-datepicker__month--selected, 
    .melap-dp .react-datepicker__month-text--keyboard-selected, 
    .melap-dp .react-datepicker__month-text--in-selecting-range,
    .melap-dp .react-datepicker__month-text--in-range { background: #ffbf00 !important; color: #1f2d3d !important; }
    .melap-dp .react-datepicker__triangle { display:none; }
    .melap-dp__year { appearance: none; background:#fff; border:1px solid rgba(20,23,38,.12); border-radius:10px; padding:4px 10px; font-weight:700; cursor:pointer; }
    .melap-dp__year:hover { border-color:#ffbf00; }
  `

  return (
    <div style={styles.page}>
      <style>{dpInputCss}</style>
      <div style={styles.card}>
        <div style={styles.header}>Segnala un inquilino</div>
        <div style={styles.helper}>Tutti i campi sono obbligatori</div>

        {/* DATI INQUILINO */}
        <div style={styles.sectionTitle}>Dati inquilino segnalato</div>
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Codice fiscale *</label>
            <input
              style={{
                ...styles.input,
                borderColor: touched.cf ? (cfValid ? '#1e8e3e' : '#cc2936') : '#e6e8ef'
              }}
              placeholder="RSSMRA80A01H501U"
              value={cfUpper}
              onChange={(e) => setCf(e.target.value)}
              onFocus={() => setTouched(prev => ({ ...prev, cf: true }))}
              maxLength={32}
              inputMode="text"
              autoComplete="off"
            />
            {cfMessageNode}
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Importo danni</label>
            <input
              style={styles.input}
              placeholder="€0"
              value={importo}
              onChange={handleImportoChange}
              inputMode="numeric"
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Nome</label>
            <input style={styles.input} placeholder="Mario" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Cognome</label>
            <input style={styles.input} placeholder="Rossi" />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Città e provincia</label>
            <input style={styles.input} placeholder="Verona (VR)" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Periodo della locazione</label>
            <div className="melap-date-wrapper">
              <span className="melap-date-icon" aria-hidden>📅</span>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setRange(update)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="01/2023 - 06/2024"
                className="melap-date-input"
                wrapperClassName="melap-date-wrapper"
                locale={it}
                calendarClassName="melap-dp"
                popperClassName="melap-dp-popper"
                popperPlacement="bottom-start"
                isClearable
                shouldCloseOnSelect={false}
                renderCustomHeader={renderDpHeader}
              />
            </div>
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
            <label style={styles.label}>Nome</label>
            <input style={styles.input} placeholder="Mario" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Cognome</label>
            <input style={styles.input} placeholder="Rossi" />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} placeholder="mario.rossi@email.it" />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Telefono</label>
            <input
              style={styles.input}
              placeholder="Inserisci numero di telefono"
              value={tel}
              onChange={handleTelChange}
              inputMode="tel"
              maxLength={12}
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
          <button type="button" style={isDisabled ? styles.buttonDisabled : styles.button} disabled={isDisabled || loading} onClick={handleSubmit}>
            {isDisabled ? '🔒 Invia segnalazione' : (loading ? 'Invio…' : 'Invia segnalazione')}
          </button>
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