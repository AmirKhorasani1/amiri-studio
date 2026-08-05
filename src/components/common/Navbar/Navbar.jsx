import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { HiChevronDown } from 'react-icons/hi'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
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

import LogoImg from '@assets/images/logodark.svg'
import NavDropdown from './NavDropdown'
import NavMenuItem from './NavMenuItem'
import ThemeToggleButton from '@ui/ThemeToggleButton'
import LanguageToggleButton from '@ui/LanguageToggleButton'
import { useTheme } from '@context/ThemeContext'
import { useLanguage } from '@context/LanguageContext'

const NAV_KEYS = ['Home', 'Skills']
const END_KEYS = ['Contact', 'Blog']

const TOOLS_ITEMS = [
  { key: 'colorCraft', icon: HiOutlineSwatch },
  { key: 'typeScale', icon: HiOutlineDocumentText },
  { key: 'uiBuilder', icon: HiOutlineSquares2X2 },
  { key: 'animationLab', icon: HiOutlineSparkles },
  { key: 'jsonStudio', icon: HiOutlineCodeBracket },
  { key: 'devNotes', icon: HiOutlinePencilSquare },
  { key: 'stillTime', icon: HiOutlineClock },
  { key: 'snippetVault', icon: HiOutlineArchiveBox },
]

const PROJECT_ITEMS = [
  { key: 'webApps', icon: HiOutlineGlobeAlt },
  { key: 'mobileApps', icon: HiOutlineDevicePhoneMobile },
  { key: 'dashboards', icon: HiOutlineChartBar },
  { key: 'ecommerce', icon: HiOutlineShoppingBag },
]

const translations = {
  en: {
    nav: {
      Home: 'Home',
      Skills: 'Skills',
      Tools: 'Tools',
      Project: 'Project',
      Contact: 'Contact',
      Blog: 'Blog',
    },
    startProject: 'Start a project',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    openMenuAria: 'Open menu',
    closeMenuAria: 'Close menu',
    tools: {
      colorCraft: { name: 'ColorCraft', description: 'Generate perfect color palettes' },
      typeScale: { name: 'TypeScale', description: 'Consistent type scales, fast' },
      uiBuilder: { name: 'UI Builder', description: 'Drag, drop, ship interfaces' },
      animationLab: { name: 'Animation Lab', description: 'Prototype smooth motion easily' },
      jsonStudio: { name: 'JSON Studio', description: 'Format, validate, explore JSON' },
      devNotes: { name: 'DevNotes', description: 'Capture ideas without friction' },
      stillTime: { name: 'StillTime', description: 'Distraction-free focus timer' },
      snippetVault: { name: 'Snippet Vault', description: 'Reusable code, one click away' },
    },
    projects: {
      webApps: { name: 'Web Apps', description: 'Fast, scalable web platforms' },
      mobileApps: { name: 'Mobile Apps', description: 'Native-feeling cross-platform apps' },
      dashboards: { name: 'Dashboards', description: 'Clear data, at a glance' },
      ecommerce: { name: 'E-commerce', description: 'Storefronts built to convert' },
    },
  },
  fa: {
    nav: {
      Home: 'خانه',
      Skills: 'مهارت‌ها',
      Tools: 'ابزارها',
      Project: 'پروژه‌ها',
      Contact: 'تماس',
      Blog: 'بلاگ',
    },
    startProject: 'شروع پروژه',
    darkMode: 'حالت تاریک',
    lightMode: 'حالت روشن',
    openMenuAria: 'باز کردن منو',
    closeMenuAria: 'بستن منو',
    tools: {
      colorCraft: { name: 'ColorCraft', description: 'ساخت پالت و طیف‌های رنگی' },
      typeScale: { name: 'TypeScale', description: 'تنظیم فونت و مقیاس تایپوگرافی' },
      uiBuilder: { name: 'UI Builder', description: 'طراحی و آزمایش رابط کاربری' },
      animationLab: { name: 'Animation Lab', description: 'ساخت و پیش‌نمایش انیمیشن‌ها' },
      jsonStudio: { name: 'JSON Studio', description: 'فرمت و بررسی فایل‌های JSON' },
      devNotes: { name: 'DevNotes', description: 'ثبت یادداشت‌ها و وظایف' },
      stillTime: { name: 'StillTime', description: 'ساعت، تایمر و کرنومتر' },
      snippetVault: { name: 'Snippet Vault', description: 'مجموعه‌ای از قطعه‌کدهای آماده' },
    },
    projects: {
      webApps: { name: 'اپلیکیشن‌های وب', description: 'وب‌اپلیکیشن‌های سریع و مقیاس‌پذیر' },
      mobileApps: { name: 'اپلیکیشن‌های موبایل', description: 'اپلیکیشن‌های مدرن و روان' },
      dashboards: { name: 'داشبوردهای مدیریتی', description: 'مدیریت و نمایش داده‌ها' },
      ecommerce: { name: 'فروشگاه‌های آنلاین', description: 'فروشگاه‌های مدرن و بهینه' },
    },
  },
}

const navLinkClass = (isActive) =>
  `cursor-pointer p-3 text-[15.5px] font-medium duration-200 ${
    isActive
      ? 'font-medium text-neutral-900 dark:text-white'
      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300'
  }`

const mobileLinkClass = (isActive) =>
  `flex w-full items-center justify-between px-4 py-3.5 text-xl duration-200 ${
    isActive
      ? 'font-semibold text-neutral-900 dark:text-white'
      : 'font-medium text-neutral-700 dark:text-neutral-400'
  }`

const Navbar = () => {
  const { darkMode } = useTheme()
  const { language } = useLanguage()
  const t = translations[language]

  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)

  // ۱. متغیر ذخیره وضعیت اسکرول
  const [scrolled, setScrolled] = useState(false)

  // ۲. مدیریت رویداد اسکرول
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const localizedToolsItems = TOOLS_ITEMS.map((item) => ({
    ...item,
    name: t.tools[item.key].name,
    description: t.tools[item.key].description,
  }))

  const localizedProjectItems = PROJECT_ITEMS.map((item) => ({
    ...item,
    name: t.projects[item.key].name,
    description: t.projects[item.key].description,
  }))

  const renderMobileGroup = (groupKey, displayLabel, items, isMobileOpen) => (
    <li key={groupKey} className="">
      <button
        onClick={() => toggleMobileGroup(groupKey)}
        className={mobileLinkClass(active === groupKey)}
      >
        {displayLabel}
        <motion.span
          animate={{ rotate: isMobileOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={20} className="text-black dark:text-white" />
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
            <div className="grid grid-cols-1 gap-1 px-2 pb-4">
              {items.map((item) => (
                <NavMenuItem
                  key={item.key}
                  {...item}
                  onClick={() => handleSubSelect(groupKey)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )

  return (
    <div
      className={`fixed inset-x-0 z-50 mx-auto transition-all duration-700 ${
        scrolled
          ? 'top-4 w-[90%] md:w-2/3 rounded-full bg-white py-2 px-3 dark:bg-neutral-900'
          : 'top-0 w-full container bg-gradient-to-b from-neutral-100 via-neutral-100/80 to-transparent py-4 dark:from-black dark:via-black/80'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-0">
        <div className="hidden items-center gap-8 md:flex">
          <img width={30} height={30} src={LogoImg} alt="logo" />
          <ul className="flex items-center gap-2 *:text-[15.5px]">
            {NAV_KEYS.map((key) => (
              <li
                key={key}
                onClick={() => handleSelect(key)}
                className={navLinkClass(active === key)}
              >
                {t.nav[key]}
              </li>
            ))}

            <NavDropdown
              label="Tools"
              displayLabel={t.nav.Tools}
              items={localizedToolsItems}
              isOpen={openDesktopMenu === 'Tools'}
              onEnter={() => setOpenDesktopMenu('Tools')}
              onLeave={() => setOpenDesktopMenu(null)}
              isActiveGroup={active === 'Tools'}
              onSelect={handleSubSelect}
            />

            <NavDropdown
              label="Project"
              displayLabel={t.nav.Project}
              items={localizedProjectItems}
              isOpen={openDesktopMenu === 'Project'}
              onEnter={() => setOpenDesktopMenu('Project')}
              onLeave={() => setOpenDesktopMenu(null)}
              isActiveGroup={active === 'Project'}
              onSelect={handleSubSelect}
            />

            {END_KEYS.map((key) => (
              <li
                key={key}
                onClick={() => handleSelect(key)}
                className={navLinkClass(active === key)}
              >
                {t.nav[key]}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:hidden bg-primary p-2.5 rounded-full">
          <Link to="/">
            <img
              src={LogoImg}
              alt="Amiri Studio logo"
              width={42}
              height={42}
              className="block object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggleButton className="hidden md:flex" />
          <ThemeToggleButton className="hidden md:flex" />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-primary bg-primary p-2 rounded-full md:hidden"
            aria-label={menuOpen ? t.closeMenuAria : t.openMenuAria}
          >
            {menuOpen ? <IoClose size={27} /> : <HiOutlineMenuAlt4 size={27} />}
          </button>
          <button className="hidden md:block btn btn-primary">
            {t.startProject}
          </button>
        </div>
      </div>

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
                <img width={22} height={22} src={LogoImg} alt="logo" />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label={t.closeMenuAria}
                className="text-black dark:text-white"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* محتوای منو */}
            <div className="no-scrollbar flex-1 overflow-y-auto px-1">
              <ul className="flex flex-col">
                {NAV_KEYS.map((key) => (
                  <li
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`${mobileLinkClass(active === key)}`}
                  >
                    {t.nav[key]}
                  </li>
                ))}

                {renderMobileGroup(
                  'Tools',
                  t.nav.Tools,
                  localizedToolsItems,
                  openMobileMenu === 'Tools'
                )}
                {renderMobileGroup(
                  'Project',
                  t.nav.Project,
                  localizedProjectItems,
                  openMobileMenu === 'Project'
                )}

                {END_KEYS.map((key) => (
                  <li
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`${mobileLinkClass(active === key)}`}
                  >
                    {t.nav[key]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-neutral-100 px-6 py-4 dark:border-neutral-900">
              <div className="flex items-center justify-between">
                <span className="text-[14.5px] font-medium text-neutral-500 dark:text-neutral-400">
                  {darkMode ? t.darkMode : t.lightMode}
                </span>
                <ThemeToggleButton />
              </div>
              <LanguageToggleButton className="md:hidden" />
              <button className="btn btn-primary w-full py-3">
                {t.startProject}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar