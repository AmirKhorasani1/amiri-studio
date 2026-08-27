// @/components/templates/project/components/ProjectOverview/ProjectOverview.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const OVERVIEW_TRANSLATIONS = {
  en: {
    heading: 'Overview',
  },
  fa: {
    heading: 'معرفی پروژه',
  },
}

const ProjectOverview = ({ paragraphs = [] }) => {
  const { language } = useLanguage()
  const t = OVERVIEW_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto flex w-full flex-col gap-5 text-start"
    >
      <motion.h2
        variants={itemVariants}
        className="text-[22px] font-medium tracking-tight md:text-[28px]"
        style={{ fontWeight: isPersian ? 600 : 500 }}
      >
        {t.heading}
      </motion.h2>

      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={itemVariants}
            className="text-[15px] leading-7 text-secondary md:text-[16.5px]"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.section>
  )
}

export default ProjectOverview