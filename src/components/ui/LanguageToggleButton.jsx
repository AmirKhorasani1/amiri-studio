import React from 'react'
import { useLanguage } from '@context/LanguageContext'

const LanguageToggleButton = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      aria-label="تغییر زبان"
      className={`
        flex items-center justify-center rounded-full
        border border-neutral-800 bg-neutral-900
        px-3.5 py-2 text-[13px] font-semibold text-white
        duration-200 hover:bg-neutral-800 active:scale-95
        ${className}
      `}
    >
      {language === 'en' ? 'fa' : 'EN'}
    </button>
  )
}

export default LanguageToggleButton