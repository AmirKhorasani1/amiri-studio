import React from 'react';
import { FaHtml5, FaReact } from "react-icons/fa";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";

const SkillsIconsBox = () => {
  const icons = [
    {
      id: 1,
      zIndex: 1,
      Icon: FaHtml5,
      iconSize: 45,
      customAnim: "group-hover:-rotate-12",
    },
    {
      id: 2,
      zIndex: 2,
      Icon: RiTailwindCssFill,
      iconSize: 52,
      customAnim: "group-hover:-rotate-35",
    },
    {
      id: 3,
      zIndex: 3,
      Icon: RiJavascriptFill,
      iconSize: 53,
      customAnim: "group-hover:rotate-15 group-hover:scale-110",
    },
    {
      id: 4,
      zIndex: 4,
      Icon: FaReact,
      iconSize: 43,
      customAnim: "group-hover:rotate-[360deg] duration-700",
    },
    {
      id: 5,
      zIndex: 5,
      Icon: SiNextdotjs,
      iconSize: 45,
      customAnim: "group-hover:scale-115",
    },
    {
      id: 6,
      zIndex: 6,
      Icon: BiLogoTypescript,
      iconSize: 52,
      customAnim: "group-hover:scale-115 group-hover:-rotate-8",
    },
    {
      id: 7,
      zIndex: 7,
      Icon: TbBrandRedux,
      iconSize: 45,
      customAnim: "group-hover:rotate-120",
    },
  ];

  return (
    <div className="w-full md:w-1/2 relative h-[220px] md:h-[500px] flex items-center justify-center">
      
      <div 
        className="absolute inset-0 flex justify-evenly pointer-events-none -z-10"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 70%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 70%, transparent)'
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-neutral-900"></div>
        ))}
      </div>

      <div className="relative flex items-center justify-center">
        {icons.map((item) => (
          <div
            key={item.id}
            style={{ zIndex: item.zIndex }}
            className="group relative flex items-center justify-center 
              w-15 h-15 md:w-24.5 md:h-24.5
              bg-neutral-950 border border-neutral-800 rounded-xl md:rounded-3xl cursor-pointer 
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
              hover:-translate-y-4 hover:scale-[1.15] hover:z-[999] 
              hover:shadow-[0_15px_40px_rgba(100,100,100,0.45)] hover:bg-[#141414] hover:border-neutral-400/30 
              -ml-2.5 sm:-ml-3.5 md:-ml-5 first:ml-0"
          >
            <item.Icon 
              size={item.iconSize} 
              className={`text-white transition-all duration-500 ease-out group-hover:text-white 
                !w-7 !h-7 md:!w-[var(--icon-size)] md:!h-[var(--icon-size)] ${item.customAnim}`} 
              style={{ '--icon-size': `${item.iconSize}px` }}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default SkillsIconsBox;