// @/components/templates/project/components/ProjectResults/ProjectResults.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const RESULTS_TRANSLATIONS = {
  en: {
    heading: 'Results & Takeaways',
  },
  fa: {
    heading: 'نتایج و دستاوردها',
  },
}

const ResultCard = ({ label, value, description }) => (
  <motion.div
    variants={itemVariants}
    className="group relative flex flex-1 flex-col gap-2 overflow-hidden rounded-4xl bg-neutral-100 p-5 text-center dark:bg-neutral-800/80 md:p-7"
  >
    {/* نوار نور مورب — موقع هاور از سمت چپ به راست باکس رد می‌شه */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[250%] group-hover:opacity-100 dark:via-white/10"
    />

    {value && (
      <span className="relative text-[26px] font-medium tabular-nums tracking-tight md:text-[32px]">
        {value}
      </span>
    )}

    <span className="relative text-sm font-medium text-neutral-600 dark:text-neutral-200">
      {label}
    </span>

    {description && (
      <p className="relative mt-1 text-xs leading-6 text-secondary md:text-sm">{description}</p>
    )}
  </motion.div>
)

const ProjectResults = ({ results = [] }) => {
  const { language } = useLanguage()
  const t = RESULTS_TRANSLATIONS[language]
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

      <div className="flex flex-col gap-4 sm:flex-row">
        {results.map((result) => (
          <ResultCard
            key={result.label}
            label={result.label}
            value={result.value}
            description={result.description}
          />
        ))}
      </div>
    </motion.section>
  )
}

export default ProjectResults