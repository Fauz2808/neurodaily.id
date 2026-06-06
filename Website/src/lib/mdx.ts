import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/artikel')

export interface ArticleFrontmatter {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  coverImage?: string
  featured?: boolean
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(contentDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
    }
  })

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  }
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.category === category)
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.featured)
}
