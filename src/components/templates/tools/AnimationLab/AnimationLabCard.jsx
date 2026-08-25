import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const EASINGS = [
  {
    id: "linear",
    label: "LINEAR",
    ease: "linear",
    note: {
      en: "Constant speed, no acceleration.",
      fa: "سرعت ثابت، بدون شتاب.",
    },
  },
  {
    id: "ease-out",
    label: "EASE-OUT",
    ease: "easeOut",
    note: {
      en: "Starts fast, settles gently.",
      fa: "شروع سریع، پایان نرم.",
    },
  },
  {
    id: "ease-in-out",
    label: "EASE-IN-OUT",
    ease: "easeInOut",
    note: {
      en: "Eases in, eases out both ends.",
      fa: "شروع و پایان نرم و تدریجی.",
    },
  },
];

const translations = {
  en: {
    title: "Animation Lab",
    description:
      "Preview easing, timing, and motion for smoother interfaces.",
    panelLabel: "Curves",
    badge: "Live",
    action: "Explore",
  },
  fa: {
    title: "آزمایشگاه انیمیشن",
    description:
      "پیش‌نمایش منحنی‌های حرکت، زمان‌بندی و انیمیشن برای ساخت رابط‌های روان‌تر.",
    panelLabel: "منحنی‌های حرکت",
    badge: "زنده",
    action: "مشاهده",
  },
};

const boxSize = 13;

const EasingBlock = ({ item, language }) => (
  <div className="relative">
    <span className="block font-mono text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
      ## {item.label}
    </span>

    <p className="mt-1.5 text-[13.5px] leading-snug text-neutral-700 dark:text-neutral-300">
      {item.note[language]}
    </p>

    <div className="relative mt-2.5 h-4">
      <div className="absolute left-0.5 right-0.5 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-neutral-300 dark:border-neutral-700" />

      <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950" />

      <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950" />

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white"
        style={{
          height: boxSize,
          width: boxSize,
        }}
        animate={{
          left: [0, `calc(100% - ${boxSize}px)`],
        }}
        transition={{
          duration: 1.6,
          ease: item.ease,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 0.35,
        }}
      />
    </div>
  </div>
);

const AnimationLabCard = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Link
      to="/tools/animation-lab"
      dir={language === "fa" ? "rtl" : "ltr"}
      className="group relative flex h-[350px] w-full flex-col overflow-hidden rounded-4xl bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300 md:h-[370px]"
    >
      <span
        className={`pointer-events-none absolute top-5 z-30 flex items-center gap-1.5 rounded-full bg-black px-3 py-2 text-xs font-medium text-white opacity-0 shadow-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-white dark:text-black ${
          language === "fa" ? "left-5" : "right-5"
        }`}
      >
        {t.action}

        <HiOutlineArrowSmRight
          size={17}
          className={language === "fa" ? "rotate-180" : ""}
        />
      </span>

      <header className="relative z-10 p-6 text-start md:p-8">
        <h1 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {t.title}
        </h1>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          {t.description}
        </p>
      </header>

      <div className="relative z-10 mx-6 mt-auto min-h-0 flex-1 px-0 md:mx-8">
        <div className="flex w-full flex-col overflow-hidden rounded-t-2xl border border-b-0 border-neutral-300 bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="relative flex h-10 shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3.5 dark:border-neutral-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-neutral-400 dark:text-neutral-500">
              {t.panelLabel}
            </span>

            <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-medium text-white dark:bg-white dark:text-black">
              {t.badge}
            </span>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-6 md:p-4">
            {EASINGS.map((item) => (
              <EasingBlock
                key={item.id}
                item={item}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimationLabCard;