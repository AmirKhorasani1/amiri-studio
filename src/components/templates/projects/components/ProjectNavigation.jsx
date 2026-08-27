// @/components/templates/project/components/ProjectNavigation/ProjectNavigation.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const NAVIGATION_TRANSLATIONS = {
  en: { prevLabel: 'Previous Project', nextLabel: 'Next Project' },
  fa: { prevLabel: 'پروژه قبلی', nextLabel: 'پروژه بعدی' },
}

const NavCard = ({ href, title, direction, label, isPersian }) => {
  const isPrev = direction === 'prev'
  const arrow = isPersian ? (isPrev ? '←' : '→') : isPrev ? '←' : '→'

  return (
    <motion.div variants={itemVariants} className={isPrev ? '' : 'text-end'}>
      <Link
        to={href}
        className="group flex flex-col gap-1.5 rounded-2xl border-primary bg-neutral-200/40 p-5 backdrop-blur-md transition-colors hover:bg-neutral-200/70 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/70"
      >
        <span
          className={`flex items-center gap-1.5 text-xs text-secondary ${isPrev ? '' : 'flex-row-reverse'}`}
        >
          {isPrev && <span aria-hidden="true">{arrow}</span>}
          {label}
          {!isPrev && <span aria-hidden="true">{arrow}</span>}
        </span>

        <span className="text-[15px] font-medium transition-transform group-hover:translate-x-0.5 md:text-base">
          {title}
        </span>
      </Link>
    </motion.div>
  )
}

const ProjectNavigation = ({ prevProject, nextProject }) => {
  const { language } = useLanguage()
  const t = NAVIGATION_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  if (!prevProject && !nextProject) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      dir={isPersian ? 'rtl' : 'ltr'}
      className="mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {prevProject ? (
        <NavCard
          href={prevProject.href}
          title={prevProject.title}
          direction="prev"
          label={t.prevLabel}
          isPersian={isPersian}
        />
      ) : (
        <div />
      )}

      {nextProject && (
        <NavCard
          href={nextProject.href}
          title={nextProject.title}
          direction="next"
          label={t.nextLabel}
          isPersian={isPersian}
        />
      )}
    </motion.div>
  )
}

export default ProjectNavigation