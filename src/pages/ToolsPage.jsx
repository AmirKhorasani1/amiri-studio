import React from 'react'
import SectionTitle from '@ui/SectionTitle'
import DevNotesCard from '@tools/DevNotes/DevNotesCard'
import StillTimeCard from '@tools/StillTime/StillTimeCard'
import AnimationLab from '@/components/templates/tools/AnimationLab/AnimationLabCard'
import SnippetVaultCard from '@tools/SnippetVault/SnippetVaultCard'
import TypeScaleCard from '@tools/TypeScale/TypeScaleCard'
import ColorCraftCard from '@tools/ColorCraft/ColorCraftCard'
import { useLanguage } from '@context/LanguageContext'

const translations = {
  en: {
    title: 'Custom Developer Toolkit',
    description:
      'Every tool here started as a real problem during development. I built them to remove repetitive work, improve consistency, and make building interfaces faster.',
    viewAll: 'View all tools',
  },
  fa: {
    title: 'ابزارهای اختصاصی توسعه',
    description:
      'هر کدوم از این ابزارها از یه مشکل واقعی حین توسعه شروع شدن. من اونا رو ساختم تا کارهای تکراری رو حذف کنم، یکدستی رو بهتر کنم و ساخت رابط‌کاربری رو سریع‌تر کنم.',
    viewAll: 'مشاهده همه ابزارها',
  },
}

const ToolsPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="flex flex-col gap-5 px-5 md:px-25 pt-25" dir={t.dir} lang={language}>
      <SectionTitle title={t.title} description={t.description} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="grid grid-cols-1 *:cursor-pointer">
          <DevNotesCard />
        </div>
        <div className="grid grid-cols-1 gap-5 *:cursor-pointer">
          <AnimationLab />
          <SnippetVaultCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 *:cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 *:cursor-pointer">
          <TypeScaleCard />
          <ColorCraftCard />
        </div>
        <div className="border border-neutral-800 rounded-lg">
        </div>
      </div>
    </div>
  )
}

export default ToolsPage