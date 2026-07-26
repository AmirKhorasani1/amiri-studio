import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'

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
            className="absolute left-1/2 top-full z-50 w-45 -translate-x-1/2 rounded-3xl bg-secondary border-primary p-2"
          >
            <ul className="flex flex-col gap-0.5">
              {items.map(({ name, icon: Icon }) => (
                <li key={name}>
                  <button
                    onClick={() => onSelect?.(label, name)}
                    className="group flex w-full items-center gap-3 rounded-full px-3.5 py-2.5 text-[14.5px] duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="">
                      <Icon size={16} />
                    </span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default NavDropdown