// @/components/templates/project/components/ProjectMeta/ProjectMeta.jsx
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const META_TRANSLATIONS = {
  en: {
    role: 'Role',
    type: 'Type',
    status: 'Status',
    duration: 'Duration',
    techStack: 'Stack',
  },
  fa: {
    role: 'نقش',
    type: 'نوع پروژه',
    status: 'وضعیت',
    duration: 'مدت زمان',
    techStack: 'استک فنی',
  },
}

const MetaRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-neutral-200/60 py-3 last:border-0 dark:border-neutral-700">
    <span className="text-sm text-secondary">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
)

const StackRow = ({ category, items }) => (
  <div className="flex items-start justify-between gap-4 border-b border-neutral-200/60 py-3 last:border-0 dark:border-neutral-700">
    <span className="shrink-0 pt-1.5 text-sm text-secondary">{category}</span>

    <div className="flex max-w-[72%] flex-wrap justify-end gap-1.5">
      {items.map((tech) => (
        <span
          key={tech}
          className="rounded-full bg-neutral-200/60 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700/60 dark:text-neutral-200"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
)

const SpotlightCard = ({ children, className = '' }) => {
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
      className={`group relative flex h-full flex-col overflow-hidden rounded-4xl bg-neutral-100 dark:bg-neutral-800/80 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [--spot:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spot:rgba(255,255,255,0.08)]"
        style={{
          background:
            'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-5 md:p-7">{children}</div>
    </div>
  )
}

const ProjectMeta = ({ role, type, status, duration, techStack = [] }) => {
  const { language } = useLanguage()
  const t = META_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  const stackGroups =
    techStack.length && typeof techStack[0] === 'object'
      ? techStack
      : [{ category: t.techStack, items: techStack }]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2"
    >
      <motion.div variants={itemVariants}>
        <SpotlightCard>
          <MetaRow label={t.role} value={role} />
          <MetaRow label={t.type} value={type} />
          <MetaRow label={t.status} value={status} />
          <MetaRow label={t.duration} value={duration} />
        </SpotlightCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SpotlightCard>
          <div className="flex h-full flex-col justify-center">
            {stackGroups.map((group) => (
              <StackRow key={group.category} category={group.category} items={group.items} />
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  )
}

export default ProjectMeta