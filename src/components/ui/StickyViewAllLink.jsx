import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'

const StickyViewAllLink = ({
  to,
  label = 'View all',
  className = '',
}) => {
  return (
    <div
      className={`z-30 flex justify-center ${className}`}
    >
      <Link
        to={to}
        className="
          group flex items-center gap-3 rounded-full
          dark:bg-neutral-800 bg-white
          p-1.5 ltr:pl-4 rtl:pr-4
          text-[14px] md:text-[15px]
          font-medium text-neutral-900 dark:text-neutral-200
          transition-colors duration-200
          active:scale-95 active:bg-white/30
          hover:text-white hover:border-neutral-700
        "
      >
        <span>{label}</span>

        <div
          className="
            flex items-center justify-center
            pl-0.5
            bg-black dark:bg-white
            rounded-full
            w-10 h-10
            text-white dark:text-black
            rtl:rotate-180
          "
        >
          <MdKeyboardArrowRight
            size={23}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </div>
  )
}

export default StickyViewAllLink