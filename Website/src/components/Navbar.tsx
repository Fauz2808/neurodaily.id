'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/artikel', label: 'Artikel' },
  { href: '/kategori/fokus', label: 'Fokus' },
  { href: '/kategori/tidur', label: 'Tidur' },
  { href: '/kategori/otak', label: 'Otak' },
  { href: '/tentang', label: 'Tentang' },
]

function BrainMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
      stroke="#5EC9A7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-7 4-11 11-11 5 0 8 3 8 7 0 3-2 5-5 5-3 0-4 1.4-4 3.5 0 2 1.4 3.5 3.5 3.5" />
      <circle cx="20" cy="12" r="1.5" fill="#5EC9A7" stroke="none" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,46,40,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,243,238,0.10)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <BrainMark />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: 'var(--parchment)',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            <span style={{ color: 'var(--green)' }}>Neuro</span> Daily
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase' as const,
                color: 'rgba(245,243,238,0.70)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#5EC9A7')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.70)')}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.06em',
              background: 'var(--parchment)',
              color: 'var(--forest)',
              padding: '10px 20px',
              borderRadius: '99px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.28)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Langganan
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--parchment)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8">
            {menuOpen
              ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
              : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(13,46,40,0.97)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(245,243,238,0.10)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '20px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase' as const,
                color: 'rgba(245,243,238,0.75)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              letterSpacing: '0.06em',
              background: 'var(--parchment)',
              color: 'var(--forest)',
              padding: '12px 20px',
              borderRadius: '99px',
              textDecoration: 'none',
              textAlign: 'center' as const,
              marginTop: '4px',
            }}
          >
            Langganan
          </Link>
        </div>
      )}
    </header>
  )
}
