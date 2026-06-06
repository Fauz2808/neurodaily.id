'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error')
      return
    }
    setTimeout(() => { setStatus('success'); setEmail('') }, 500)
  }

  if (status === 'success') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '18px',
        padding: '24px 28px',
        borderRadius: '16px',
        background: 'rgba(94,201,167,0.08)',
        border: '1px solid rgba(94,201,167,0.30)',
        maxWidth: '540px',
      }}>
        <span style={{
          width: '40px', height: '40px',
          borderRadius: '99px',
          background: 'var(--green)',
          color: 'var(--forest)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}>
          ✓
        </span>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '21px',
            color: 'var(--parchment)',
          }}>
            Sip, kamu sudah terdaftar.
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: 1.55,
            color: 'rgba(245,243,238,0.65)',
            marginTop: '6px',
          }}>
            Cek inbox-mu — edisi pertama akan tiba Selasa pagi ini.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '12px', maxWidth: '540px', flexWrap: 'wrap' }}
        noValidate
      >
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
          placeholder="nama@email.com"
          aria-label="Alamat email"
          style={{
            flex: 1,
            minWidth: '200px',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 300,
            padding: '15px 22px',
            borderRadius: '99px',
            border: status === 'error'
              ? '1px solid var(--red)'
              : '1px solid rgba(245,243,238,0.22)',
            background: 'rgba(245,243,238,0.05)',
            color: 'var(--parchment)',
            outline: 'none',
            transition: 'border-color 0.25s ease',
          }}
          onFocus={e => { if (status !== 'error') e.target.style.borderColor = 'var(--green)' }}
          onBlur={e  => { if (status !== 'error') e.target.style.borderColor = 'rgba(245,243,238,0.22)' }}
        />
        <button
          type="submit"
          className="btn btn-green"
          style={{ border: 'none' }}
        >
          Langganan
        </button>
      </form>

      {status === 'error' && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--red)',
          marginTop: '10px',
          paddingLeft: '4px',
        }}>
          Masukkan alamat email yang valid.
        </p>
      )}

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.08em',
        color: 'rgba(245,243,238,0.38)',
        marginTop: '18px',
      }}>
        Gratis · Bisa unsubscribe kapan saja
      </p>
    </div>
  )
}
