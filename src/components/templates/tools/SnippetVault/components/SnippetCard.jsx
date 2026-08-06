'use client'

import { Star } from 'lucide-react'
import { LANGUAGE_META } from '../data/snippets'
import { CodePanel } from './CodePanel'

const LANGUAGE_BADGE_STYLES = {
  react: 'bg-cyan-300/15 text-cyan-300 backdrop-blur-xs',
  nextjs: 'bg-neutral-900 text-neutral-200',
  tailwind: 'bg-sky-900 text-sky-300',
}

export function SnippetCard({ snippet, onToggleFavorite }) {
  const meta = LANGUAGE_META[snippet.language]
  const badgeStyle = LANGUAGE_BADGE_STYLES[snippet.language] || ''

  return (
    <div dir='ltr' className="flex flex-col gap-3 rounded-lg border-primary relative">
      <div className="absolute bottom-2 left-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/15 backdrop-blur-xs px-2.5 py-1 text-xs text-neutral-300">
            {snippet.category}
          </span>
        </div>
      </div>

      <CodePanel
        code={snippet.code}
        language={meta.prismLanguage}
        fileLabel={meta.fileLabel}
        snippet={snippet}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  )
}