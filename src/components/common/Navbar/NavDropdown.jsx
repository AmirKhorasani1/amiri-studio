import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import NavMenuItem from './NavMenuItem'

const NavDropdown = ({ label, items, isOpen, onEnter, onLeave, isActiveGroup, onSelect }) => {
  return (
    <li className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={`flex cursor-pointer items-center gap-1 p-3 text-[14.5px] duration-200 ${
          isActiveGroup
            ? 'font-medium text-neutral-900 dark:text-white'
            : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300'
        }`}
      >
        {label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="size-3"
        >
          <HiChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="
              absolute left-1/2 top-full z-50 mt-2 w-[600px] max-w-[92vw]
              -translate-x-1/2 rounded-lg border border-[#303030]
              p-3 bg-primary
            "
          >
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <NavMenuItem
                  key={item.name}
                  {...item}
                  onClick={() => onSelect?.(label, item.name)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default NavDropdown