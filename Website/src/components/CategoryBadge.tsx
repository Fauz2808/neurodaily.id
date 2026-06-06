import Link from 'next/link'
import { Category } from '@/lib/categories'

interface CategoryBadgeProps {
  category: Category
  showCount?: number
}

export default function CategoryBadge({ category, showCount }: CategoryBadgeProps) {
  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 hover:shadow-sm"
      style={{
        backgroundColor: category.bgColor,
        borderColor: `${category.color}30`,
        color: category.textColor,
      }}
    >
      <span className="text-base">{category.icon}</span>
      <span className="font-sans text-sm font-medium">{category.label}</span>
      {showCount !== undefined && (
        <span className="font-mono text-xs opacity-50">{showCount}</span>
      )}
    </Link>
  )
}
