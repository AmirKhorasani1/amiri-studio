// @/components/templates/project/components/ProjectHero/ProjectHero.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import {
  buttonRowVariants,
  buttonVariants,
  containerVariants,
  itemVariants,
} from '@animation/heroIntro.animations'

const PROJECT_HERO_TRANSLATIONS = {
  en: {
    liveDemoBtn: 'Live Demo',
    githubBtn: 'View on GitHub',
  },
  fa: {
    liveDemoBtn: 'مشاهده دمو',
    githubBtn: 'مشاهده کد',
  },
}

const BrowserFrame = ({ children }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-1.5 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
      </div>

      <div className="aspect-video w-full overflow-hidden">{children}</div>
    </div>
  )
}

const ProjectHero = ({ title, category, description, image, liveUrl, githubUrl }) => {
  const { language } = useLanguage()
  const t = PROJECT_HERO_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <section className="w-full relative z-10 mx-auto flex flex-col overflow-hidden pt-10 md:pt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        dir={isPersian ? 'rtl' : 'ltr'}
        className="flex w-full flex-col items-center gap-5 text-center md:gap-7"
      >
        {category && (
          <motion.span
            variants={itemVariants}
            className="rounded-full border-primary bg-neutral-200/60 px-3.5 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-md dark:bg-neutral-900/60 dark:text-neutral-200"
          >
            {category}
          </motion.span>
        )}

        <motion.h1
          variants={itemVariants}
          className="text-center text-[32px] leading-10 tracking-tighter md:text-[48px] md:leading-[1.15]"
          style={{
            letterSpacing: isPersian ? 'normal' : '-0.03em',
            fontWeight: isPersian ? 600 : 450,
          }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-center text-[16px] font-normal text-secondary md:text-lg"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          variants={buttonRowVariants}
          className="mt-1 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              variants={buttonVariants}
              className="btn-primary"
            >
              {t.liveDemoBtn} ↗
            </motion.a>
          )}

          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              variants={buttonVariants}
              className="btn-secondary"
            >
              {t.githubBtn} ↗
            </motion.a>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 w-full md:mt-10">
          <BrowserFrame>
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </BrowserFrame>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ProjectHero