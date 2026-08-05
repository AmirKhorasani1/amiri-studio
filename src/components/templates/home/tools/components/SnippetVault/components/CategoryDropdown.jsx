'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  LayoutGrid,
  Zap,
  Route,
  Boxes,
  Database,
  FileText,
  Activity,
  Sparkles,
  Anchor,
  Puzzle,
  Gauge,
  RefreshCw,
  Wrench,
  Shapes,
  Check,
} from 'lucide-react'
import { useLanguage } from '@context/LanguageContext'
import { CATEGORIES } from '../data/snippets'

const CATEGORY_ICONS = {
  Hooks: Zap,
  'React Router': Route,
  Components: Boxes,
  'State Management': Database,
  Forms: FileText,
  Events: Activity,
  Effects: Sparkles,
  'Rendering Patterns': LayoutGrid,
  Refs: Anchor,
  'Custom Hooks': Puzzle,
  Performance: Gauge,
  'Async Patterns': RefreshCw,
  Utilities: Wrench,
  'Common Patterns': Shapes,
}

const translations = {
  en: {
    allCategories: 'All Categories',
    categories: {
      Hooks: 'Hooks',
      'React Router': 'React Router',
      Components: 'Components',
      'State Management': 'State Management',
      Forms: 'Forms',
      Events: 'Events',
      Effects: 'Effects',
      'Rendering Patterns': 'Rendering Patterns',
      Refs: 'Refs',
      'Custom Hooks': 'Custom Hooks',
      Performance: 'Performance',
      'Async Patterns': 'Async Patterns',
      Utilities: 'Utilities',
      'Common Patterns': 'Common Patterns',
    },
  },
  fa: {
    allCategories: 'همه دسته‌ها',
    categories: {
      Hooks: 'هوک‌ها',
      'React Router': 'ری‌اکت روتر',
      Components: 'کامپوننت‌ها',
      'State Management': 'مدیریت state',
      Forms: 'فرم‌ها',
      Events: 'رویدادها',
      Effects: 'افکت‌ها',
      'Rendering Patterns': 'الگوهای رندر',
      Refs: 'رفرنس‌ها',
      'Custom Hooks': 'هوک‌های سفارشی',
      Performance: 'کارایی',
      'Async Patterns': 'الگوهای Async',
      Utilities: 'ابزارها',
      'Common Patterns': 'الگوهای رایج',
    },
  },
}

export function CategoryDropdown({ value, onChange }) {
  const { language } = useLanguage()
  const t = translations[language]

  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const ActiveIcon = value === 'all' ? LayoutGrid : (CATEGORY_ICONS[value] ?? LayoutGrid)
  const label = value === 'all' ? t.allCategories : (t.categories[value] ?? value)

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-lg px-3.5 py-2 border-primary text-sm font-medium transition-colors ${
          open || value !== 'all'
            ? 'bg-neutral-800 text-white'
            : 'bg-neutral-950 text-neutral-200 hover:text-white'
        }`}
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="text-neutral-500"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            className="absolute right-0 z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-lg border-primary bg-neutral-950 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl rtl:right-auto rtl:left-0 rtl:origin-top-left"
          >
            <button
              type="button"
              role="option"
              aria-selected={value === 'all'}
              onClick={() => {
                onChange('all')
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors rtl:text-right ${
                value === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutGrid size={15} />
              <span className="flex-1">{t.allCategories}</span>
              {value === 'all' && <Check size={14} className="text-emerald-400" />}
            </button>

            <div className="my-1.5 h-px bg-white/10" />

            <div className="h-fit overflow-y-auto pr-0.5 hide-scrollbar">
              {CATEGORIES.map((item) => {
                const Icon = CATEGORY_ICONS[item] ?? LayoutGrid
                const active = value === item

                return (
                  <button
                    key={item}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(item)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors rtl:text-right ${
                      active
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={15} />
                    <span className="flex-1">{t.categories[item] ?? item}</span>
                    {active && <Check size={14} className="text-emerald-400" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}