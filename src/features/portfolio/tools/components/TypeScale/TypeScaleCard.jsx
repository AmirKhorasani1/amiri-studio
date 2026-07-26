import React from 'react'

const TypeScaleCard = () => {
  return (
    <div className="group border border-neutral-800 rounded-lg duration-300">
      <div className="flex flex-col gap-2 p-4 md:p-6">
        <h1 className="text-sm md:text-[27px] font-medium text-black dark:text-white">TypeScale</h1>
        <p className="text-neutral-700 text-[11px] md:text-[13px] dark:text-neutral-400">
          Experiment with font sizes, weights, and spacing to build consistent typography.
        </p>
      </div>
      <div className="leading-48">
        <div className="flex items-end justify-center gap-3 *:text-white *:text-[200px] *:hover:font-extrabold *:duration-100">
          <p>A</p>
          <p>E</p>
        </div>
        <div className="flex items-end justify-center gap-3 *:text-white *:text-[200px] *:hover:font-extrabold *:duration-100">
          <p>X</p>
          <p>T</p>
        </div>
      </div>
    </div>
  )
}

export default TypeScaleCard