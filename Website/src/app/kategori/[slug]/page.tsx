import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticlesByCategory } from '@/lib/mdx'
import { categories, getCategoryBySlug } from '@/lib/categories'
import ArticleCard from '@/components/ArticleCard'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) return {}
  return { title: `${cat.label} — Topik`, description: cat.description }
}

const CAT_COLORS: Record<string, string> = {
  fokus:     '#C9A96E',
  tidur:     '#5EC9A7',
  kebiasaan: '#5EC9A7',
  emosi:     '#D96A6A',
  otak:      '#1A6B5A',
}

export default function KategoriPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) notFound()

  const articles = getArticlesByCategory(params.slug)
  const catColor = CAT_COLORS[params.slug] ?? '#5EC9A7'

  return (
    <div className="bg-dark" style={{ minHeight: '100vh' }}>
      {/* Header — dark */}
      <section className="bg-dark" style={{ paddingTop: '110px', paddingBottom: '64px', borderBottom: '1px solid rgba(245,243,238,0.10)' }}>
        <div className="wrap">
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', gap: '10px', alignItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.35)', marginBottom: '40px',
          }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Beranda</Link>
            <span>/</span>
            <Link href="/artikel" style={{ color: 'inherit', textDecoration: 'none' }}>Artikel</Link>
            <span>/</span>
            <span style={{ color: catColor }}>{cat.label}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px' }}>
            <span style={{ fontSize: '56px', color: 'var(--green)', lineHeight: 1, marginTop: '4px' }}>
              {cat.icon}
            </span>
            <div>
              <span className="eyebrow" style={{ color: catColor }}>
                <span>○</span> Topik
              </span>
              <div className="rule" style={{ background: catColor }} />
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 6vw, 80px)',
                lineHeight: 1.02,
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--parchment)',
                marginTop: '20px',
              }}>
                {cat.label}
              </h1>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '16px',
                color: 'rgba(245,243,238,0.55)',
                marginTop: '12px',
                maxWidth: '50ch',
              }}>
                {cat.description}
              </p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(245,243,238,0.30)',
                display: 'block',
                marginTop: '16px',
              }}>
                {articles.length} artikel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div style={{
        position: 'sticky', top: '64px', zIndex: 40,
        background: 'rgba(13,46,40,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,243,238,0.08)', padding: '14px 0',
      }}>
        <div className="wrap" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '7px 16px',
                borderRadius: '99px',
                transition: 'all 0.2s ease',
                ...(c.slug === params.slug
                  ? { background: catColor, color: 'var(--forest)', border: `1px solid ${catColor}` }
                  : { color: 'rgba(245,243,238,0.55)', border: '1px solid rgba(245,243,238,0.14)' }
                ),
              }}
            >
              {c.icon} {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <section style={{ padding: '64px 0 100px' }}>
        <div className="wrap">
          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: 'rgba(245,243,238,0.20)',
              }}>
                Segera hadir.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '15px',
                color: 'rgba(245,243,238,0.35)',
                marginTop: '12px',
              }}>
                Artikel tentang {cat.label} sedang dalam persiapan.
              </p>
              <Link href="/artikel" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--green)',
                textDecoration: 'none',
                marginTop: '24px',
                display: 'inline-block',
              }}>
                ← Lihat semua artikel
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}>
              {articles.map(article => (
                <ArticleCard
                  key={article.slug}
                  slug={article.slug}
                  frontmatter={article.frontmatter}
                  dark
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
