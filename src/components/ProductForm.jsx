import { useState } from 'react'

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
        <h2>{product ? 'Edit product' : 'Add product'}</h2>
        {error && <div className="alert">{error}</div>}

        <label>Product name
          <input value={form.product_name} onChange={set('product_name')} maxLength={100} required autoFocus />
        </label>
        <label>Description
          <textarea rows={3} value={form.description} onChange={set('description')} />
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
