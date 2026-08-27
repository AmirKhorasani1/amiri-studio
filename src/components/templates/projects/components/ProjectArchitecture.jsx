// @/components/templates/project/components/ProjectArchitecture/ProjectArchitecture.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const ARCHITECTURE_TRANSLATIONS = {
  en: {
    heading: 'Architecture & Decisions',
  },
  fa: {
    heading: 'معماری و تصمیمات فنی',
  },
}

const FlowStep = ({ label, isLast }) => (
  <div className="flex items-center gap-2 md:gap-3">
    <span className="whitespace-nowrap rounded-full border-primary bg-neutral-200/60 px-3.5 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-md dark:bg-neutral-900/60 dark:text-neutral-200 md:text-sm">
      {label}
    </span>

    {!isLast && (
      <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">
        →
      </span>
    )}
  </div>
)

const ProjectArchitecture = ({ flow = [], decisions = [] }) => {
  const { language } = useLanguage()
  const t = ARCHITECTURE_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto flex w-full flex-col gap-6 text-start"
    >
      <motion.h2
        variants={itemVariants}
        className="text-[22px] font-medium tracking-tight md:text-[28px]"
        style={{ fontWeight: isPersian ? 600 : 500 }}
      >
        {t.heading}
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-y-3 rounded-2xl border-primary bg-neutral-200/40 p-5 backdrop-blur-md dark:bg-neutral-900/40 md:p-6"
        dir="ltr"
      >
        {flow.map((step, index) => (
          <FlowStep key={step} label={step} isLast={index === flow.length - 1} />
        ))}
      </motion.div>

      {decisions.length > 0 && (
        <div className="flex flex-col gap-4">
          {decisions.map((decision) => (
            <motion.div key={decision.title} variants={itemVariants} className="flex flex-col gap-1.5">
              <h3 className="text-[15px] font-medium md:text-base">{decision.title}</h3>
              <p className="text-sm leading-6 text-secondary md:text-[15px]">{decision.text}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default ProjectArchitecture