// @/components/templates/project/components/ProjectChallengeSolution/ProjectChallengeSolution.jsx
import { useRef } from 'react'
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

// نیمه‌ی مستقل با نور دنبال‌کننده‌ی موسِ مخصوص به خودش — بدون هیچ بوردری روی هاور
const Pane = ({ label, text }) => {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-1 flex-col gap-3 overflow-hidden p-5 md:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [--spot:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spot:rgba(255,255,255,0.08)]"
        style={{
          background:
            'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="text-[15px] font-medium text-secondary md:text-base">{label}</h3>
        <p className="text-sm leading-7 md:text-[15px]">{text}</p>
      </div>
    </div>
  )
}

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
      className="mx-auto flex w-full flex-col text-start"
    >
      <motion.div
        variants={itemVariants}
        className="relative flex flex-col rounded-4xl bg-neutral-100 dark:bg-neutral-800/80 md:flex-row"
      >
        <Pane label={t.challengeLabel} text={challenge} />

        {/* جداکننده + فلش اتصال چالش به راه‌حل */}
        <div className="relative flex items-center justify-center md:w-px">
          <div className="h-px w-full bg-neutral-200/60 dark:bg-neutral-700 md:h-full md:w-px" />
          <span
            className="absolute flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm text-neutral-500 dark:bg-neutral-800 border border-neutral-600 dark:text-neutral-400 rotate-90 md:rotate-0 md:rtl:rotate-180"
            aria-hidden="true"
          >
            →
          </span>
        </div>

        <Pane label={t.solutionLabel} text={solution} />
      </motion.div>
    </motion.section>
  )
}

export default ProjectChallengeSolution