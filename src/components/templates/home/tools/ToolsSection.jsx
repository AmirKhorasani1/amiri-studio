import React from 'react'
import SectionTitle from '@ui/SectionTitle'
import StickyViewAllLink from '@ui/StickyViewAllLink'
import DevNotesCard from './components/DevNotes/DevNotesCard'
import StillTimeCard from './components/StillTime/StillTimeCard'
import SnippetVaultCard from './components/SnippetVault/SnippetVaultCard'
import AnimationLab from './components/AnimationLab/AnimationLab'

const ToolsSection = () => {
  return (
    <div className="relative flex flex-col gap-4 container">
      <SectionTitle
        title="Built to Solve Real Problems"
        description="Every tool here started as a real problem during development. I built them to remove repetitive work, improve consistency, and make building interfaces faster."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 *:cursor-pointer">
          <DevNotesCard />
          <div className="hidden md:block">
            <StillTimeCard/>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 *:cursor-pointer">
          <AnimationLab />
          <SnippetVaultCard />
        </div>
      </div>

      <StickyViewAllLink to="/tools" label="View all tools" />
    </div>
  )
}

export default ToolsSection