'use client'

import { Search } from 'lucide-react'
import { useLanguage } from '@context/LanguageContext'

const translations = {
  en: {
    ariaLabel: 'Search snippets',
    placeholder: 'Search title, description ...',
  },
  fa: {
    ariaLabel: 'جستجوی اسنیپت‌ها',
    placeholder: 'جستجو در عنوان، توضیحات ...',
  },
}

export function SearchBar({ value, onChange }) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="relative w-full sm:w-60">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-200 rtl:left-auto rtl:right-3"
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t.ariaLabel}
        autoComplete="off"
        placeholder={t.placeholder}
        className="w-full rounded-lg bg-neutral-950 border-primary py-2 pl-9 pr-3 text-sm text-neutral-200 outline-none transition-colors placeholder:text-white focus:border-white/25 rtl:pl-3 rtl:pr-9"
      />
    </div>
  )
}