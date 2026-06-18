'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { useRouter } from 'next/navigation'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default function FoutPage() {
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
          background: '#fef2f2',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
        }}>✕</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginBottom: '0.5rem' }}>
          Betaling mislukt
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Er is iets misgegaan met je betaling. Probeer het opnieuw of neem contact op.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => router.push('/betalen')}
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
            Opnieuw proberen →
          </button>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'transparent',
              color: '#64748b',
              fontWeight: 600,
              fontSize: '0.875rem',
              padding: '0.75rem 2rem',
              borderRadius: '0.625rem',
              border: '1.5px solid #e2e8f0',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Terug naar home
          </button>
        </div>
      </div>
    </main>
  )
}
