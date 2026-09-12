const EASE_OUT = [0.16, 1, 0.3, 1]

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

export const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

// کلمات عنوان — نرم‌تر و کندتر از قبل
export const wordVariants = {
  hidden: { opacity: 0, y: 14, skewX: -4, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    skewX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

export const buttonRowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// دکمه‌ها — opacity جدا از y/scale تا اسپرینگ باعث محو-ظاهر نشه
export const buttonVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { duration: 0.35, ease: 'easeOut' },
      default: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 },
    },
  },
}