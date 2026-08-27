import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const TECH_STACK_TRANSLATIONS = {
  en: { heading: 'Tech Stack' },
  fa: { heading: 'تکنولوژی‌های استفاده‌شده' },
}

const ProjectTechStack = ({ techStack = [] }) => {
  const { language } = useLanguage()
  const t = TECH_STACK_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto flex w-full flex-col gap-4 rounded-2xl border-primary bg-neutral-200/40 p-5 text-start backdrop-blur-md dark:bg-neutral-900/40 md:p-6"
    >
      <motion.h3 variants={itemVariants} className="text-sm text-secondary">
        {t.heading}
      </motion.h3>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-neutral-200/60 px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-200"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProjectTechStack