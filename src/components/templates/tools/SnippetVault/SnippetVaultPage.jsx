import { useMemo, useState } from 'react'
import { useLanguage } from '@context/LanguageContext'
import { snippets as initialSnippets } from './data/snippets'
import { SnippetCard } from './components/SnippetCard'
import { FilterBar } from './components/FilterBar'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const translations = {
  en: {
    title: 'Snippet Vault',
    description: 'Discover reusable snippets and copy production-ready code.',
    breadcrumbHome: 'Home',
    breadcrumbTools: 'Tools',
    breadcrumbCurrent: 'SnippetVault',
    emptyTitle: 'No snippets match these filters',
    emptyDescription: 'Try a different language, category, or search term.',
  },
  fa: {
    title: 'کدهای آماده',
    description: 'قطعه‌کدهای آماده را پیدا کنید و کدهای production-ready را کپی کنید.',
    breadcrumbHome: 'خانه',
    breadcrumbTools: 'ابزارها',
    breadcrumbCurrent: 'کدهای آماده',
    emptyTitle: 'هیچ اسنیپتی با این فیلترها مطابقت ندارد',
    emptyDescription: 'زبان، دسته‌بندی یا عبارت جستجوی دیگری را امتحان کنید.',
  },
}

export default function SnippetVaultPage() {
  // Renamed to avoid clashing with the "language" state used for the
  // snippet-language filter below (React / Next.js / TypeScript).
  const { language: uiLanguage } = useLanguage()
  const t = translations[uiLanguage]
  const dir = uiLanguage === 'fa' ? 'rtl' : 'ltr'

  const [snippets, setSnippets] = useState(() => initialSnippets)
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('all')
  const [category, setCategory] = useState('all')
  const [favorites, setFavorites] = useState('all')

  const toggleFavorite = (id) => {
    setSnippets((currentSnippets) =>
      currentSnippets.map((snippet) =>
        snippet.id === id
          ? { ...snippet, isFavorite: !snippet.isFavorite }
          : snippet,
      ),
    )
  }

  const filteredSnippets = useMemo(() => {
    const query = search.trim().toLowerCase()

    return snippets.filter((snippet) => {
      if (language !== 'all' && snippet.language !== language) return false
      if (category !== 'all' && snippet.category !== category) return false
      if (favorites === 'favorites' && !snippet.isFavorite) return false

      if (query) {
        const haystack =
          `${snippet.title} ${snippet.shortDescription} ${snippet.category}`.toLowerCase()

        if (!haystack.includes(query)) return false
      }

      return true
    })
  }, [snippets, search, language, category, favorites])

  return (
    <div dir={dir} className="flex min-h-screen flex-col gap-6 container">
      <div>
        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: '/' },
            { label: t.breadcrumbTools, to: '/tools' },
            { label: t.breadcrumbCurrent },
          ]}
        />

        <h1 className="text-[20px] font-medium text-white md:text-[25px] tracking-tighter">
          {t.title}
        </h1>

        <p className="mt-0.5 text-[14px] leading-[1.45] text-[#adadad] max-w-lg md:text-[16px]">
          {t.description}
        </p>
      </div>

      <FilterBar
        snippetsLength={snippets.length}
        filteredSnippetsLength={filteredSnippets.length}
        language={language}
        onLanguageChange={setLanguage}
        category={category}
        onCategoryChange={setCategory}
        favorites={favorites}
        onFavoritesChange={setFavorites}
        search={search}
        onSearchChange={setSearch}
      />

      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-2">
          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 py-20 text-center">
          <p className="font-medium text-white">{t.emptyTitle}</p>
          <p className="text-sm text-neutral-500">{t.emptyDescription}</p>
        </div>
      )}
    </div>
  )
}