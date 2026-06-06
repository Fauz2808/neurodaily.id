import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticleBySlug, getAllArticles } from '@/lib/mdx'
import { getCategoryBySlug } from '@/lib/categories'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return { title: article.frontmatter.title, description: article.frontmatter.excerpt }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const CAT_COLORS: Record<string, string> = {
  fokus:     '#C9A96E',
  tidur:     '#5EC9A7',
  kebiasaan: '#5EC9A7',
  emosi:     '#D96A6A',
  otak:      '#1A6B5A',
}

export default function ArtikelDetailPage({ params }: Props) {
  const article  = getArticleBySlug(params.slug)
  if (!article) notFound()

  const category = getCategoryBySlug(article.frontmatter.category)
  const catColor = CAT_COLORS[article.frontmatter.category] ?? '#5EC9A7'

  return (
    <div className="bg-dark" style={{ minHeight: '100vh' }}>
      {/* Article header — dark */}
      <section className="bg-dark" style={{ paddingTop: '110px', paddingBottom: '60px', borderBottom: '1px solid rgba(245,243,238,0.10)' }}>
        <div className="wrap" style={{ maxWidth: '860px' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.10em',
            color: 'rgba(245,243,238,0.35)',
            marginBottom: '40px',
            textTransform: 'uppercase',
          }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Beranda</Link>
            <span>/</span>
            <Link href="/artikel" style={{ color: 'inherit', textDecoration: 'none' }}>Artikel</Link>
            {category && (
              <>
                <span>/</span>
                <Link href={`/kategori/${category.slug}`} style={{ color: catColor, textDecoration: 'none' }}>
                  {category.label}
                </Link>
              </>
            )}
          </div>

          {/* Category eyebrow */}
          {category && (
            <Link href={`/kategori/${category.slug}`} style={{ textDecoration: 'none' }}>
              <span className="eyebrow" style={{ color: catColor }}>
                <span>{category.icon}</span> {category.label}
              </span>
            </Link>
          )}
          <div className="rule" style={{ background: catColor }} />

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 5vw, 60px)',
            lineHeight: 1.05,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--parchment)',
            marginTop: '24px',
          }}>
            {article.frontmatter.title}
          </h1>

          {/* Meta */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginTop: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(245,243,238,0.40)',
            letterSpacing: '0.06em',
          }}>
            <span>{formatDate(article.frontmatter.date)}</span>
            <span style={{ width: '20px', height: '1px', background: 'rgba(245,243,238,0.20)' }} />
            <span>{article.frontmatter.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body — light */}
      <section className="bg-light" style={{ padding: '72px 0 100px' }}>
        <div className="wrap" style={{ maxWidth: '720px' }}>
          {/* Excerpt */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(19px, 2vw, 24px)',
            lineHeight: 1.5,
            color: 'rgba(13,46,40,0.65)',
            fontStyle: 'italic',
            marginBottom: '48px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(13,46,40,0.10)',
          }}>
            {article.frontmatter.excerpt}
          </p>

          {/* MDX content */}
          <div className="prose-neuro">
            <MDXRemote source={article.content} />
          </div>

          {/* Article footer */}
          <div style={{
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(13,46,40,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <Link href="/artikel" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'var(--teal)',
              textDecoration: 'none',
            }}>
              ← Kembali ke Artikel
            </Link>
            {category && (
              <Link href={`/kategori/${category.slug}`} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: catColor,
                textDecoration: 'none',
                padding: '9px 20px',
                borderRadius: '99px',
                border: `1px solid ${catColor}40`,
              }}>
                Lebih banyak {category.label} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
