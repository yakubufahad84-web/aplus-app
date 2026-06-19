'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [active, setActive] = useState(false)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/login'); return }
      setEmail(session.user.email ?? '')
      try {
        const res = await fetch('/api/access', { headers: { Authorization: `Bearer ${session.access_token}` } })
        const data = await res.json()
        setActive(Boolean(data.active))
        setExpiresAt(data.expiresAt ?? null)
      } catch {
        // leave as no access on error
      }
      setLoading(false)
    })()
  }, [router])

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const card: React.CSSProperties = { background: '#fff', borderRadius: '1.25rem', boxShadow: '0 4px 16px -4px rgb(0 0 0 / 0.1)', padding: '2rem', marginBottom: '1.25rem' }

  return (
    <main className={jakarta.className} style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <nav style={{ background: 'linear-gradient(135deg,#1e3a8a,#0066CC)', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>A+ Theorie</span>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Uitloggen</button>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {loading ? (
          <p style={{ color: '#64748b' }}>Laden…</p>
        ) : (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0066CC', marginBottom: '0.25rem' }}>Welkom terug 👋</h1>
            <p style={{ color: '#64748b', marginBottom: '1.75rem' }}>{email}</p>

            <div style={card}>
              {active ? (
                <>
                  <span style={{ display: 'inline-block', background: '#f0fdf4', color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', padding: '0.35rem 0.9rem', borderRadius: 999 }}>Toegang actief</span>
                  <p style={{ color: '#475569', marginTop: '0.9rem' }}>
                    Je toegang is geldig tot{' '}
                    <strong>{expiresAt ? new Date(expiresAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</strong>.
                  </p>
                  <button onClick={() => router.push('/oefenen')} style={{ marginTop: '1.25rem', background: 'linear-gradient(135deg,#1e3a8a,#0066CC)', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.8rem 2rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Start met oefenen →
                  </button>
                </>
              ) : (
                <>
                  <span style={{ display: 'inline-block', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: '0.85rem', padding: '0.35rem 0.9rem', borderRadius: 999 }}>Geen actieve toegang</span>
                  <p style={{ color: '#475569', marginTop: '0.9rem' }}>Kies een pakket om te beginnen met oefenen.</p>
                  <button onClick={() => router.push('/betalen')} style={{ marginTop: '1.25rem', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.8rem 2rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Kies een pakket →
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
