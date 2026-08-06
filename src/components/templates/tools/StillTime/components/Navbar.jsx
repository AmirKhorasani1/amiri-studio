import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

const TABS = [
  { path: 'clock', labelKey: 'clock' },
  { path: 'timer', labelKey: 'timer' },
  { path: 'stopwatch', labelKey: 'stopwatch' },
]

const translations = {
  en: {
    clock: 'Clock',
    timer: 'Timer',
    stopwatch: 'Stopwatch',
  },
  fa: {
    clock: 'ساعت',
    timer: 'تایمر',
    stopwatch: 'کرنومتر',
  },
}

const ACTIVE_PILL_ID = 'still-time-navbar-active-pill'

const Navbar = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const { pathname } = useLocation()

  return (
    <nav
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className="fixed inset-x-0 top-0 z-50 flex w-full items-center justify-center p-4"
    >
      <ul
        role="tablist"
        className="grid h-15 w-full max-w-lg grid-cols-3 gap-1 rounded-full border-primary bg-neutral-950 p-1.5"
      >
        {TABS.map(({ path, labelKey }) => {
          const isActive = pathname.endsWith(`/${path}`)

          return (
            <li key={path} role="presentation" className="relative h-full">
              {isActive && (
                <motion.div
                  layoutId={ACTIVE_PILL_ID}
                  className="absolute inset-0 rounded-full bg-neutral-200"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <NavLink
                to={path}
                role="tab"
                aria-current={isActive ? 'page' : undefined}
                className={`relative z-10 flex h-full items-center justify-center rounded-full text-sm md:text-[15.5px] transition-colors ${
                  isActive ? 'text-black font-semibold' : 'text-neutral-400 hover:text-white font-medium'
                }`}
              >
                {t[labelKey]}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar