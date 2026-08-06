import React from "react";

const TypeScaleCard = () => {
  return (
    <div className="group flex h-[290px] flex-col overflow-hidden rounded-lg border border-neutral-800 duration-300 md:h-full">
      <div className="flex flex-col gap-1.5 p-6">
        <h1 className="text-[24px] font-medium text-black dark:text-white md:text-[26px]">
          TypeScale
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-400 md:text-base">
          Experiment with font sizes, weights, and spacing to build consistent typography.
        </p>
      </div>

      {/* flex-1 fills remaining space, overflow-hidden clips any oversized letters */}
      <div className="relative flex-1 overflow-hidden -mb-8.5">
        <div className="absolute inset-0 flex items-end justify-center gap-3 leading-none *:font-medium *:duration-100 *:hover:font-extrabold">
          <p className="z-4 text-[220px] text-neutral-600 md:text-[200px]">A</p>
          <p className="z-3 -ml-11.5 text-[220px] text-neutral-500 md:text-[200px]">M</p>
          <p className="z-4 -ml-13 text-[219px] text-neutral-400 md:hidden">i</p>
          <p className="-ml-14 text-[220px] text-neutral-50 md:hidden">R</p>
          <p className="hidden text-[200px] text-white md:block">X</p>
          <p className="hidden text-[200px] text-white md:block">T</p>
        </div>
      </div>
    </div>
  );
};

export default TypeScaleCard;