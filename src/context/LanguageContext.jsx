import React, { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'site-language'
const DEFAULT_LANGUAGE = 'en'

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE
  })

  useEffect(() => {
    const dir = language === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', language)
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fa' : 'en'))
  }

  const value = {
    language,
    dir: language === 'fa' ? 'rtl' : 'ltr',
    isRTL: language === 'fa',
    toggleLanguage,
    setLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage باید داخل LanguageProvider استفاده بشه')
  }
  return ctx
}