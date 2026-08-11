import { Link } from 'react-router-dom'

const DEFAULT_SEPARATOR = '/'
const ITEM_CLASSES = 'text-xs font-medium text-secondary'

export function Breadcrumb({ items = [], separator = DEFAULT_SEPARATOR, className = '' }) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1
          const isCurrent = isLastItem || !item.to

          return (
            <li key={item.to ?? item.label} className="flex items-center gap-2 mb-5">
              {index > 0 && (
                <span className="select-none text-secondary opacity-70" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isCurrent ? (
                <span aria-current={isCurrent ? 'page' : undefined} className={ITEM_CLASSES}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={`${ITEM_CLASSES} transition-colors hover:text-neutral-900 hover:dark:text-neutral-200`}>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}