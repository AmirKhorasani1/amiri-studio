// @/components/templates/project/components/ProjectArchitecture/ProjectArchitecture.jsx
import { useRef } from 'react'
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
  <div className="flex flex-col items-start gap-2">
    <span className="whitespace-nowrap rounded-full bg-neutral-200/60 px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 md:text-sm">
      {label}
    </span>

    {!isLast && (
      <span className="pl-4 text-neutral-400 dark:text-neutral-500" aria-hidden="true">
        ↓
      </span>
    )}
  </div>
)

// هر تصمیم یک پنل با نوار تاکید کنار خودش و نور اسپات‌لایت روی هاور
const DecisionPanel = ({ title, text }) => {
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
      className="group relative flex gap-4 overflow-hidden rounded-3xl p-4"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [--spot:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spot:rgba(255,255,255,0.08)]"
        style={{
          background:
            'radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 70%)',
        }}
      />

      <span className="relative z-10 mt-1 w-0.5 shrink-0 self-stretch rounded-full bg-neutral-300 dark:bg-neutral-600" />

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-[15px] font-medium md:text-base">{title}</h3>
        <p className="text-sm leading-6 text-secondary md:text-[15px]">{text}</p>
      </div>
    </div>
  )
}

// باکس فلو هم حالا نور اسپات‌لایت خودش رو داره
const FlowBox = ({ flow }) => {
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
      className="group relative flex w-full shrink-0 flex-col items-start gap-2 overflow-hidden rounded-4xl bg-neutral-100 p-5 dark:bg-neutral-800/80 md:w-56 md:p-7 lg:w-64"
      dir="ltr"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [--spot:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spot:rgba(255,255,255,0.08)]"
        style={{
          background:
            'radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-start gap-2">
        {flow.map((step, index) => (
          <FlowStep key={step} label={step} isLast={index === flow.length - 1} />
        ))}
      </div>
    </motion.div>
  )
}

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
        className="text-[22px] font-medium tracking-tight md:text-[28px] text-center"
        style={{ fontWeight: isPersian ? 600 : 500 }}
      >
        {t.heading}
      </motion.h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <FlowBox flow={flow} />

        {decisions.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex w-full flex-1 flex-col gap-2 rounded-4xl bg-neutral-100 p-5 dark:bg-neutral-800/80 md:p-7"
          >
            {decisions.map((decision) => (
              <DecisionPanel key={decision.title} title={decision.title} text={decision.text} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default ProjectArchitecture