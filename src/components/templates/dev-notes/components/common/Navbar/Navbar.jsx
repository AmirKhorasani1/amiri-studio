import LanguageToggleButton from '@/components/ui/LanguageToggleButton'
import ThemeToggleButton from '@/components/ui/ThemeToggleButton'
import React from 'react'

const Navbar = () => {
  return (
    <div className="fixed w-full flex items-center justify-between ltr:pl-70 rtl:pl-70">
      <div className="p-4 text-sm text-neutral-400">
        amiri-studio / DevNotes / Home / MyTask
      </div>
      <div className='p-2 flex items-center gap-4'>
        <LanguageToggleButton />
        <ThemeToggleButton />
      </div>
    </div>
  )
}

export default Navbar