// @/components/templates/project/components/ProjectFeatures/ProjectFeatures.jsx
import { useRef } from 'react'
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

const FeatureCard = ({ index, title, description }) => {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      variants={itemVariants}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-4xl bg-neutral-100 p-5 transition-colors duration-300 dark:bg-neutral-800/80 md:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [--spot:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spot:rgba(255,255,255,0.08)]"
        style={{
          background:
            'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <span className="text-sm font-medium tabular-nums text-neutral-400 dark:text-neutral-500 md:text-base">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium md:text-lg">{title}</h3>

          {description && (
            <p className="text-sm leading-6 text-secondary">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

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
        className="text-[22px] font-medium tracking-tight md:text-[28px] text-center"
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