'use client'

import { useEffect, useRef, useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Check, Copy } from 'lucide-react'
import { Star } from 'lucide-react'

export function CodePanel({ code, language, snippet, onToggleFavorite }) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const copyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API is unavailable.')
      }

      await navigator.clipboard.writeText(code)

      setCopied(true)
      setCopyFailed(false)

      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }

      copyTimerRef.current = setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      setCopied(false)
      setCopyFailed(true)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg bg-[#070707]">
      <div className="flex items-center justify-between border-b-primary bg-primary py-2.5 px-3.5">
        <div>
          <h3 className="text-sm md:text-[15px] font-medium text-white">{snippet.title}</h3>
          <p className="mt-1 text-xs text-neutral-400">{snippet.shortDescription}</p>
        </div>
        <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => onToggleFavorite(snippet.id)}
          aria-pressed={snippet.isFavorite}
          aria-label={
            snippet.isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
          className="flex items-center rounded-md p-2 text-xs text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
        >
          <Star
            size={18}
            className={
              snippet.isFavorite ? 'fill-amber-400 text-amber-400' : ''
            }
          />
        </button>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code'}
          className="flex items-center rounded-md p-2 text-xs text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
        >
          {copied ? (
            <>
              <Check size={18} />
            </>
          ) : (
            <>
              <Copy size={18} />
            </>
          )}
        </button>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? 'Code copied to clipboard.' : ''}
        {copyFailed ? 'Could not copy code to clipboard.' : ''}
      </span>

      <Highlight code={code.trim()} language={language} theme={themes.oneDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            className="h-60 overflow-auto px-4 py-3 text-[13px] leading-relaxed hide-scrollbar !bg-transparent"
          >
            {tokens.map((line, index) => (
              <div key={index} {...getLineProps({ line })}>
                <span className="mr-4 inline-block w-2 select-none text-right text-neutral-800">
                  {index + 1}
                </span>

                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}