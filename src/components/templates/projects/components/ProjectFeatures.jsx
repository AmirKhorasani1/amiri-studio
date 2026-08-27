// @/components/templates/project/components/ProjectFeatures/ProjectFeatures.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const FEATURES_TRANSLATIONS = {
  en: {
    heading: 'Key Features',
  },
  fa: {
    heading: 'ویژگی‌های کلیدی',
  },
}

const FeatureCard = ({ index, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col gap-3 rounded-2xl border-primary bg-neutral-200/40 p-5 backdrop-blur-md dark:bg-neutral-900/40"
  >
    <span className="text-xs font-medium tabular-nums text-neutral-400 dark:text-neutral-500">
      {String(index + 1).padStart(2, '0')}
    </span>

    <h3 className="text-[15px] font-medium md:text-base">{title}</h3>

    {description && (
      <p className="text-sm leading-6 text-secondary">{description}</p>
    )}
  </motion.div>
)

const ProjectFeatures = ({ features = [] }) => {
  const { language } = useLanguage()
  const t = FEATURES_TRANSLATIONS[language]
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            index={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </motion.section>
  )
}

export default ProjectFeatures