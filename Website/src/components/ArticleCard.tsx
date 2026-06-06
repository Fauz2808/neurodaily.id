import Link from 'next/link'
import { ArticleFrontmatter } from '@/lib/mdx'
import { getCategoryBySlug } from '@/lib/categories'

interface ArticleCardProps {
  slug: string
  frontmatter: ArticleFrontmatter
  variant?: 'default' | 'featured' | 'compact'
  showGhostNumber?: boolean
  number?: number
  dark?: boolean
}

const CAT_COLORS: Record<string, string> = {
  fokus:     '#C9A96E',
  tidur:     '#5EC9A7',
  kebiasaan: '#5EC9A7',
  emosi:     '#D96A6A',
  otak:      '#1A6B5A',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function ArticleCard({
  slug,
  frontmatter,
  variant = 'default',
  showGhostNumber = false,
  number = 1,
  dark = false,
}: ArticleCardProps) {
  const category  = getCategoryBySlug(frontmatter.category)
  const catColor  = CAT_COLORS[frontmatter.category] ?? '#5EC9A7'

  if (variant === 'compact') {
    return (
      <Link
        href={`/artikel/${slug}`}
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          padding: '16px 0',
          borderBottom: dark
            ? '1px solid rgba(245,243,238,0.10)'
            : '1px solid rgba(13,46,40,0.08)',
          textDecoration: 'none',
        }}
      >
        <div style={{ flex: 1 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: catColor,
            display: 'block',
          }}>
            {category?.icon} {category?.label}
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            lineHeight: 1.2,
            color: dark ? 'var(--parchment)' : 'var(--forest)',
            marginTop: '6px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}>
            {frontmatter.title}
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: dark ? 'rgba(245,243,238,0.38)' : 'rgba(13,46,40,0.38)',
            marginTop: '8px',
            display: 'block',
          }}>
            {frontmatter.readTime}
          </span>
        </div>
      </Link>
    )
  }

  // Default + featured share the same card base
  const isFeatured = variant === 'featured'

  return (
    <Link
      href={`/artikel/${slug}`}
      className={`article-card ${dark ? 'dark-card' : ''}`}
      style={{
        '--cat-color': catColor,
        textDecoration: 'none',
        minHeight: isFeatured ? '340px' : 'auto',
      } as React.CSSProperties}
    >
      {/* Ghost number on featured */}
      {showGhostNumber && (
        <span
          style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-40px',
            fontFamily: 'var(--font-display)',
            fontSize: '240px',
            lineHeight: 0.8,
            color: dark ? 'rgba(245,243,238,0.04)' : 'rgba(13,46,40,0.04)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          {String(number).padStart(2, '0')}
        </span>
      )}

      {/* Category tag */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: catColor,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
      }}>
        <span>●</span> {category?.label}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: isFeatured ? 'clamp(26px, 2.8vw, 38px)' : '26px',
        lineHeight: 1.12,
        color: dark ? 'var(--parchment)' : 'var(--forest)',
        marginTop: '16px',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        flex: isFeatured ? 'none' : undefined,
      }}>
        {frontmatter.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
        fontSize: '15px',
        lineHeight: 1.6,
        color: dark ? 'rgba(245,243,238,0.60)' : 'rgba(13,46,40,0.62)',
        marginTop: '14px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
        overflow: 'hidden',
      }}>
        {frontmatter.excerpt}
      </p>

      {/* Meta */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '24px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.06em',
        color: dark ? 'rgba(245,243,238,0.40)' : 'rgba(13,46,40,0.42)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}>
        <span>{formatDate(frontmatter.date)}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>{frontmatter.readTime}</span>
      </div>
    </Link>
  )
}
