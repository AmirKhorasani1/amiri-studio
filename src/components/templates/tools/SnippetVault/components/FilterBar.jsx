'use client'

import { Star } from 'lucide-react'
import { useLanguage } from '@context/LanguageContext'
import { LANGUAGE_META } from '../data/snippets'
import { CategoryDropdown } from './CategoryDropdown'
import { SearchBar } from './SearchBar'

const translations = {
  en: {
    all: 'All',
    favorites: 'Favorites',
    languages: {
      React: 'React',
      Next: 'Next.js',
      Typescript: 'TypeScript',
    },
  },
  fa: {
    all: 'همه',
    favorites: 'علاقه‌مندی‌ها',
    languages: {
      React: 'ری‌اکت جی‌اس',
      Next: 'نکست جی‌اس',
      Typescript: 'تایپ‌اسکریپت',
    },
  },
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-neutral-800 text-white'
          : 'text-neutral-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

export function FilterBar({
  language,
  onLanguageChange,
  category,
  onCategoryChange,
  favorites,
  onFavoritesChange,
  search,
  onSearchChange,
  snippetsLength,
  filteredSnippetsLength,
}) {
  const { language: uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  return (
    <div className="fixed top-0 right-0 left-0 z-60 flex w-full flex-col gap-4 border-b-primary bg-black py-4 md:px-25 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: language sections */}
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex flex-wrap items-center gap-2">
          <Pill active={language === 'all'} onClick={() => onLanguageChange('all')}>
            {t.all}
          </Pill>

          {Object.keys(LANGUAGE_META).map((lang) => (
            <Pill
              key={lang}
              active={language === lang}
              onClick={() => onLanguageChange(lang)}
            >
              {t.languages[lang] ?? LANGUAGE_META[lang].label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Right: search + category dropdown + favorites */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div>
          <SearchBar value={search} onChange={onSearchChange} />
        </div>

        <CategoryDropdown value={category} onChange={onCategoryChange} />

        <button
          type="button"
          onClick={() =>
            onFavoritesChange(favorites === 'favorites' ? 'all' : 'favorites')
          }
          aria-pressed={favorites === 'favorites'}
          className={`flex items-center gap-1.5 border-primary rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
            favorites === 'favorites'
              ? 'bg-neutral-200 text-black'
              : 'bg-neutral-950 text-neutral-200 hover:text-white'
          }`}
        >
          {t.favorites}
        </button>
      </div>
    </div>
  )
}

{/*
  <p className="text-sm text-neutral-500" aria-live="polite">
    {filteredSnippetsLength} of {snippetsLength} snippets
  </p>
*/}