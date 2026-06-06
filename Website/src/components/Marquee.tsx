'use client'

const TOPICS = [
  'Fokus', 'Tidur', 'Kebiasaan', 'Emosi', 'Otak',
  'Neurosains', 'Psikologi', 'Memori', 'Atensi', 'Dopamin',
]

function Track() {
  return (
    <>
      {TOPICS.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            color: 'var(--amber)',
            padding: '0 6px',
          }}>
            {t}
          </span>
          <span style={{ color: 'rgba(245,243,238,0.35)', padding: '0 4px' }}>·</span>
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <div
      className="bg-teal"
      style={{
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderTop: '1px solid rgba(245,243,238,0.12)',
        borderBottom: '1px solid rgba(245,243,238,0.12)',
      }}
      aria-hidden="true"
    >
      <div style={{
        display: 'inline-flex',
        animation: 'marquee-scroll 30s linear infinite',
        willChange: 'transform',
      }}>
        <Track />
        <Track />
      </div>
    </div>
  )
}
