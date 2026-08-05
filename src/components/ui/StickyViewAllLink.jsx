import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { motion } from 'framer-motion'

const StickyViewAllLink = ({
  to,
  label = 'View all',
  bottomOffset = 'bottom-2 md:bottom-3',
  className = '',
}) => {
  return (
    <div className={`sticky ${bottomOffset} z-30 flex justify-center pointer-events-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <Link
          to={to}
          className="
            group flex items-center gap-3 rounded-full
            bg-neutral-600/55
            p-1.5 ltr:pl-4 rtl:pr-4 text-[14.5px] md:text-[15.5px] font-medium text-neutral-200
            shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm
            transition-colors duration-200 active:scale-95 active:bg-white/30
            hover:text-white hover:border-neutral-700
          "
        >
          <span>{label}</span>
          <div className="flex items-center justify-center pl-0.5 bg-white rounded-full w-10 h-10 text-black rtl:rotate-180">
            <MdKeyboardArrowRight
              size={23}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default StickyViewAllLink