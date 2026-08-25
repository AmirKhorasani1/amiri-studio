import { motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import AvailabilityStatus from './AvailabilityStatus'
import {
  buttonRowVariants,
  buttonVariants,
  containerVariants,
  itemVariants,
} from '@animation/heroIntro.animations'
import { HERO_TRANSLATIONS } from '@/components/templates/home/hero/components/HeroIntro/heroIntro.data'

const HeroIntro = () => {
  const { language } = useLanguage()
  const t = HERO_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  return (
    <section className="relative z-10 mx-auto flex flex-col overflow-hidden">
      <div className="relative z-10 flex w-full flex-1 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          dir={isPersian ? 'rtl' : 'ltr'}
          className="flex w-full flex-col items-center gap-5.5 text-center md:gap-8"
        >
          <motion.div variants={itemVariants}>
            <AvailabilityStatus
              label={t.available}
              timezone={t.timezone}
              language={language}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-center text-[36px] leading-11 tracking-tighter md:text-[58px] md:leading-[1.15]"
            style={{
              letterSpacing: isPersian ? 'normal' : '-0.03em',
              fontWeight: isPersian ? 600 : 450,
            }}
          >
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="max-w-2xl text-center text-[16.5px] font-normal text-secondary md:text-lg"
          >
            {t.description}
          </motion.h2>

          <motion.div
            variants={buttonRowVariants}
            className="mt-2 flex flex-wrap items-center justify-center gap-3 md:mt-0 md:gap-4"
          >
            <motion.button
              variants={buttonVariants}
              className="btn-primary"
            >
              {t.resumeBtn}
            </motion.button>

            <motion.button
              variants={buttonVariants}
              className="btn-secondary"
            >
              {t.projectsBtn}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroIntro