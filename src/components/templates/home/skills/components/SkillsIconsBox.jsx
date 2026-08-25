import { useEffect, useState } from "react";
import { FaHtml5, FaReact } from "react-icons/fa";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";
import { motion } from "framer-motion";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
};

const VERTICAL_SPECTRUMS = [
  "linear-gradient(180deg,transparent,rgba(59,130,246,.9),rgba(236,72,153,.9),transparent)",
  "linear-gradient(180deg,transparent,rgba(34,197,94,.9),rgba(250,204,21,.9),transparent)",
  "linear-gradient(180deg,transparent,rgba(139,92,246,.9),rgba(59,130,246,.9),transparent)",
  "linear-gradient(180deg,transparent,rgba(249,115,22,.9),rgba(236,72,153,.9),transparent)",
  "linear-gradient(180deg,transparent,rgba(6,182,212,.9),rgba(168,85,247,.9),transparent)",
  "linear-gradient(180deg,transparent,rgba(244,63,94,.9),rgba(250,204,21,.9),transparent)",
  "linear-gradient(180deg,transparent,rgba(16,185,129,.9),rgba(59,130,246,.9),transparent)",
];

const randomLineStreak = () => ({
  key: `${Date.now()}-${Math.random()}`,
  direction: Math.random() > 0.5 ? "ttb" : "btt",
  duration: 1 + Math.random() * 1.4,
  holdDelay: Math.random() * 2.5,
  gradient:
    VERTICAL_SPECTRUMS[
      Math.floor(Math.random() * VERTICAL_SPECTRUMS.length)
    ],
});

const DividerLine = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [streak, setStreak] = useState(randomLineStreak);
  const isTtb = streak.direction === "ttb";

  return (
    <div className="relative h-full w-px overflow-hidden bg-neutral-300 dark:bg-neutral-900">
      {!reducedMotion && (
        <motion.div
          key={streak.key}
          className="absolute left-0 h-1/3 w-full"
          style={{ background: streak.gradient, filter: "blur(.5px)" }}
          initial={{ top: isTtb ? "-40%" : "110%", opacity: 0 }}
          animate={{
            top: isTtb ? "110%" : "-40%",
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            top: { duration: streak.duration, ease: "easeInOut" },
            opacity: {
              duration: streak.duration,
              times: [0, 0.15, 0.85, 1],
              ease: "easeInOut",
            },
          }}
          onAnimationComplete={() =>
            setTimeout(
              () => setStreak(randomLineStreak()),
              streak.holdDelay * 1000
            )
          }
        />
      )}
    </div>
  );
};

const SkillsIconsBox = () => {
  const icons = [
    { id: 1, Icon: FaHtml5, iconSize: 45, label: "HTML5", anim: "group-hover:-rotate-12" },
    { id: 2, Icon: RiTailwindCssFill, iconSize: 52, label: "Tailwind", anim: "group-hover:-rotate-35" },
    { id: 3, Icon: RiJavascriptFill, iconSize: 53, label: "JavaScript", anim: "group-hover:rotate-15 group-hover:scale-110" },
    { id: 4, Icon: FaReact, iconSize: 43, label: "React", anim: "group-hover:rotate-[360deg] duration-700" },
    { id: 5, Icon: SiNextdotjs, iconSize: 45, label: "Next.js", anim: "group-hover:scale-115" },
    { id: 6, Icon: BiLogoTypescript, iconSize: 52, label: "TypeScript", anim: "group-hover:scale-115 group-hover:-rotate-8" },
    { id: 7, Icon: TbBrandRedux, iconSize: 45, label: "Redux", anim: "group-hover:rotate-120" },
  ];

  return (
    <div className="relative flex h-[290px] w-full items-center justify-center md:h-auto md:min-h-full md:w-1/2">
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex justify-evenly"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom,transparent,black 15%,black 70%,transparent)",
          maskImage:
            "linear-gradient(to bottom,transparent,black 15%,black 70%,transparent)",
        }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <DividerLine key={i} />
        ))}
      </div>

      {/* Always LTR: keeps overlap + z-index identical in FA and EN */}
      <div
        dir="ltr"
        className="relative isolate flex items-center justify-center"
      >
        {icons.map(({ id, Icon, iconSize, label, anim }) => (
          <div
            key={id}
            style={{ zIndex: id }}
            tabIndex={0}
            className="group relative -ml-2.5 flex h-15 w-15 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-neutral-300 bg-white outline-none transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] first:ml-0 hover:z-[999] hover:-translate-y-4 hover:scale-[1.15] hover:border-neutral-400/30 hover:bg-[#141414] hover:shadow-[0_15px_40px_rgba(100,100,100,.45)] focus-visible:z-[999] focus-visible:-translate-y-4 focus-visible:scale-[1.15] focus-visible:ring-2 focus-visible:ring-black/30 dark:border-neutral-800 dark:bg-neutral-950 dark:focus-visible:ring-white/40 sm:-ml-3.5 md:-ml-5 md:h-24.5 md:w-24.5 md:rounded-3xl"
          >
            <Icon
              aria-hidden="true"
              focusable="false"
              size={iconSize}
              className={`!h-7 !w-7 text-black transition-all duration-500 ease-out group-hover:text-white group-focus-visible:text-white dark:text-white md:!h-[var(--icon-size)] md:!w-[var(--icon-size)] ${anim}`}
              style={{ "--icon-size": `${iconSize}px` }}
            />

            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-300 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-neutral-600 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:-bottom-8 group-hover:opacity-100 group-focus-visible:-bottom-8 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-black/80 dark:text-neutral-300">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsIconsBox;