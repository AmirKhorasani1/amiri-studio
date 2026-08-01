import SectionTitle from '@/components/ui/SectionTitle'
import React from 'react'
import TableCard from "./TableCard"
import StickyViewAllLink from '@ui/StickyViewAllLink'

const ProjectsSection = () => {
  return (
    <div className="relative flex flex-col gap-15 md:gap-20 container mt-25">

      <div className="flex flex-col">
        <SectionTitle title="Platform for modern fitness coaches and their clients" />
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-0 md:gap-25 mt-12">

          <div className="relative w-full h-[200px] md:h-auto flex justify-center md:justify-start md:flex">
            {/* باکس عقبی */}
            <div
              className="
                absolute top-12 left-0 w-[65%] h-[130px]
                md:static md:top-auto md:left-auto
                md:w-[500px] md:mt-20 md:h-105
                bg-black border-x border-t border-[#303030] rounded-t-xl
              "
            />
            {/* باکس جلویی */}
            <div
              className="
                absolute top-0 right-0 w-[70%] h-[175px] z-1
                md:static md:top-auto md:right-auto md:z-auto
                md:-ml-40 md:w-xl md:h-130
                bg-black border-x border-t border-[#303030] rounded-t-xl
              "
            />

            {/* سایه/گلو */}
            <div
              className="
                pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 -z-10
                h-25 rounded-full bg-neutral-700 blur-[60px]
                md:top-[-80px] md:left-0 md:translate-x-0
                w-full md:h-80 md:bg-neutral-900/70 md:blur-[80px]
              "
            />

            {/* گرادیانت محو کننده پایین */}
            <div
              className="
                pointer-events-none absolute inset-x-0 bottom-0 h-20 z-10
                bg-gradient-to-t from-black via-black/95 to-transparent
                md:h-50
              "
            />
          </div>

          <div>
            <h3 className="text-2xl text-neutral-400 tracking-tighter">
              <span className="text-white"> An all-in-one ecosystem </span> that simplifies coaching, client management.
            </h3>

            <TableCard />
          </div>
        </div>
      </div>

      <div>
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-0 md:gap-25 mt-12">

          <div>
            <h3 className="text-2xl text-neutral-400 tracking-tighter">
              <span className="text-white"> An all-in-one ecosystem </span> that simplifies coaching, client management.
            </h3>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 sm:w-auto">
                Start Deploying
              </button>
              <button className="w-full rounded-full border border-neutral-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 sm:w-auto">
                Get a Demo
              </button>
            </div>
          </div>

          <div className="relative flex flex-col w-full md:w-auto">
            <SectionTitle title="Platform for modern fitness coaches and their clients" />
            <div className="w-full max-w-full md:max-w-none md:w-[900px] mt-12 h-60 md:h-140 bg-black border-x border-t border-[#303030] rounded-t-xl" />

            <div className="pointer-events-none absolute top-35 left-1/2 -translate-x-1/2 -z-10 w-full h-32 rounded-full bg-neutral-700 blur-[60px] md:top-0 md:left-0 md:translate-x-0 md:h-80 md:bg-neutral-900/70 md:blur-[80px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-22 bg-gradient-to-t from-black via-black/95 to-transparent md:h-50" />
          </div>
        </div>
      </div>

      <StickyViewAllLink to="/projects" label="View all projects" />
    </div>
  )
}

export default ProjectsSection