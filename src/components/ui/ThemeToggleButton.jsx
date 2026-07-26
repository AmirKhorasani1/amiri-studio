import React from 'react'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const OPTIONS = [
  { key: 'system', icon: FiMonitor, label: 'سیستم' },
  { key: 'light', icon: FiSun, label: 'روشن' },
  { key: 'dark', icon: FiMoon, label: 'تاریک' },
]

const ThemeToggleButton = ({ className = '' }) => {
  const { themeMode, setThemeMode } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="انتخاب حالت نمایش"
      className={`flex items-center gap-0.5 rounded-full bg-secondary border-primary p-1 ${className}`}
    >
      {OPTIONS.map(({ key, icon: Icon, label }) => {
        const isActive = themeMode === key

        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            onClick={() => setThemeMode(key)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full"
          >
            {isActive && (
              <motion.span
                layoutId="theme-toggle-active"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-800"
              />
            )}
            <Icon
              size={18}
              className={`relative z-10 transition-colors duration-200 ${
                isActive
                  ? 'text-black dark:text-white'
                  : 'text-neutral-400 dark:text-neutral-500'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggleButton