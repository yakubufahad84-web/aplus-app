'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default function VerwerkenPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulatie — wordt vervangen door echte Mollie redirect
    const timer = setTimeout(() => {
      router.push('/betalen/bevestiging')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

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
          margin: '0 auto 1.5rem',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #0066CC',
          borderRadius: '9999px',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0066CC', marginBottom: '0.5rem' }}>
          Betaling wordt verwerkt
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Je wordt doorgestuurd naar Mollie. Even geduld...
        </p>
      </div>
    </main>
  )
}
