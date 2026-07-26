import React from 'react'
import SectionTitle from '../../../components/ui/SectionTitle'
import ColorCraftCard from './components/ColorCraft/ColorCraftCard'
import TypeScaleCard from './components/TypeScale/TypeScaleCard'
import DevNotesCard from './components/DevNotes/DevNotesCard'
import StillTimeCard from './components/StillTime/StillTimeCard'
import SnippetVaultCard from './components/SnippetVault/SnippetVaultCard'
import AnimationLab from './components/AnimationLab/AnimationLab'
import { Link } from 'react-router-dom'

const ToolsSection = () => {
  return (
    <div className="flex flex-col gap-4 px-5 md:px-25">
      <SectionTitle
        title="Built to Solve Real Problems"
        description="Every tool here started as a real problem during development. I built them to remove repetitive work, improve consistency, and make building interfaces faster."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 *:cursor-pointer">
          <DevNotesCard />
          <StillTimeCard />
        </div>
        <div className="grid grid-cols-1 gap-4 *:cursor-pointer">
          <AnimationLab />
          <SnippetVaultCard />
        </div>
      </div>
      
      <Link to={"/tools"} className='text-sm text-neutral-200 hover:text-white duration-200 mt-2'>

        
        <span>View all tools</span>
      </Link>
    </div>
  )
}

export default ToolsSection