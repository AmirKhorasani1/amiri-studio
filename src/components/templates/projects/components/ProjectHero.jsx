import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation, Pagination, A11y } from 'swiper/modules'
import { useLanguage } from '@context/LanguageContext'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
    <div className="h-full w-full overflow-hidden rounded-4xl bg-neutral-100 dark:bg-[#212121]">
      <div className="flex items-center gap-1.5 border-b border-neutral-200 px-6 py-5 dark:border-neutral-800">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
      </div>

      <div className="h-[calc(100%-52px)] w-full overflow-hidden">{children}</div>
    </div>
  )
}

const ProjectHero = ({
  title,
  category,
  description,
  image,
  images = [],
  liveUrl,
  githubUrl,
}) => {
  const { language } = useLanguage()
  const t = PROJECT_HERO_TRANSLATIONS[language]
  const isPersian = language === 'fa'

  const gallery = images.length > 0 ? images : image ? [image] : []

  const containerRef = useRef(null)
  const galleryBoxRef = useRef(null)

  // به‌جای رصد کل سکشن، خود جعبه‌ی گالری رو رصد می‌کنیم:
  // progress=0 وقتی لبه‌ی بالای گالری از پایین صفحه وارد می‌شه
  // progress=1 وقتی لبه‌ی بالای گالری به بالای صفحه می‌رسه (یعنی کامل روی متن اومده)
  const { scrollYProgress } = useScroll({
    target: galleryBoxRef,
    offset: ['start end', 'start start'],
  })

  // متن تا وقتی گالری ۷۰٪ مسیرش رو نیومده کامل دیده می‌شه،
  // و درست همزمان با رسیدن کامل گالری به بالای صفحه محو می‌شه
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
  const textPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.9 ? 'none' : 'auto'
  )

  return (
    <section ref={containerRef} className="relative z-10 w-full h-[120vh]">
      <motion.div
        dir={isPersian ? 'rtl' : 'ltr'}
        style={{ opacity: textOpacity, pointerEvents: textPointerEvents }}
        className="fixed top-0 left-0 z-0 flex w-full flex-col items-center justify-center gap-5 px-4 text-center md:gap-7"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center gap-5 text-center md:gap-7 pt-45"
        >
          {category && (
            <motion.span
              variants={itemVariants}
              className="w-fit rounded-full border border-neutral-300 px-3 py-1 text-xs text-secondary dark:border-neutral-700"
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
        </motion.div>
      </motion.div>

      {/* گالری — از پایین صفحه میاد بالا و از روی متنِ ثابت رد می‌شه */}
      <div className="absolute left-0 top-0 z-10 w-full" style={{ marginTop: '5vh' }}>
        <div className="h-[45vh]" />

        <div className="flex w-full items-center justify-center">
          <div ref={galleryBoxRef} className="h-[70vh] w-full max-w-7xl">
            <BrowserFrame>
              <Swiper
                modules={[Navigation, Pagination, Keyboard, A11y]}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                loop={gallery.length > 1}
                className="h-full w-full"
              >
                {gallery.map((src, index) => (
                  <SwiperSlide key={`${src}-${index}`}>
                    <img
                      src={src}
                      alt={`${title} ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectHero