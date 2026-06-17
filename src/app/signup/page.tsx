'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setError('')
    if (password !== confirm) {
      setError('Wachtwoorden komen niet overeen.')
      return
    }
    if (password.length < 8) {
      setError('Wachtwoord moet minimaal 8 tekens zijn.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/login?registered=true')
    }
    setLoading(false)
  }

  return (
    <main className={jakarta.className} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, #1e3a8a 0%, #0055aa 50%, #0066CC 100%)',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '1.75rem',
        boxShadow: '0 40px 64px -12px rgb(0 0 0 / 0.18)',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '420px',
        margin: '0 1rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" width={80} height={80} style={{ marginBottom: '1rem' }}>
            <circle cx="32" cy="32" r="31" fill="white"/>
            <circle cx="32" cy="32" r="29" fill="none" stroke="#0066CC" strokeWidth="4.5"/>
            <circle cx="32" cy="32" r="22" fill="none" stroke="#f97316" strokeWidth="3"/>
            <text x="29" y="44" fontFamily="'Arial Black',Arial,sans-serif" fontSize="30" fontWeight="900" fill="#0066CC" textAnchor="middle">A</text>
            <text x="47" y="35" fontFamily="'Arial Black',Arial,sans-serif" fontSize="20" fontWeight="900" fill="#f97316" textAnchor="middle">+</text>
          </svg>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0066CC', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.25rem' }}>A+ Theorie</h1>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f97316' }}>Maak een gratis account aan</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.375rem' }}>
              E-mailadres
            </label>
            <input
              type="email"
              placeholder="jouw@email.nl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '0.625rem', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.375rem' }}>
              Wachtwoord
            </label>
            <input
              type="password"
              placeholder="Minimaal 8 tekens"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '0.625rem', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.375rem' }}>
              Wachtwoord bevestigen
            </label>
            <input
              type="password"
              placeholder="Herhaal je wachtwoord"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '0.625rem', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#ef4444', textAlign: 'center' }}>{error}</p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            style={{ width: '100%', background: 'linear-gradient(135deg, #1e3a8a 0%, #0066CC 100%)', color: '#ffffff', fontWeight: 700, fontSize: '0.9375rem', padding: '0.75rem', borderRadius: '0.625rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 24px -4px rgb(0 102 204 / 0.35)', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Bezig...' : 'Account aanmaken'}
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748b', marginTop: '1.5rem' }}>
          Al een account?{' '}
          <a href="/login" style={{ color: '#0066CC', fontWeight: 600 }}>Inloggen</a>
        </p>
      </div>
    </main>
  )
}
