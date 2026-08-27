// @/components/templates/project/components/ProjectMeta/ProjectMeta.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const META_TRANSLATIONS = {
  en: {
    role: 'Role',
    type: 'Type',
    status: 'Status',
    duration: 'Duration',
    techStack: 'Tech Stack',
  },
  fa: {
    role: 'نقش',
    type: 'نوع پروژه',
    status: 'وضعیت',
    duration: 'مدت زمان',
    techStack: 'تکنولوژی‌ها',
  },
}

const MetaRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-neutral-200/60 py-3 last:border-0 dark:border-neutral-800/60">
    <span className="text-sm text-secondary">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
)

const ProjectMeta = ({ role, type, status, duration, techStack = [] }) => {
  const { language } = useLanguage()
  const t = META_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2"
    >
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border-primary bg-neutral-200/40 p-5 backdrop-blur-md dark:bg-neutral-900/40"
      >
        <MetaRow label={t.role} value={role} />
        <MetaRow label={t.type} value={type} />
        <MetaRow label={t.status} value={status} />
        <MetaRow label={t.duration} value={duration} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border-primary bg-neutral-200/40 p-5 backdrop-blur-md dark:bg-neutral-900/40"
      >
        <span className="mb-3 block text-sm text-secondary">{t.techStack}</span>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-neutral-200/60 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectMeta