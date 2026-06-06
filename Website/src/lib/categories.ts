export interface Category {
  slug: string
  label: string
  labelEn: string
  description: string
  color: string
  bgColor: string
  textColor: string
  icon: string
}

export const categories: Category[] = [
  {
    slug: 'fokus',
    label: 'Fokus',
    labelEn: 'Focus',
    description: 'Cara kerja atensi, deep work, dan mengatasi distraksi di era digital.',
    color: '#D4870F',
    bgColor: '#FEF3E2',
    textColor: '#8B5500',
    icon: '◎',
  },
  {
    slug: 'tidur',
    label: 'Tidur',
    labelEn: 'Sleep',
    description: 'Ilmu di balik tidur berkualitas dan dampaknya terhadap otak dan tubuh.',
    color: '#2D6A6A',
    bgColor: '#E6F4F4',
    textColor: '#1A4040',
    icon: '◐',
  },
  {
    slug: 'kebiasaan',
    label: 'Kebiasaan',
    labelEn: 'Habits',
    description: 'Neurosains pembentukan kebiasaan, habit loops, dan perubahan perilaku.',
    color: '#4A7C59',
    bgColor: '#EBF4EF',
    textColor: '#2A4A35',
    icon: '↺',
  },
  {
    slug: 'emosi',
    label: 'Emosi',
    labelEn: 'Emotions',
    description: 'Regulasi emosi, kesehatan mental, dan bagaimana otak memproses perasaan.',
    color: '#8B3A3A',
    bgColor: '#F7EDED',
    textColor: '#5C1F1F',
    icon: '♡',
  },
  {
    slug: 'otak',
    label: 'Otak',
    labelEn: 'Brain',
    description: 'Neuroplastisitas, memori, kognisi, dan cara otak belajar hal baru.',
    color: '#1C3B2F',
    bgColor: '#E6EDE9',
    textColor: '#0F1F18',
    icon: '◈',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
