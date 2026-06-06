import Link from 'next/link'
import { getAllArticles, getFeaturedArticles } from '@/lib/mdx'
import { categories } from '@/lib/categories'
import ArticleCard from '@/components/ArticleCard'
import NewsletterForm from '@/components/NewsletterForm'
import Marquee from '@/components/Marquee'
import ScrollReveal from '@/components/ScrollReveal'

export default function HomePage() {
  const allArticles  = getAllArticles()
  const featured     = getFeaturedArticles()
  const displayFeatured = featured.length > 0 ? featured : allArticles.slice(0, 3)
  const recent       = allArticles.slice(0, 6)

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="bg-dark"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          paddingTop: '90px',
        }}
      >
        {/* Ghost character */}
        <span
          className="ghost-char"
          style={{
            fontSize: 'clamp(320px, 60vw, 720px)',
            color: 'rgba(201,169,110,0.07)',
            right: '-4vw',
            top: '50%',
            transform: 'translateY(-48%)',
          }}
          aria-hidden="true"
        >
          N
        </span>

        <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: '960px' }}>
          <ScrollReveal>
            <span className="eyebrow">
              <span>○</span> Neurosains untuk hidup nyata
            </span>
            <div className="rule" />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7.2vw, 96px)',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginTop: '28px',
              maxWidth: '16ch',
            }}>
              Pahami cara kerja <em>otakmu</em> — sebelum ia mengaturmu.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(16px, 1.4vw, 21px)',
              lineHeight: 1.65,
              color: 'rgba(245,243,238,0.68)',
              marginTop: '28px',
              maxWidth: '52ch',
            }}>
              Bukan motivasi. Bukan tips kosong. Neuro Daily menerjemahkan riset
              neurosains dan psikologi terbaru ke dalam bahasa yang bisa kamu
              pakai hari ini.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <div style={{ display: 'flex', gap: '14px', marginTop: '42px', flexWrap: 'wrap' }}>
              <Link href="/artikel" className="btn btn-primary">
                Mulai membaca
              </Link>
              <Link href="#newsletter" className="btn btn-secondary">
                Langganan gratis →
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.30}>
            <div style={{
              marginTop: '64px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(245,243,238,0.40)',
            }}>
              <span>Scroll</span>
              <span style={{ flex: 1, height: '1px', background: 'rgba(245,243,238,0.12)' }} />
              <span>{allArticles.length} Artikel · {categories.length} Topik</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── FEATURED ARTICLES ── */}
      <section className="bg-light" style={{ padding: '100px 0 110px' }} id="featured">
        <div className="wrap">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '52px', flexWrap: 'wrap' }}>
              <div>
                <span className="eyebrow"><span>◇</span> Bacaan pilihan</span>
                <div className="rule" />
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 54px)',
                  lineHeight: 1.05,
                  marginTop: '18px',
                  color: 'var(--forest)',
                }}>
                  Yang sedang <em>dibahas</em> minggu ini.
                </h2>
              </div>
              <Link href="/artikel" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(26,107,90,0.3)',
                paddingBottom: '3px',
                whiteSpace: 'nowrap',
              }}>
                Semua artikel →
              </Link>
            </div>
          </ScrollReveal>

          {displayFeatured.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
            }}>
              {displayFeatured.slice(0, 3).map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 0.08}>
                  <ArticleCard
                    slug={article.slug}
                    frontmatter={article.frontmatter}
                    variant={i === 0 ? 'featured' : 'default'}
                    showGhostNumber={i === 0}
                    number={i + 1}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgba(13,46,40,0.45)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              Artikel segera hadir.
            </p>
          )}
        </div>
      </section>

      {/* ── TOPIK ── */}
      <section
        className="bg-dark"
        style={{ padding: '100px 0 110px', position: 'relative', overflow: 'hidden' }}
        id="topik"
      >
        {/* Ghost character */}
        <span
          className="ghost-char"
          style={{
            fontSize: '40vw',
            color: 'rgba(201,169,110,0.05)',
            right: '-6vw',
            bottom: '-16vw',
            lineHeight: 0.8,
          }}
          aria-hidden="true"
        >
          ◈
        </span>

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <span className="eyebrow"><span>○</span> Jelajahi berdasarkan tema</span>
            <div className="rule" />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              lineHeight: 1.05,
              marginTop: '18px',
              color: 'var(--parchment)',
            }}>
              Lima cara otakmu <em>bekerja</em>.
            </h2>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '20px',
            marginTop: '48px',
          }}>
            {categories.map((cat, i) => {
              const col = i < 3
                ? `${i * 2 + 1} / span 2`
                : i === 3
                  ? '2 / span 2'
                  : '4 / span 2'
              return (
                <ScrollReveal key={cat.slug} delay={i * 0.07}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="article-card dark-card"
                    style={{
                      gridColumn: col,
                      display: 'block',
                      textDecoration: 'none',
                      padding: '32px 30px 28px',
                    }}
                  >
                    <span style={{ fontSize: '32px', color: 'var(--green)', display: 'block', lineHeight: 1 }}>
                      {cat.icon}
                    </span>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: 'var(--parchment)',
                      marginTop: '20px',
                      letterSpacing: '-0.02em',
                    }}>
                      {cat.label}
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.55,
                      color: 'rgba(245,243,238,0.58)',
                      marginTop: '10px',
                    }}>
                      {cat.description}
                    </p>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--amber)',
                      display: 'block',
                      marginTop: '20px',
                    }}>
                      Jelajahi →
                    </span>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-teal" style={{ padding: '72px 0' }} id="about">
        <div className="wrap">
          <ScrollReveal>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
            }}>
              <div style={{ position: 'relative', paddingLeft: '26px' }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '6px',
                  bottom: '6px',
                  width: '3px',
                  background: 'var(--amber)',
                  borderRadius: '2px',
                  display: 'block',
                }} />
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  lineHeight: 1.1,
                  color: 'var(--parchment)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                }}>
                  <em>Sains</em> yang ditulis untuk manusia, bukan untuk jurnal.
                </h2>
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '17px',
                  lineHeight: 1.7,
                  color: 'rgba(245,243,238,0.82)',
                }}>
                  Neuro Daily lahir dari satu keyakinan: pengetahuan tentang otak tidak
                  seharusnya terkunci di balik jargon akademik. Kami membaca risetnya,
                  lalu menuliskannya ulang — jujur, presisi, dan bisa kamu pakai.
                </p>
                <Link href="/tentang" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  color: 'var(--amber)',
                  textDecoration: 'none',
                  marginTop: '20px',
                  display: 'inline-flex',
                  gap: '8px',
                  borderBottom: '1px solid rgba(201,169,110,0.4)',
                  paddingBottom: '3px',
                  transition: 'gap 0.25s ease',
                }}>
                  Tentang Kami →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        className="bg-dark"
        id="newsletter"
        style={{ padding: '120px 0 130px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Ghost character */}
        <span
          className="ghost-char"
          style={{
            fontSize: '48vw',
            color: 'rgba(94,201,167,0.04)',
            left: '-4vw',
            top: '-8vw',
            lineHeight: 0.8,
          }}
          aria-hidden="true"
        >
          @
        </span>

        <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: '760px' }}>
          <ScrollReveal>
            <span className="eyebrow"><span>◆</span> Newsletter mingguan</span>
            <div className="rule" />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.2vw, 66px)',
              lineHeight: 1.05,
              marginTop: '24px',
              color: 'var(--parchment)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>
              Satu wawasan otak, <em>setiap Selasa</em> pagi.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '18px',
              lineHeight: 1.65,
              color: 'rgba(245,243,238,0.65)',
              marginTop: '22px',
              maxWidth: '50ch',
            }}>
              Riset terbaru yang sudah kami saring dan terjemahkan, langsung
              ke inbox-mu. Tanpa spam, tanpa clickbait.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ marginTop: '40px' }}>
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
