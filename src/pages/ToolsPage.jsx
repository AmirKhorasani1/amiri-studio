import React from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import DevNotesCard from '../features/portfolio/tools/components/DevNotes/DevNotesCard'
import StillTimeCard from '../features/portfolio/tools/components/StillTime/StillTimeCard'
import AnimationLab from '../features/portfolio/tools/components/AnimationLab/AnimationLab'
import SnippetVaultCard from '../features/portfolio/tools/components/SnippetVault/SnippetVaultCard'
import TypeScaleCard from '../features/portfolio/tools/components/TypeScale/TypeScaleCard'
import ColorCraftCard from '../features/portfolio/tools/components/ColorCraft/ColorCraftCard'

const ToolsPage = () => {
  return (
    <div className="flex flex-col gap-4 px-5 md:px-25 md:pt-25">
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

      <div className="grid grid-cols-2 gap-4 *:cursor-pointer">
        <div className="grid grid-cols-2 gap-4 *:cursor-pointer">
          <ColorCraftCard />
          <TypeScaleCard />
        </div>
        <div className="border border-neutral-800 rounded-lg">

        </div>
      </div>
    </div>
  )
}

export default ToolsPage