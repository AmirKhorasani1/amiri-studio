import React from 'react'
import SectionTitle from '@ui/SectionTitle'
import DevNotesCard from '@home/tools/components/DevNotes/DevNotesCard'
import StillTimeCard from '@home/tools/components/StillTime/StillTimeCard'
import AnimationLab from '@home/tools/components/AnimationLab/AnimationLab'
import SnippetVaultCard from '@home/tools/components/SnippetVault/SnippetVaultCard'
import TypeScaleCard from '@home/tools/components/TypeScale/TypeScaleCard'
import ColorCraftCard from '@home/tools/components/ColorCraft/ColorCraftCard'

const ToolsPage = () => {
  return (
    <div className="flex flex-col gap-5 px-5 md:px-25 pt-25">
      <SectionTitle
        title="Built to Solve Real Problems"
        description="Every tool here started as a real problem during development. I built them to remove repetitive work, improve consistency, and make building interfaces faster."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 *:cursor-pointer">
          <DevNotesCard />
          <StillTimeCard />
        </div>
        <div className="grid grid-cols-1 gap-5 *:cursor-pointer">
          <AnimationLab />
          <SnippetVaultCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 *:cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 *:cursor-pointer">
          <TypeScaleCard />
          <ColorCraftCard />
        </div>
        <div className="border border-neutral-800 rounded-lg">
        </div>
      </div>
    </div>
  )
}

export default ToolsPage