import React, { useState } from 'react'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { FaFigma, FaGithub, FaCode } from 'react-icons/fa'
import { SiPostman } from 'react-icons/si'
import { FiGlobe, FiSmartphone, FiBarChart2, FiShoppingBag } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import NavDropdown from './NavDropdown'
import ThemeToggleButton from '../../ui/ThemeToggleButton'
import { useTheme } from '../../../context/ThemeContext'
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import LogoImg from "../../../assets/images/file_00000000f4b4820a8b474db8c6b906eb.png";

const START_ITEMS = ['Home', 'Skills']
const END_ITEMS = ['Contact', 'Blog']

const TOOLS_ITEMS = [
  { name: 'ColorCraft', icon: FaCode },
  { name: 'TypeScale', icon: FaFigma },
  { name: 'UI Builder', icon: FaGithub },
  { name: 'Animation Lab', icon: SiPostman },
  { name: 'JSON Studio', icon: FaCode },
  { name: 'DevNotes', icon: FaFigma },
  { name: 'StillTime', icon: FaGithub },
  { name: 'Snippet Vault', icon: SiPostman },
]

const PROJECT_ITEMS = [
  { name: 'Web Apps', icon: FiGlobe },
  { name: 'Mobile Apps', icon: FiSmartphone },
  { name: 'Dashboards', icon: FiBarChart2 },
  { name: 'E-commerce', icon: FiShoppingBag },
]

const navLinkClass = (isActive) =>
  `cursor-pointer p-3 text-[15px] duration-200 ${
    isActive
      ? 'font-medium text-neutral-900 dark:text-white'
      : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300'
  }`

const mobileLinkClass = (isActive) =>
  `cursor-pointer px-6 py-3 text-[14.5px] font-medium duration-200 ${
    isActive
      ? 'bg-[#f95c4b] text-white'
      : 'text-neutral-600 dark:text-neutral-300'
  }`

const Navbar = () => {
  const { darkMode } = useTheme()

  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)

  const handleSelect = (item) => {
    setActive(item)
    setMenuOpen(false)
    setOpenMobileMenu(null)
  }

  const handleSubSelect = (group) => {
    setActive(group)
    setMenuOpen(false)
    setOpenDesktopMenu(null)
    setOpenMobileMenu(null)
  }

  const toggleMobileGroup = (key) => {
    setOpenMobileMenu((prev) => (prev === key ? null : key))
  }

  const renderSubGroup = (label, items, isMobileOpen) => (
    <li key={label}>
      <button
        onClick={() => toggleMobileGroup(label)}
        className={`flex w-full items-center justify-between ${mobileLinkClass(active === label)}`}
      >
        {label}
        <motion.span
          animate={{ rotate: isMobileOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden bg-neutral-50 dark:bg-neutral-900"
          >
            <ul className="grid grid-cols-2 gap-2 px-6 py-3">
              {items.map(({ name, icon: Icon }) => (
                <li key={name}>
                  <button
                    onClick={() => handleSubSelect(label)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] text-neutral-600 duration-200 hover:bg-[#f95c4b]/10 hover:text-[#f95c4b] dark:text-neutral-300"
                  >
                    <Icon size={16} />
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

  return (
    <div className="fixed top-0 left-0 z-50 w-full md:bg-black bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 py-4.5 md:px-25">
        <div className="hidden items-center gap-8 md:flex">
          <img
            width={30}
            src={LogoImg}
            alt="logo"
          />
          <ul className="flex items-center gap-2 *:text-[15px]">
            {START_ITEMS.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className={navLinkClass(active === item)}
              >
                {item}
              </li>
            ))}

            <NavDropdown
              label="Tools"
              items={TOOLS_ITEMS}
              isOpen={openDesktopMenu === 'Tools'}
              onEnter={() => setOpenDesktopMenu('Tools')}
              onLeave={() => setOpenDesktopMenu(null)}
              isActiveGroup={active === 'Tools'}
              onSelect={handleSubSelect}
            />

            <NavDropdown
              label="Project"
              items={PROJECT_ITEMS}
              isOpen={openDesktopMenu === 'Project'}
              onEnter={() => setOpenDesktopMenu('Project')}
              onLeave={() => setOpenDesktopMenu(null)}
              isActiveGroup={active === 'Project'}
              onSelect={handleSubSelect}
            />

            {END_ITEMS.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className={navLinkClass(active === item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* لوگو (موبایل) */}
        <img
          width={42}
          src={LogoImg}
          alt="logo"
          className="md:hidden bg-primary p-2.5 rounded-full"
        />

        <div className="flex items-center gap-3">
          <ThemeToggleButton className="hidden md:flex" />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-primary bg-primary p-2 rounded-full md:hidden"
            aria-label="باز و بسته کردن منو"
          >
            {menuOpen ? <IoClose size={27}/> : <HiOutlineMenuAlt4 size={27}/>}
          </button>
          <button className="hidden md:block btn btn-primary py-2 px-3.5">
            Start a project
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:hidden"
          >
            <ul className="flex flex-col py-2">
              {START_ITEMS.map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={mobileLinkClass(active === item)}
                >
                  {item}
                </li>
              ))}

              {renderSubGroup('Tools', TOOLS_ITEMS, openMobileMenu === 'Tools')}
              {renderSubGroup('Project', PROJECT_ITEMS, openMobileMenu === 'Project')}

              {END_ITEMS.map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={mobileLinkClass(active === item)}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-3 dark:border-neutral-800">
              <span className="text-[14.5px] font-medium text-neutral-500 dark:text-neutral-400">
                {darkMode ? 'حالت تاریک' : 'حالت روشن'}
              </span>
              <ThemeToggleButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar