import { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/lib/categories'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'Tentang',
  description: 'Neuro Daily adalah platform edukasi neurosains dan psikologi untuk kehidupan sehari-hari.',
}

const values = [
  { icon: '◇', title: 'Berbasis Riset', desc: 'Setiap konten berakar dari penelitian peer-reviewed, bukan spekulasi.' },
  { icon: '◎', title: 'Bahasa Manusia', desc: 'Ilmu yang diterjemahkan — bukan disederhanakan.' },
  { icon: '↺', title: 'Langsung Berlaku', desc: 'Selalu dihubungkan ke situasi nyata yang bisa kamu kenali hari ini.' },
]

export default function TentangPage() {
  return (
    <div className="bg-dark" style={{ minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="bg-dark" style={{
        paddingTop: '120px', paddingBottom: '80px',
        borderBottom: '1px solid rgba(245,243,238,0.10)',
        position: 'relative', overflow: 'hidden',
      }}>
        <span style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: '55vw', lineHeight: 0.8,
          color: 'rgba(94,201,167,0.04)',
          right: '-6vw', top: '-10vw',
          pointerEvents: 'none', userSelect: 'none',
        }} aria-hidden="true">?</span>

        <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>
          <span className="eyebrow"><span>○</span> Tentang Kami</span>
          <div className="rule" />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 88px)',
            lineHeight: 1.02, fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--parchment)',
            marginTop: '24px',
          }}>
            Ilmu otak<br />
            <em>untuk semua orang.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300, fontSize: '18px',
            lineHeight: 1.7, color: 'rgba(245,243,238,0.62)',
            marginTop: '28px', maxWidth: '52ch',
          }}>
            Neuro Daily lahir dari keyakinan bahwa memahami cara kerja otak
            bukan hak eksklusif akademisi. Setiap orang berhak mendapatkan
            akses ke ilmu yang bisa mengubah cara mereka berpikir, merasa,
            dan bertindak.
          </p>
        </div>
      </section>

      {/* ── Mission — light ── */}
      <section className="bg-light" style={{ padding: '88px 0 96px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <span className="eyebrow"><span>↺</span> Misi Kami</span>
              <div className="rule" />
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(30px, 3.8vw, 46px)',
                lineHeight: 1.1, fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--forest)', marginTop: '20px',
              }}>
                Menjembatani <em>sains</em> dan kehidupan.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300, fontSize: '16px',
                lineHeight: 1.72, color: 'rgba(13,46,40,0.65)',
                marginTop: '20px',
              }}>
                Terlalu sering, penelitian-penelitian penting terkubur di balik
                jurnal yang sulit diakses dan bahasa yang membingungkan.
                Neuro Daily hadir untuk mengubah itu.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300, fontSize: '16px',
                lineHeight: 1.72, color: 'rgba(13,46,40,0.65)',
                marginTop: '16px',
              }}>
                Kami membaca risetnya, lalu menuliskannya ulang — jujur,
                presisi, dan bisa kamu pakai.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                ['Kualitas di atas kuantitas', 'Lebih sedikit artikel, lebih dalam pembahasannya.'],
                ['Transparansi sumber', 'Kami selalu menyertakan referensi penelitian.'],
                ['Bahasa yang hidup', 'Sains tidak harus membosankan untuk dibaca.'],
              ].map(([title, desc]) => (
                <div key={title} style={{
                  display: 'flex', gap: '16px', padding: '20px 22px',
                  borderRadius: '12px',
                  border: '1px solid rgba(13,46,40,0.08)',
                  background: 'rgba(255,255,255,0.55)',
                  marginBottom: '8px',
                }}>
                  <span style={{ color: 'var(--amber)', marginTop: '2px' }}>✦</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--forest)', fontWeight: 400 }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '14px', color: 'rgba(13,46,40,0.55)', marginTop: '4px', lineHeight: 1.55 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values — dark ── */}
      <section className="bg-dark" style={{ padding: '88px 0 96px' }}>
        <div className="wrap">
          <span className="eyebrow"><span>≡</span> Prinsip Kami</span>
          <div className="rule" />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 3.8vw, 46px)',
            lineHeight: 1.1, fontWeight: 400, letterSpacing: '-0.02em',
            color: 'var(--parchment)', marginTop: '20px',
          }}>
            Apa yang kami <em>pegang teguh</em>.
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px', marginTop: '44px',
          }}>
            {values.map(v => (
              <div key={v.title} className="article-card dark-card" style={{ padding: '32px 28px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--green)' }}>
                  {v.icon}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '22px',
                  color: 'var(--parchment)', marginTop: '18px', fontWeight: 400,
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 300,
                  fontSize: '14px', lineHeight: 1.6,
                  color: 'rgba(245,243,238,0.55)', marginTop: '10px',
                }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics + Social — teal ── */}
      <section className="bg-teal" style={{ padding: '72px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <span className="eyebrow"><span>○</span> Topik yang Kami Bahas</span>
              <div className="rule" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}>
                {categories.map(cat => (
                  <Link key={cat.slug} href={`/kategori/${cat.slug}`} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px', letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--amber)',
                    textDecoration: 'none',
                    padding: '8px 18px',
                    borderRadius: '99px',
                    border: '1px solid rgba(201,169,110,0.35)',
                    transition: 'all 0.2s ease',
                  }}>
                    {cat.icon} {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow"><span>→</span> Temukan Kami</span>
              <div className="rule" />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                lineHeight: 1.1, fontWeight: 400, letterSpacing: '-0.02em',
                color: 'var(--parchment)', marginTop: '18px',
              }}>
                @neurodaily.id
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                {[
                  { href: 'https://instagram.com/neurodaily.id', label: 'Instagram' },
                  { href: 'https://tiktok.com/@neurodaily.id',   label: 'TikTok' },
                  { href: 'https://threads.net/@neurodaily.id',  label: 'Threads' },
                ].map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px', letterSpacing: '0.06em',
                      color: 'var(--parchment)',
                      textDecoration: 'none',
                      padding: '9px 20px', borderRadius: '99px',
                      border: '1px solid rgba(245,243,238,0.28)',
                      transition: 'all 0.2s ease',
                    }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter — dark ── */}
      <section className="bg-dark" id="newsletter" style={{ padding: '110px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <span style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: '50vw', lineHeight: 0.8,
          color: 'rgba(201,169,110,0.04)',
          right: '-4vw', bottom: '-12vw',
          pointerEvents: 'none', userSelect: 'none',
        }} aria-hidden="true">N</span>

        <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          <span className="eyebrow"><span>◆</span> Newsletter</span>
          <div className="rule" />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 5vw, 60px)',
            lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.02em',
            color: 'var(--parchment)', marginTop: '22px',
          }}>
            Mulai perjalananmu <em>bersama</em> kami.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300, fontSize: '17px',
            lineHeight: 1.65, color: 'rgba(245,243,238,0.60)',
            marginTop: '18px', maxWidth: '46ch',
          }}>
            Daftar newsletter dan dapatkan insight neurosains setiap minggu.
          </p>
          <div style={{ marginTop: '36px' }}>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  )
}
