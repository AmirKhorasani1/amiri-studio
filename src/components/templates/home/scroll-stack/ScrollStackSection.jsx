'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function ScrollStackSection({ children, zIndex, isFirst = false, className = '' }) {
  const wrapperRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isFirst ? [1, 1, 1, 0.94] : [0.92, 1, 1, 0.94],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    isFirst ? [1, 1, 1, 0.5] : [0, 1, 1, 0.5],
  )
  const y = useTransform(scrollYProgress, [0, 0.3], isFirst ? [0, 0] : [50, 0])
  const blurAmount = useTransform(scrollYProgress, [0.85, 1], [0, 5])
  const filter = useTransform(blurAmount, (value) => `blur(${value}px)`)

  if (shouldReduceMotion) {
    return (
      <section className={`relative min-h-screen ${className}`} style={{ zIndex }}>
        {children}
      </section>
    )
  }

  return (
    <section ref={wrapperRef} className={`relative h-[150vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex }}>
        <motion.div
          style={{ scale, opacity, y, filter, willChange: 'transform, opacity' }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}