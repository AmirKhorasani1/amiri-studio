import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { HiChevronDown } from 'react-icons/hi'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { BsTriangleFill } from 'react-icons/bs'
import {
  HiOutlineSwatch,
  HiOutlineDocumentText,
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineCodeBracket,
  HiOutlinePencilSquare,
  HiOutlineClock,
  HiOutlineArchiveBox,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
  HiOutlineChartBar,
  HiOutlineShoppingBag,
} from 'react-icons/hi2'

import LogoImg from '@assets/images/file_00000000f4b4820a8b474db8c6b906eb.png'
import NavDropdown from './NavDropdown'
import NavMenuItem from './NavMenuItem'
import ThemeToggleButton from '@ui/ThemeToggleButton'
import { useTheme } from '@context/ThemeContext'

const START_ITEMS = ['Home', 'Skills']
const END_ITEMS = ['Contact', 'Blog']

const TOOLS_ITEMS = [
  { name: 'ColorCraft', description: 'Generate perfect color palettes', icon: HiOutlineSwatch },
  { name: 'TypeScale', description: 'Consistent type scales, fast', icon: HiOutlineDocumentText },
  { name: 'UI Builder', description: 'Drag, drop, ship interfaces', icon: HiOutlineSquares2X2 },
  { name: 'Animation Lab', description: 'Prototype smooth motion easily', icon: HiOutlineSparkles },
  { name: 'JSON Studio', description: 'Format, validate, explore JSON', icon: HiOutlineCodeBracket },
  { name: 'DevNotes', description: 'Capture ideas without friction', icon: HiOutlinePencilSquare },
  { name: 'StillTime', description: 'Distraction-free focus timer', icon: HiOutlineClock },
  { name: 'Snippet Vault', description: 'Reusable code, one click away', icon: HiOutlineArchiveBox },
]

const PROJECT_ITEMS = [
  { name: 'Web Apps', description: 'Fast, scalable web platforms', icon: HiOutlineGlobeAlt },
  { name: 'Mobile Apps', description: 'Native-feeling cross-platform apps', icon: HiOutlineDevicePhoneMobile },
  { name: 'Dashboards', description: 'Clear data, at a glance', icon: HiOutlineChartBar },
  { name: 'E-commerce', description: 'Storefronts built to convert', icon: HiOutlineShoppingBag },
]

const navLinkClass = (isActive) =>
  `cursor-pointer p-3 text-[15px] duration-200 ${
    isActive
      ? 'font-medium text-neutral-900 dark:text-white'
      : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300'
  }`

const mobileLinkClass = (isActive) =>
  `flex w-full items-center justify-between px-4 py-3.5 text-xl duration-200 ${
    isActive
      ? 'font-semibold text-neutral-900 dark:text-white'
      : 'font-medium text-neutral-700 dark:text-neutral-400'
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

  const renderMobileGroup = (label, items, isMobileOpen) => (
    <li key={label} className="">
      <button
        onClick={() => toggleMobileGroup(label)}
        className={mobileLinkClass(active === label)}
      >
        {label}
        <motion.span
          animate={{ rotate: isMobileOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={20} className="text-black dark:text-white"/>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            {/*
              در موبایل به‌خاطر عرض کم صفحه از 2 ستون استفاده می‌کنیم
              (به‌جای 4 ستونِ دسکتاپ) ولی دقیقاً همون کارت آیکون + عنوان + توضیح.
            */}
            <div className="grid grid-cols-1 gap-1 px-2 pb-4">
              {items.map((item) => (
                <NavMenuItem
                  key={item.name}
                  {...item}
                  onClick={() => handleSubSelect(label)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )

  return (
    <div className="fixed top-0 left-0 z-50 w-full md:bg-black bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between py-4 container">
        <div className="hidden items-center gap-8 md:flex">
          <img width={30} src={LogoImg} alt="logo" />
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
        <Link to={'/'}>
          <img
            width={42}
            src={LogoImg}
            alt="logo"
            className="md:hidden bg-primary p-2.5 rounded-full"
          />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggleButton className="hidden md:flex" />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-primary bg-primary p-2 rounded-full md:hidden"
            aria-label="باز و بسته کردن منو"
          >
            {menuOpen ? <IoClose size={27} /> : <HiOutlineMenuAlt4 size={27} />}
          </button>
          <button className="hidden md:block btn btn-primary py-2 px-3.5">
            Start a project
          </button>
        </div>
      </div>

      {/* ===== منوی تمام‌صفحه‌ی موبایل — از سمت راست باز می‌شه ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 0.9 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-black md:hidden"
          >
            {/* نوار بالا: لوگو + دکمه بستن */}
            <div className="flex items-center justify-between px-5 py-7">
              <Link to={'/'}>
                <img
                  width={22}
                  src={LogoImg}
                  alt="logo"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="بستن منو"
                className="text-black dark:text-white"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* محتوای منو */}
            <div className="no-scrollbar flex-1 overflow-y-auto px-1">
              <ul className="flex flex-col">
                {START_ITEMS.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect(item)}
                    className={`${mobileLinkClass(active === item)}`}
                  >
                    {item}
                  </li>
                ))}

                {renderMobileGroup('Tools', TOOLS_ITEMS, openMobileMenu === 'Tools')}
                {renderMobileGroup('Project', PROJECT_ITEMS, openMobileMenu === 'Project')}

                {END_ITEMS.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect(item)}
                    className={`${mobileLinkClass(active === item)}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* پایین: تم و دکمه شروع پروژه */}
            <div className="flex flex-col gap-4 border-t border-neutral-100 px-6 py-4 dark:border-neutral-900">
              <div className="flex items-center justify-between">
                <span className="text-[14.5px] font-medium text-neutral-500 dark:text-neutral-400">
                  {darkMode ? 'Dark mode' : 'Light mode'}
                </span>
                <ThemeToggleButton />
              </div>

              <button className="btn btn-primary w-full py-3">
                Start a project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar