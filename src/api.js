import axios from 'axios'

// The frontend only ever talks to the LavaLust API - never directly to the database.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')

const KEY = 'pm_auth'

export const auth = {
  get() {
    try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
  },
  set(value) { localStorage.setItem(KEY, JSON.stringify(value)) },
  clear() { localStorage.removeItem(KEY) },
}

const api = axios.create({ baseURL: `${API_URL}/api` })

// Attach the access token to every request
api.interceptors.request.use((config) => {
  const saved = auth.get()
  if (saved?.tokens?.access_token) {
    config.headers.Authorization = `Bearer ${saved.tokens.access_token}`
  }
  return config
})

// If the access token expired (401), try once to get a new one with the refresh token
let refreshing = null
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const saved = auth.get()
    const isAuthCall = original?.url?.includes('/login') || original?.url?.includes('/refresh')

    if (error.response?.status === 401 && saved?.tokens?.refresh_token && !original._retry && !isAuthCall) {
      original._retry = true
      try {
        refreshing ??= axios
          .post(`${API_URL}/api/refresh`, { refresh_token: saved.tokens.refresh_token })
          .finally(() => { refreshing = null })
        const { data } = await refreshing
        auth.set({ ...saved, tokens: data.tokens })
        original.headers.Authorization = `Bearer ${data.tokens.access_token}`
        return api(original)
      } catch {
        auth.clear()
        window.dispatchEvent(new Event('pm:logout'))
      }
    }
    return Promise.reject(error)
  }
)


export const login = (username, password) =>
  api.post('/login', { username, password }).then((r) => r.data)

export const logout = () => {
  const saved = auth.get()
  return api.post('/logout', { refresh_token: saved?.tokens?.refresh_token })
}

export const getProducts = () => api.get('/products').then((r) => r.data.data)
export const createProduct = (p) => api.post('/products', p).then((r) => r.data)
export const updateProduct = (id, p) => api.put(`/products/${id}`, p).then((r) => r.data)
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data)

export const errorMessage = (err) =>
  err.response?.data?.error || (err.request ? 'Cannot reach the API. Check VITE_API_URL and CORS.' : err.message)
