import { useState } from 'react'

// ---------------------------------------------------------------
// Cute pink theme. The whole design lives in this one file: the CSS
// below is injected into the page once, when the app loads.
// ---------------------------------------------------------------
const PINK_THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
/* ---------- Cute pink theme ---------- */
:root {
  color-scheme: light;
  --bg1: #fff0f6;
  --bg2: #ffe3ef;
  --surface: #ffffff;
  --text: #4a2c3a;
  --muted: #a17a8d;
  --border: #fbc9dd;
  --primary: #e0457f;
  --primary-dark: #c92f6a;
  --primary-soft: #ffe8f1;
  --danger: #c2255c;
  --danger-bg: #fff0f5;
  --shadow: 0 8px 24px rgba(224, 69, 127, .14);
  --radius: 20px;
}
* { box-sizing: border-box; }
body {
  margin: 0; color: var(--text);
  font: 15px/1.55 'Quicksand', 'Nunito', system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: linear-gradient(160deg, var(--bg1), var(--bg2)) fixed;
  min-height: 100vh;
}
h1 { font-size: 1.5rem; margin: 0; font-weight: 700; color: var(--primary-dark); }
h2 { font-size: 1.15rem; margin: 0; font-weight: 700; color: var(--primary-dark); }
.muted { color: var(--muted); }

.page { max-width: 1000px; margin: 0 auto; padding: 28px 16px 56px; }
.center { min-height: 100vh; display: grid; place-items: center; padding: 16px; }

.card {
  background: var(--surface); border: 2px solid var(--border);
  border-radius: var(--radius); padding: 22px; box-shadow: var(--shadow);
}
.login { width: 100%; max-width: 390px; display: grid; gap: 14px; text-align: center; }
.login h1 { font-size: 1.7rem; }
.login label { text-align: left; }
.login p { margin: 0; }

.topbar {
  display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
  margin-bottom: 20px; padding: 14px 20px;
  background: var(--surface); border: 2px solid var(--border); border-radius: 999px; box-shadow: var(--shadow);
}
.user { display: flex; align-items: center; gap: 12px; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; }

label { display: grid; gap: 5px; font-size: .85rem; font-weight: 600; color: var(--muted); }
input, textarea {
  font: inherit; color: var(--text); background: #fffafc; width: 100%;
  border: 2px solid var(--border); border-radius: 14px; padding: 10px 14px;
  transition: border-color .15s, box-shadow .15s;
}
input::placeholder, textarea::placeholder { color: #d9b3c5; }
input:focus, textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(224, 69, 127, .15); }

.btn {
  font: inherit; font-weight: 700; cursor: pointer; color: var(--primary-dark);
  background: var(--primary-soft); border: 2px solid var(--border); border-radius: 999px; padding: 8px 18px;
  transition: transform .12s, box-shadow .12s, background .12s;
}
.btn:hover { background: #ffd9e8; transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn:focus-visible { outline: 3px solid rgba(224, 69, 127, .4); outline-offset: 2px; }
.btn.primary { color: #fff; border-color: transparent; background: linear-gradient(135deg, #ee5d94, var(--primary-dark)); box-shadow: 0 4px 12px rgba(224, 69, 127, .35); }
.btn.primary:hover { background: linear-gradient(135deg, #e94a86, #b82762); }
.btn.danger { color: var(--danger); background: var(--danger-bg); border-color: #f7b6cc; }
.btn.danger:hover { background: #ffe0ea; }
.btn.small { padding: 4px 13px; font-size: .85rem; }
.btn:disabled { opacity: .6; cursor: wait; transform: none; }

.alert {
  background: var(--danger-bg); color: var(--danger); border: 2px solid #f7b6cc; border-radius: 14px;
  padding: 10px 14px; margin-bottom: 12px; font-size: .9rem; font-weight: 600; text-align: left;
}

.table-wrap { overflow-x: auto; border-radius: 16px; border: 2px solid var(--border); }
table { width: 100%; border-collapse: collapse; background: var(--surface); }
th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #fde1ec; vertical-align: middle; }
tbody tr:last-child td { border-bottom: none; }
th { background: var(--primary-soft); font-size: .75rem; text-transform: uppercase; letter-spacing: .06em; color: var(--primary-dark); white-space: nowrap; }
tbody tr:hover { background: #fff7fa; }
.num { text-align: right; white-space: nowrap; }
.desc { max-width: 260px; color: var(--muted); }
.row-actions { display: flex; gap: 6px; white-space: nowrap; }

.overlay { position: fixed; inset: 0; background: rgba(120, 40, 80, .35); backdrop-filter: blur(3px); display: grid; place-items: center; padding: 16px; }
.modal { width: 100%; max-width: 450px; display: grid; gap: 14px; animation: pop .18s ease-out; }
.modal h2 { font-size: 1.3rem; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }

@keyframes pop { from { opacity: 0; transform: scale(.94) translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .modal { animation: none; } .btn { transition: none; } }
@media (max-width: 520px) { .topbar { border-radius: 24px; } .row { grid-template-columns: 1fr; } }

/* emoji decorations (so no other file needs to change) */
.login h1::before { content: '🎀'; display: block; font-size: 2.2rem; margin-bottom: 4px; }
.topbar h1::before { content: '🎀 '; }
.toolbar h2::before { content: '💖 '; }
`

if (typeof document !== 'undefined' && !document.getElementById('pink-theme')) {
  const style = document.createElement('style')
  style.id = 'pink-theme'
  style.textContent = PINK_THEME_CSS
  document.head.appendChild(style)
}

const empty = { product_name: '', description: '', price: '', quantity: '' }

// Used for both "Add" (product = null) and "Edit" (product = existing row)
export default function ProductForm({ product, onSave, onCancel, saving, error }) {
  const [form, setForm] = useState(
    product
      ? { product_name: product.product_name, description: product.description ?? '', price: product.price, quantity: product.quantity }
      : empty
  )
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    onSave({ ...form, price: Number(form.price), quantity: Number(form.quantity) })
  }

  return (
    <div className="overlay" onClick={onCancel}>
      <form className="card modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>{product ? '✏️ Edit product' : '🌸 Add product'}</h2>
        {error && <div className="alert">{error}</div>}

        <label>Product name
          <input value={form.product_name} onChange={set('product_name')} maxLength={100} placeholder="e.g. Strawberry Notebook" required autoFocus />
        </label>
        <label>Description
          <textarea rows={3} value={form.description} onChange={set('description')} placeholder="Tell us about this product…" />
        </label>
        <div className="row">
          <label>Price
            <input type="number" min="0" step="0.01" value={form.price} onChange={set('price')} required />
          </label>
          <label>Quantity
            <input type="number" min="0" step="1" value={form.quantity} onChange={set('quantity')} required />
          </label>
        </div>

        <div className="actions">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}