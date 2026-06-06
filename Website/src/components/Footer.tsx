'use client'

import Link from 'next/link'

function BrainMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none"
      stroke="#5EC9A7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-7 4-11 11-11 5 0 8 3 8 7 0 3-2 5-5 5-3 0-4 1.4-4 3.5 0 2 1.4 3.5 3.5 3.5" />
      <circle cx="20" cy="12" r="1.5" fill="#5EC9A7" stroke="none" />
    </svg>
  )
}

const footerLinks = {
  Jelajahi: [
    { href: '/artikel',   label: 'Semua Artikel' },
    { href: '/tentang',   label: 'Tentang Kami' },
    { href: '#newsletter', label: 'Newsletter' },
  ],
  Topik: [
    { href: '/kategori/fokus',     label: 'Fokus' },
    { href: '/kategori/tidur',     label: 'Tidur' },
    { href: '/kategori/kebiasaan', label: 'Kebiasaan' },
    { href: '/kategori/emosi',     label: 'Emosi' },
    { href: '/kategori/otak',      label: 'Otak' },
  ],
  Ikuti: [
    { href: 'https://instagram.com/neurodaily.id', label: 'Instagram' },
    { href: 'https://tiktok.com/@neurodaily.id',   label: 'TikTok' },
    { href: 'https://threads.net/@neurodaily.id',  label: 'Threads' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="bg-dark"
      style={{ borderTop: '1px solid rgba(245,243,238,0.10)', padding: '64px 0 44px' }}
    >
      <div className="wrap">
        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '48px',
          flexWrap: 'wrap',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(245,243,238,0.08)',
        }}>
          {/* Brand */}
          <div style={{ maxWidth: '300px' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              marginBottom: '18px',
            }}>
              <BrainMark />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '21px',
                color: 'var(--parchment)',
                letterSpacing: '-0.01em',
              }}>
                <span style={{ color: 'var(--green)' }}>Neuro</span> Daily
              </span>
            </Link>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(245,243,238,0.50)',
            }}>
              Sains otak dan psikologi, ditulis dalam bahasa manusia biasa.
              Dari Indonesia.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--amber)',
                  marginBottom: '16px',
                  fontWeight: 400,
                }}>
                  {section}
                </h4>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '14px',
                      color: 'rgba(245,243,238,0.65)',
                      textDecoration: 'none',
                      marginBottom: '10px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#5EC9A7')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.65)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '28px',
          flexWrap: 'wrap',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'rgba(245,243,238,0.35)',
        }}>
          <span>© {new Date().getFullYear()} Neuro Daily · neurodaily.id</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            @neurodaily.id
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none"
              stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 19c0-7 4-11 11-11 5 0 8 3 8 7 0 3-2 5-5 5-3 0-4 1.4-4 3.5 0 2 1.4 3.5 3.5 3.5" />
              <circle cx="20" cy="12" r="1.4" fill="#C9A96E" stroke="none" />
            </svg>
          </span>
        </div>
      </div>
    </footer>
  )
}
