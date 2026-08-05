import React from 'react'

const NavMenuItem = ({ name, description, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="
      group flex w-full items-start gap-3 rounded-lg p-2 text-left
      duration-200
      hover:bg-neutral-100 dark:hover:bg-neutral-900
      rtl:text-right
    "
  >
    <span
      className="
        flex size-11 shrink-0 items-center justify-center rounded-md
        border border-neutral-200 text-neutral-700
        duration-200
        group-hover:border-transparent group-hover:bg-neutral-900 group-hover:text-white
        dark:border-neutral-700 dark:text-neutral-300
        dark:group-hover:bg-white dark:group-hover:text-black
      "
    >
      <Icon size={22} />
    </span>

    <span className="flex flex-col gap-0.5">
      <span className="text-[14.5px] md:text-[15px] font-semibold text-neutral-900 dark:text-white">
        {name}
      </span>
      <span className="text-[12.5px] leading-snug text-neutral-500 dark:text-neutral-400">
        {description}
      </span>
    </span>
  </button>
)

export default NavMenuItem