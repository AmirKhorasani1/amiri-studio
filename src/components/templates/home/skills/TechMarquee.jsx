import React from "react";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";

const techs = [
  { name: "HTML", icon: <FaHtml5 />, iconClassName: "*:size-8.5" },
  { name: "CSS", icon: <FaCss3Alt />, iconClassName: "*:size-8.5" },
  { name: "Tailwind CSS", icon: <RiTailwindCssFill/>, iconClassName: "*:size-10" },
  { name: "JavaScript", icon: <RiJavascriptFill />, iconClassName: "*:size-9.5" },
  { name: "TypeScript", icon: <BiLogoTypescript />, iconClassName: "*:size-9.5" },
  { name: "React", icon: <FaReact />, iconClassName: "*:size-8.5" },
  { name: "Next.js", icon: <SiNextdotjs />, iconClassName: "*:size-8.5" },
  { name: "Redux", icon: <TbBrandRedux />, iconClassName: "*:size-9" },
];

/* ---------- Item ---------- */

const TechItem = ({ name, icon, iconClassName }) => (
  <div className="tech-item flex shrink-0 cursor-pointer flex-col items-center gap-2 px-7 transition-all duration-300 ease-out sm:flex-row sm:gap-3 sm:px-15">
    <span className={`${iconClassName} flex shrink-0 items-center justify-center transition-all duration-300`}>
      {icon}
    </span>
    <span className="whitespace-nowrap font-medium text-white transition-colors duration-300 text-2xl">
      {name}
    </span>
  </div>
);

/* ---------- Marquee ---------- */

const TechMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="marquee-track flex w-max items-center">
        <div className="flex items-center">
          {techs.map((t, i) => (
            <TechItem key={`a-${i}`} {...t} />
          ))}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {techs.map((t, i) => (
            <TechItem key={`b-${i}`} {...t} />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: tech-marquee 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .tech-item:hover {
          opacity: 1;
        }
        .tech-item:hover span:last-child {
          color: #a3a3a3; /* text-neutral-400 */
        }
        .tech-item:hover span:first-child {
          filter: grayscale(1);
          transform: scale(0.88);
        }
        @keyframes tech-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TechMarquee;