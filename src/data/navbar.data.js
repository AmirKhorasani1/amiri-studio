import {
  HiOutlineArchiveBox,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineCodeBracket,
  HiOutlineDevicePhoneMobile,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlinePencilSquare,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineSwatch,
} from 'react-icons/hi2'

export const NAV_KEYS = ['Home', 'Skills']
export const END_KEYS = ['Contact', 'Blog']

export const TOOLS_ITEMS = [
  { key: 'colorCraft', icon: HiOutlineSwatch },
  { key: 'typeScale', icon: HiOutlineDocumentText },
  { key: 'uiBuilder', icon: HiOutlineSquares2X2 },
  { key: 'animationLab', icon: HiOutlineSparkles },
  { key: 'jsonStudio', icon: HiOutlineCodeBracket },
  { key: 'devNotes', icon: HiOutlinePencilSquare },
  { key: 'stillTime', icon: HiOutlineClock },
  { key: 'snippetVault', icon: HiOutlineArchiveBox },
]

export const PROJECT_ITEMS = [
  { key: 'webApps', icon: HiOutlineGlobeAlt },
  { key: 'mobileApps', icon: HiOutlineDevicePhoneMobile },
  { key: 'dashboards', icon: HiOutlineChartBar },
  { key: 'ecommerce', icon: HiOutlineShoppingBag },
]

export const localizeItems = (items, translations, group) =>
  items.map((item) => ({
    ...item,
    name: translations[group][item.key].name,
    description: translations[group][item.key].description,
  }))