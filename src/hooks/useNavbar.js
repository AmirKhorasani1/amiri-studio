import { useState } from 'react'
import { localizeItems, NAV_KEYS, END_KEYS, TOOLS_ITEMS, PROJECT_ITEMS } from '@data/navbar.data'
import { translations } from '@common/Navbar/navbar.translations'
import { useLanguage } from '@context/LanguageContext'

export const useNavbar = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)

  const closeMobileMenu = () => {
    setMenuOpen(false)
    setOpenMobileMenu(null)
  }

  const handleSelect = (item) => {
    setActive(item)
    closeMobileMenu()
  }

  const handleSubSelect = (group) => {
    setActive(group)
    setMenuOpen(false)
    setOpenDesktopMenu(null)
    setOpenMobileMenu(null)
  }

  const toggleMobileGroup = (key) => {
    setOpenMobileMenu((current) => (current === key ? null : key))
  }

  const toggleMenu = () => {
    setMenuOpen((current) => !current)
  }

  return {
    t,
    active,
    menuOpen,
    openDesktopMenu,
    openMobileMenu,
    localizedToolsItems: localizeItems(TOOLS_ITEMS, t, 'tools'),
    localizedProjectItems: localizeItems(PROJECT_ITEMS, t, 'projects'),
    navKeys: NAV_KEYS,
    endKeys: END_KEYS,
    handleSelect,
    handleSubSelect,
    toggleMobileGroup,
    toggleMenu,
    setOpenDesktopMenu,
  }
}