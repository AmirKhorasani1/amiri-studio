import React from "react";
import { motion } from "framer-motion";

const EASINGS = [
  {
    id: "linear",
    label: "linear",
    color: "#22d3ee",
    ease: "linear",
    path: "M5 43 L43 5",
  },
  {
    id: "ease-out",
    label: "ease-out",
    color: "#c084fc",
    ease: "easeOut",
    path: "M5 43 C 5 12, 30 5, 43 5",
  },
  {
    id: "ease-in-out",
    label: "ease-in-out",
    color: "#f472b6",
    ease: "easeInOut",
    path: "M5 43 C 5 43, 16 43, 24 24 C 32 5, 43 5, 43 5",
  },
  {
    id: "ease-in",
    label: "ease-in",
    color: "#818cf8",
    ease: "easeIn",
    path: "M5 43 C 24 43, 38 24, 43 5",
  },
];

const CurveIcon = ({ path }) => (
  <svg viewBox="0 0 32 32" fill="none" className="h-4 w-4">
    <path
      d={path}
      stroke="#e5e5e5"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EasingRow = ({ label, ease, path }) => {
  const boxSize = 14;

  return (
    <div className="flex items-center gap-2">
      {/* آیکون منحنی */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#101010]">
        <CurveIcon path={path} />
      </div>

      {/* لیبل */}
      <span className="w-[62px] shrink-0 font-mono text-[9px] tracking-tight text-neutral-400">
        {label}
      </span>

      {/* مسیر و باکس متحرک */}
      <div className="relative h-4 flex-1">
        <div className="absolute left-0.5 right-0.5 top-1/2 h-px -translate-y-1/2 bg-neutral-700" />
        <span className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full border border-neutral-500 bg-neutral-800" />

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full bg-neutral-100"
          style={{
            height: boxSize,
            width: boxSize,
            boxShadow: "0 0 8px rgba(255,255,255,0.45)",
          }}
          animate={{ left: [0, `calc(100% - ${boxSize}px)`] }}
          transition={{
            duration: 1.6,
            ease,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.4,
          }}
        />
      </div>
    </div>
  );
};

const AnimationLabCard = () => {
  return (
    <div className="group relative isolate h-[290px] w-full overflow-hidden rounded-lg border border-[#292929] sm:h-[280px]">
      {/* Rainbow glow — only visible on card hover */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-[54px] top-[30px] z-0
          h-[360px] w-[150px] rounded-full blur-[42px]
          opacity-0 transition-opacity duration-700
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:opacity-60
        "
        style={{
          background:
              "linear-gradient(120deg, #FCF400, #47E6A4, #05DBED, #007EFC, #E0E0E0,)",
        }}
      />

      {/* Left content */}
      <div className="absolute bottom-43 left-5 z-10 max-w-[320px] md:bottom-6 md:left-6">
        <h1 className="text-[22px] font-medium tracking-[-0.05em] text-white sm:text-[26px] md:text-[27px]">
          AnimationLab
        </h1>

        <p className="mt-1 max-w-60 text-[14px] leading-[1.45] text-[#a3a3a3] sm:text-[16px]">
          Capture ideas, organize tasks, and keep development notes in one
          simple workspace.
        </p>
      </div>

      {/* Passport visual → دموی خاکستری easing، روی موبایل به پایین کارت می‌چسبد */}
      <div
        className="
          absolute -bottom-1 right-[6%] z-10 w-[64%]
          rounded-tl-xl rounded-tr-xl border border-b-0 border-[#262626]
          bg-[#101010]
          md:bottom-0 md:top-12 md:w-[40.5%]
        "
      >
        <div className="flex h-auto flex-col justify-center gap-4 px-4 py-5 md:h-full md:gap-6 md:px-5 md:py-0">
          {EASINGS.map((item, index) => (
            <div
              key={item.id}
              className={index < 3 ? "block" : "hidden md:block"}
            >
              <EasingRow {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimationLabCard;