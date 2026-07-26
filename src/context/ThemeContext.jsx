import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)
const THEME_KEY = 'theme' // مقدار ذخیره‌شده: 'light' | 'dark' | 'system'

const getSystemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeModeState] = useState(getInitialMode)
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => setSystemPrefersDark(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const darkMode = themeMode === 'system' ? systemPrefersDark : themeMode === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, themeMode)
  }, [themeMode])

  const setThemeMode = useCallback((mode) => setThemeModeState(mode), [])

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme باید داخل ThemeProvider استفاده شود')
  }
  return context
}