import { useEffect, useState } from 'react'
import Login from './components/Login.jsx'
import Products from './components/Products.jsx'
import { auth, logout } from './api.js'

export default function App() {
  const [session, setSession] = useState(() => auth.get())

  // The API layer fires this event when the refresh token is no longer valid
  useEffect(() => {
    const onLogout = () => setSession(null)
    window.addEventListener('pm:logout', onLogout)
    return () => window.removeEventListener('pm:logout', onLogout)
  }, [])

  const handleLogin = (data) => {
    auth.set(data)
    setSession(data)
  }

  const handleLogout = async () => {
    try { await logout() } catch { /* token may already be expired - still log out locally */ }
    auth.clear()
    setSession(null)
  }

  return session ? (
    <Products user={session.user} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  )
}
