import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const FLAGS = ["g", "i", "m", "s"];
const ACTIVE_FLAGS = ["g", "i"];

const translations = {
  en: {
    title: "Regex Lab",
    description: "Test and debug regular expressions, explore different patterns, and see matches in real time.",
    panelLabel: "regex.test",
    badge: "Live",
    action: "Explore",
    patternLabel: "## PATTERN",
    flagsLabel: "## FLAGS",
    testLabel: "## TEST STRING",
    resultLabel: "## RESULT",
    testValue: "09121234567",
    matchStatus: "MATCH",
    matchCount: "1 match found",
  },
  fa: {
    back: "ابزارها",
    title: "آزمایش Regex",
    description: "عبارت‌های باقاعده را تست و دیباگ کنید، الگوهای مختلف را بررسی کنید و تطابق‌ها را به‌صورت زنده مشاهده کنید.",
    panelLabel: "آزمایش عبارت",
    badge: "زنده",
    action: "کاوش",
    patternLabel: "## الگو",
    flagsLabel: "## پرچم‌ها",
    testLabel: "## متن آزمایشی",
    resultLabel: "## نتیجه",
    testValue: "09121234567",
    matchStatus: "تطابق دارد",
    matchCount: "۱ مورد پیدا شد",
  },
};

const SectionLabel = ({ children }) => (
  <span className="block font-mono text-[9px] font-medium tracking-wide text-neutral-500 dark:text-neutral-500 sm:text-[10px]">
    {children}
  </span>
);

const RegexLabCard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <Link
      to="/tools/regex-lab"
      dir={isRTL ? "rtl" : "ltr"}
      className="
        group relative flex h-[350px] w-full flex-col
        overflow-hidden rounded-4xl
        bg-neutral-200/65
        transition-colors duration-300
        hover:bg-neutral-200/80
        dark:bg-neutral-800/80
        dark:hover:bg-neutral-800/90
        md:h-[370px]
      "
    >
      {/* Explore */}
      <span
        className={`
          pointer-events-none absolute top-5 z-30
          flex items-center gap-1.5
          rounded-full bg-black px-3 py-2
          text-xs font-medium text-white
          shadow-sm
          opacity-0
          transition-all duration-300
          group-hover:pointer-events-auto
          group-hover:translate-y-0
          group-hover:opacity-100
          dark:bg-white dark:text-black
          ${isRTL ? "left-5 translate-y-1" : "right-5 translate-y-1"}
        `}
      >
        {t.action}

        <HiOutlineArrowSmRight
          size={17}
          className={isRTL ? "rotate-180" : ""}
        />
      </span>

      {/* Header */}
      <header className="relative z-10 shrink-0 px-6 pb-5 pt-6 md:px-8 md:pb-6 md:pt-8">
        <h1 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {t.title}
        </h1>

        <p className="mt-1 max-w-[520px] text-sm leading-6 text-neutral-600 dark:text-neutral-400 sm:text-base">
          {t.description}
        </p>
      </header>

      {/* Preview */}
      <div className="relative z-10 min-h-0 flex-1 px-6 md:px-8">
        <div
          className="
            relative flex h-full w-full flex-col
            overflow-hidden rounded-t-2xl
            border border-b-0 border-neutral-300
            bg-white
            shadow-[0_-4px_20px_rgba(0,0,0,0.03)]
            transition-transform duration-500
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover:-translate-y-1
            dark:border-neutral-700
            dark:bg-neutral-800
            dark:shadow-none
          "
        >
          {/* Window Header */}
          <div
            className="
              relative flex h-10 shrink-0 items-center
              justify-between
              border-b border-neutral-200
              bg-neutral-50 px-3.5
              dark:border-neutral-800
              dark:bg-white/[0.03]
            "
          >
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
              {t.panelLabel}
            </span>

            <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-medium text-white dark:bg-white dark:text-black">
              {t.badge}
            </span>
          </div>

          {/* Two Column Preview */}
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-hidden p-3.5 sm:gap-4 sm:p-4 md:gap-5 md:p-5">
            {/* Left Column */}
            <div className="flex min-w-0 flex-col gap-3.5 overflow-hidden sm:gap-4">
              {/* Pattern */}
              <div className="shrink-0">
                <SectionLabel>{t.patternLabel}</SectionLabel>

                <div
                  dir="ltr"
                  className="
                    mt-1.5 flex min-h-[36px]
                    items-center overflow-hidden
                    rounded-lg
                    border border-neutral-200
                    bg-neutral-50 px-2.5
                    dark:border-neutral-700
                    dark:bg-white/[0.03]
                    sm:px-3
                  "
                >
                  <span className="truncate font-mono text-[11px] tracking-tight text-black dark:text-white sm:text-[13px]">
                    <span className="text-neutral-400">^</span>
                    09
                    <span className="text-neutral-500">\d</span>
                    {"{9}"}
                    <span className="text-neutral-400">$</span>
                  </span>

                  <motion.span
                    className="ml-0.5 h-3.5 w-px shrink-0 bg-black dark:bg-white"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </div>
              </div>

              {/* Flags */}
              <div className="shrink-0">
                <SectionLabel>{t.flagsLabel}</SectionLabel>

                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  {FLAGS.map((flag) => {
                    const active = ACTIVE_FLAGS.includes(flag);

                    return (
                      <span
                        key={flag}
                        className={`
                          flex h-6 w-6 items-center justify-center
                          rounded-md
                          font-mono text-[10px] font-medium
                          transition-colors duration-200
                          ${
                            active
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "border border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-500"
                          }
                        `}
                      >
                        {flag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Small Regex Info */}
              <div
                className="
                  mt-auto min-h-0 rounded-lg
                  border border-dashed
                  border-neutral-200
                  bg-neutral-50/70
                  p-2.5
                  dark:border-neutral-700
                  dark:bg-white/[0.02]
                "
              >
                <SectionLabel>{t.patternLabel}</SectionLabel>

                <p className="mt-1 truncate font-mono text-[10px] text-neutral-500 dark:text-neutral-500 sm:text-[11px]">
                  ^09\d{"{9}"}$
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex min-w-0 flex-col gap-3.5 overflow-hidden sm:gap-4">
              {/* Test String */}
              <div className="shrink-0">
                <SectionLabel>{t.testLabel}</SectionLabel>

                <div
                  dir="ltr"
                  className="
                    mt-1.5 flex min-h-[36px]
                    items-center overflow-hidden
                    rounded-lg
                    border border-neutral-200
                    bg-neutral-50 px-2.5
                    dark:border-neutral-700
                    dark:bg-white/[0.03]
                    sm:px-3
                  "
                >
                  <span className="truncate font-mono text-[11px] text-neutral-700 dark:text-neutral-300 sm:text-[13px]">
                    {t.testValue}
                  </span>
                </div>
              </div>

              {/* Result */}
              <div className="shrink-0">
                <SectionLabel>{t.resultLabel}</SectionLabel>

                <div
                  className="
                    mt-1.5 flex min-h-[52px]
                    items-center gap-2
                    rounded-lg
                    border border-neutral-200
                    bg-neutral-50 px-2.5
                    dark:border-neutral-700
                    dark:bg-white/[0.03]
                    sm:px-3
                  "
                >
                  <span
                    className="
                      flex h-5 w-5 shrink-0
                      items-center justify-center
                      rounded-full bg-black
                      text-[10px] font-bold text-white
                      dark:bg-white dark:text-black
                    "
                  >
                    ✓
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-black dark:text-white sm:text-[12px]">
                      {t.matchStatus}
                    </p>

                    <p className="truncate text-[10px] text-neutral-500 dark:text-neutral-500 sm:text-[11px]">
                      {t.matchCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Match Preview */}
              <div
                className="
                  mt-auto min-h-0
                  rounded-lg
                  border border-neutral-200
                  bg-neutral-50/70
                  p-2.5
                  dark:border-neutral-700
                  dark:bg-white/[0.02]
                "
              >
                <SectionLabel>{t.testLabel}</SectionLabel>

                <div
                  dir="ltr"
                  className="
                    mt-1.5 truncate
                    font-mono text-[10px]
                    text-neutral-600
                    dark:text-neutral-400
                    sm:text-[11px]
                  "
                >
                  <span className="rounded bg-black px-1.5 py-0.5 text-white dark:bg-white dark:text-black">
                    {t.testValue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Fade */}
          <div
            className="
              pointer-events-none absolute
              inset-x-0 bottom-0 z-20
              h-8
              bg-gradient-to-t
              from-white/95
              via-white/60
              to-transparent
              dark:from-neutral-800/95
              dark:via-neutral-800/60
            "
          />
        </div>
      </div>
    </Link>
  );
};

export default RegexLabCard;