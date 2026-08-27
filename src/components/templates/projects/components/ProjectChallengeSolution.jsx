// @/components/templates/project/components/ProjectChallengeSolution/ProjectChallengeSolution.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const CHALLENGE_SOLUTION_TRANSLATIONS = {
  en: {
    challengeLabel: 'The Challenge',
    solutionLabel: 'The Solution',
  },
  fa: {
    challengeLabel: 'چالش پروژه',
    solutionLabel: 'راه‌حل',
  },
}

const InfoCard = ({ icon, label, text }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-1 flex-col gap-4 rounded-2xl border-primary bg-neutral-200/40 p-6 backdrop-blur-md dark:bg-neutral-900/40"
  >
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200/70 text-sm dark:bg-neutral-800/70">
        {icon}
      </span>
      <h3 className="text-[15px] font-medium md:text-base">{label}</h3>
    </div>

    <p className="text-sm leading-7 text-secondary md:text-[15px]">{text}</p>
  </motion.div>
)

const ProjectChallengeSolution = ({ challenge, solution }) => {
  const { language } = useLanguage()
  const t = CHALLENGE_SOLUTION_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto flex w-full flex-col gap-4 text-start md:flex-row md:gap-5"
    >
      <InfoCard icon="?" label={t.challengeLabel} text={challenge} />
      <InfoCard icon="✓" label={t.solutionLabel} text={solution} />
    </motion.section>
  )
}

export default ProjectChallengeSolution