import React from 'react'
import SectionTitle from '@ui/SectionTitle'
import SkillsList from './SkillsList'
import SkillsIconsBox from './SkillsIconsBox'

const SkillsSection = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 mt-35 container">
      <SectionTitle 
        title="Crafting Modern Interfaces" 
        description="Building fast, scalable, and interactive web experiences with modern frontend technologies."
      />

      <div className="flex flex-col-reverse md:flex-row items-start w-full gap-0 md:gap-10">
        
        <div className="w-full md:w-1/2">
          <SkillsList />
        </div>
        
        <SkillsIconsBox />

      </div>
    </div>
  )
}

export default SkillsSection