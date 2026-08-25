export const navLinkClass = (isActive) =>
  `cursor-pointer p-3 text-[15.5px] font-medium duration-200 ${
    isActive
      ? 'text-neutral-900 dark:text-white'
      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300'
  }`

export const mobileLinkClass = (isActive) =>
  `flex w-full items-center justify-between px-4 py-3.5 text-xl duration-200 ${
    isActive
      ? 'font-semibold text-neutral-900 dark:text-white'
      : 'font-medium text-neutral-700 dark:text-neutral-400'
  }`