import React from 'react'
import SectionTitle from '@ui/SectionTitle'
import StickyViewAllLink from '@ui/StickyViewAllLink'
import DevNotesCard from '@tools/DevNotes/DevNotesCard'
import StillTimeCard from '@tools/StillTime/StillTimeCard'
import SnippetVaultCard from '@tools//SnippetVault/SnippetVaultCard'
import AnimationLab from '@tools/AnimationLab/AnimationLab'
import { useLanguage } from '@context/LanguageContext'
import { Link } from 'react-router-dom'

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

const ToolsSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="relative flex flex-col gap-10 container">
      <SectionTitle
        title={t.title}
        description={t.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 *:cursor-pointer">
          <DevNotesCard />
          <Link to="/tools/still-time">
            <StillTimeCard/>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 *:cursor-pointer">
          <AnimationLab />
          <Link to="/tools/snippet-vault">
            <SnippetVaultCard />
          </Link>
        </div>
      </div>

      <StickyViewAllLink to="/tools" label={t.viewAll} />
    </div>
  )
}

export default ToolsSection