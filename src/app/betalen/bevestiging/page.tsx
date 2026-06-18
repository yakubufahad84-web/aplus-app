'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { useRouter } from 'next/navigation'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default function BevestigingPage() {
  const router = useRouter()

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
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '420px',
        margin: '0 1rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#f0fdf4',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
        }}>✓</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.5rem' }}>
          Betaling geslaagd!
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Je account is geactiveerd. Je kunt nu starten met oefenen.
        </p>
        <button
          onClick={() => router.push('/login')}
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0066CC 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.9375rem',
            padding: '0.75rem 2rem',
            borderRadius: '0.625rem',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 8px 24px -4px rgb(0 102 204 / 0.35)',
          }}
        >
          Ga naar inloggen →
        </button>
      </div>
    </main>
  )
}
