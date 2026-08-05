import React from 'react'
import SectionTitle from '@ui/SectionTitle'
import SkillsList from './SkillsList'
import SkillsIconsBox from './SkillsIconsBox'
import { useLanguage } from '@context/LanguageContext'

const translations = {
  en: {
    title: 'Crafting Modern Interfaces',
    description:
      'Building fast, scalable, and interactive web experiences with modern frontend technologies.',
  },

  fa: {
    title: 'طراحی رابط‌های کاربری مدرن',
    description:
      'توسعه تجربه‌های وب سریع، مقیاس‌پذیر و تعاملی با استفاده از فناوری‌های مدرن فرانت‌اند.',
  },
}

const SkillsSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container mt-35 flex flex-col gap-4 md:gap-5">
      <SectionTitle
        title={t.title}
        description={t.description}
      />

      <div className="flex w-full flex-col-reverse items-start gap-0 md:flex-row md:gap-10">
        <div className="w-full md:w-1/2">
          <SkillsList />
        </div>

        <SkillsIconsBox />
      </div>
    </div>
  )
}

export default SkillsSection