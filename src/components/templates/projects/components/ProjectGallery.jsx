// @/components/templates/project/components/ProjectGallery/ProjectGallery.jsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@context/LanguageContext'

import { containerVariants, itemVariants } from '@animation/heroIntro.animations'

const GALLERY_TRANSLATIONS = {
  en: {
    heading: 'Gallery',
  },
  fa: {
    heading: 'گالری تصاویر',
  },
}

const GalleryImage = ({ src, alt, className = '', onClick }) => (
  <motion.button
    type="button"
    variants={itemVariants}
    onClick={onClick}
    className={`overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
  >
    <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
  </motion.button>
)

const ProjectGallery = ({ images = [] }) => {
  const { language } = useLanguage()
  const t = GALLERY_TRANSLATIONS[language]
  const isPersian = language === 'fa'
  const [activeIndex, setActiveIndex] = useState(null)

  const [mainImage, ...restImages] = images

  return (
    <>
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
          className="text-[22px] font-medium tracking-tight md:text-[28px]"
          style={{ fontWeight: isPersian ? 600 : 500 }}
        >
          {t.heading}
        </motion.h2>

        <div className="flex flex-col gap-4">
          {mainImage && (
            <GalleryImage
              src={mainImage}
              alt={`${t.heading} 1`}
              className="aspect-video w-full"
              onClick={() => setActiveIndex(0)}
            />
          )}

          {restImages.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {restImages.map((src, index) => (
                <GalleryImage
                  key={src}
                  src={src}
                  alt={`${t.heading} ${index + 2}`}
                  className="aspect-video w-full"
                  onClick={() => setActiveIndex(index + 1)}
                />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={images[activeIndex]}
              alt={`${t.heading} ${activeIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectGallery