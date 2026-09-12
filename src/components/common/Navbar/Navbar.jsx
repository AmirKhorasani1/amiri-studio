import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronDown, HiOutlineMenuAlt4 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import LogoImg from '@assets/images/logodark.svg'
import NavDropdown from './NavDropdown'
import NavMenuItem from './NavMenuItem'
import ThemeToggleButton from '@ui/ThemeToggleButton'
import LanguageToggleButton from '@ui/LanguageToggleButton'
import { useTheme } from '@context/ThemeContext'

import { useNavbar } from '@/hooks/useNavbar'
import { mobileLinkClass, navLinkClass } from './navbar.styles'

const Navbar = () => {
  const { darkMode } = useTheme()

  const {
    t,
    active,
    menuOpen,
    openDesktopMenu,
    openMobileMenu,
    localizedToolsItems,
    localizedProjectItems,
    navKeys,
    endKeys,
    handleSelect,
    handleSubSelect,
    toggleMobileGroup,
    toggleMenu,
    setOpenDesktopMenu,
  } = useNavbar()

  const renderMobileGroup = (groupKey, label, items) => {
    const isOpen = openMobileMenu === groupKey

    return (
      <li key={groupKey}>
        <button
          type="button"
          onClick={() => toggleMobileGroup(groupKey)}
          className={mobileLinkClass(active === groupKey)}
        >
          {label}

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HiChevronDown
              size={20}
              className="text-black dark:text-white"
            />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
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
  }

  const renderNavItem = (key, mobile = false) => (
    <li
      key={key}
      onClick={() => handleSelect(key)}
      className={mobileLinkClass(active === key)}
    >
      {t.nav[key]}
    </li>
  )

  return (
    <div className="fixed inset-x-0 top-0 z-50 transition-all duration-700">
      <div className="flex items-center justify-between container bg-neutral-100/60 dark:bg-[#050505bd] py-3 backdrop-blur-md">
        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <img
            width={26}
            height={26}
            src={LogoImg}
            alt="logo"
          />

          <ul className="flex items-center gap-2.5 *:text-[15.5px]">
            {navKeys.map((key) => (
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

            {endKeys.map((key) => (
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

        {/* Mobile logo */}
        <div className="rounded-full bg-white p-2.5 dark:bg-black md:hidden">
          <Link to="/">
            <img
              width={22}
              height={22}
              src={LogoImg}
              alt="Amiri Studio logo"
              className="block object-contain"
            />
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageToggleButton className="hidden md:flex" />
          <ThemeToggleButton className="hidden md:flex" />

          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-full bg-white p-2 text-primary dark:bg-black md:hidden"
            aria-label={menuOpen ? t.closeMenuAria : t.openMenuAria}
          >
            {menuOpen ? (
              <IoClose size={27} />
            ) : (
              <HiOutlineMenuAlt4 size={27} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 30,
              mass: 0.9,
            }}
            className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-black md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-7">
              <Link to="/">
                <img
                  width={22}
                  height={22}
                  src={LogoImg}
                  alt="logo"
                />
              </Link>

              <button
                type="button"
                onClick={() => toggleMenu()}
                aria-label={t.closeMenuAria}
                className="text-black dark:text-white"
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto px-1">
              <ul className="flex flex-col">
                {navKeys.map((key) => renderNavItem(key, true))}

                {renderMobileGroup(
                  'Tools',
                  t.nav.Tools,
                  localizedToolsItems,
                )}

                {renderMobileGroup(
                  'Project',
                  t.nav.Project,
                  localizedProjectItems,
                )}

                {endKeys.map((key) => renderNavItem(key, true))}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar