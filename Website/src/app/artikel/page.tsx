import { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/mdx'
import { categories } from '@/lib/categories'
import ArticleCard from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Semua Artikel',
  description: 'Jelajahi semua artikel Neuro Daily tentang neurosains, psikologi, fokus, tidur, dan kebiasaan.',
}

export default function ArtikelPage() {
  const all = getAllArticles()

  return (
    <div className="bg-dark" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <section className="bg-dark" style={{ paddingTop: '110px', paddingBottom: '60px', borderBottom: '1px solid rgba(245,243,238,0.10)' }}>
        <div className="wrap">
          <span className="eyebrow"><span>◇</span> Perpustakaan</span>
          <div className="rule" />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 6vw, 80px)',
            lineHeight: 1.02,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginTop: '24px',
            color: 'var(--parchment)',
          }}>
            Semua Artikel
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '17px',
            color: 'rgba(245,243,238,0.55)',
            marginTop: '14px',
          }}>
            {all.length} artikel tentang neurosains, psikologi, dan kehidupan sehari-hari.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div style={{
        position: 'sticky',
        top: '64px',
        zIndex: 40,
        background: 'rgba(13,46,40,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,243,238,0.08)',
        padding: '14px 0',
      }}>
        <div className="wrap" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/artikel" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--parchment)',
            textDecoration: 'none',
            padding: '7px 16px',
            borderRadius: '99px',
            border: '1px solid rgba(245,243,238,0.35)',
          }}>
            Semua
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(245,243,238,0.60)',
                textDecoration: 'none',
                padding: '7px 16px',
                borderRadius: '99px',
                border: '1px solid rgba(245,243,238,0.14)',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.icon} {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <section style={{ padding: '64px 0 100px' }}>
        <div className="wrap">
          {all.length === 0 ? (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: 'rgba(245,243,238,0.25)',
              textAlign: 'center',
              padding: '80px 0',
            }}>
              Segera hadir.
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}>
              {all.map(article => (
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
