import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContattiForm() {
  const POST_URL = '/contatti';
  const SUCCESS_MSG = 'Messaggio inviato! Ti ricontatteremo al più presto.';
  const ERROR_MSG = 'Si è verificato un errore. Riprova fra poco.';

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [alert, setAlert] = useState(null);

  const onPhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3);
    } else if (digits.length > 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6);
    }
    setForm(prev => ({ ...prev, phone: formatted }));
  };

  const onChange = k => e => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const nameOk = form.name.trim().length >= 2;
  const emailOk = /\S+@\S+\.\S+/.test(form.email.trim());
  const messageOk = form.message.trim().length >= 5;
  const valid = nameOk && emailOk && messageOk;

  const submit = async e => {
    e.preventDefault();
    if (!valid || busy) return;

    setBusy(true);
    setAlert(null);

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      await axios.post(
        POST_URL,
        { ...form },
        {
          headers: {
            'X-CSRF-TOKEN': token,
            'Accept': 'application/json',
          },
        }
      );
      setAlert({ type: 'success', text: SUCCESS_MSG });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Errore invio contatto:', err);
      setAlert({ type: 'danger', text: ERROR_MSG });
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (alert) {
      const t = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(t);
    }
  }, [alert]);

  return (
    <div className="hero-form contact">
      <h3 className="subtitle">Scrivici un messaggio</h3>
      <p className="text">Compila il form e ti risponderemo il prima possibile.</p>

      {alert && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: alert.type === 'success' ? '#e7f6ec' : '#fdecea',
            color: alert.type === 'success' ? '#1e8e3e' : '#cc2936',
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontWeight: 600,
            zIndex: 9999,
          }}
        >
          {alert.type === 'success' ? '✅ ' : '⚠️ '}
          {alert.text}
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={form.name}
            onChange={onChange('name')}
            required
            style={{ borderColor: nameOk ? 'green' : 'red' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="email"
            className="form-control"
            placeholder="Indirizzo email"
            value={form.email}
            onChange={onChange('email')}
            required
            style={{ borderColor: emailOk ? 'green' : 'red' }}
          />
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Numero di telefono"
          value={form.phone}
          onChange={onPhoneChange}
          inputMode="tel"
          maxLength={12}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <textarea
            className="input-field borderd textarea"
            rows="3"
            id="message"
            placeholder="Messaggio"
            value={form.message}
            onChange={onChange('message')}
            required
            style={{ borderColor: messageOk ? 'green' : 'red' }}
          />
        </div>
        <button
          type="submit"
          className="button button-1"
          disabled={!valid || busy}
          aria-busy={busy}
          style={{
            background: !valid ? '#d1d5db' : '',
            color: !valid ? '#6b7280' : '',
            cursor: !valid ? 'not-allowed' : 'pointer'
          }}
        >
          {busy ? 'Invio in corso…' : (valid ? 'Invia Messaggio' : '🔒 Invia Messaggio')}
        </button>
      </form>
    </div>
  );
}