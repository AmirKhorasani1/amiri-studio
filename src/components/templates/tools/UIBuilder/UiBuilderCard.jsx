import React, { useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const translations = {
  en: {
    title: "UI Builder",
    description: "Design your own design system — colors, radius & preview.",
    action: "Explore",
    colorsLabel: "## COLORS",
    radiusLabel: "## RADIUS",
    previewLabel: "PREVIEW",
    swatches: [
      { key: "primary", label: "Primary" },
      { key: "secondary", label: "Secondary" },
      { key: "accent", label: "Accent" },
    ],
    buttons: { primary: "Primary", accent: "Accent" },
  },
  fa: {
    title: "سازنده رابط کاربری",
    description: "دیزاین‌سیستم خودت را بساز — رنگ، شعاع گوشه و پیش‌نمایش.",
    action: "مشاهده",
    colorsLabel: "## COLORS",
    radiusLabel: "## RADIUS",
    previewLabel: "PREVIEW",
    swatches: [
      { key: "primary", label: "اصلی" },
      { key: "secondary", label: "ثانویه" },
      { key: "accent", label: "تاکیدی" },
    ],
    buttons: { primary: "اصلی", accent: "تاکیدی" },
  },
};

const SWATCH_STYLES = {
  primary: "bg-black dark:bg-white",
  secondary: "bg-neutral-400 dark:bg-neutral-500",
  accent: "bg-neutral-950",
};

const SectionLabel = ({ children }) => (
  <span className="block font-mono text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
    {children}
  </span>
);

const UiBuilderCard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [radius, setRadius] = useState(14);

  return (
    <Link
      to="/tools/ui-builder"
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

      <div className="relative z-10 mx-6 flex min-h-0 flex-1 flex-col gap-3.5 pb-6 md:mx-8 md:pb-8">
        {/* Colors */}
        <div>
          <SectionLabel>{t.colorsLabel}</SectionLabel>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {t.swatches.map((swatch) => (
              <div
                key={swatch.key}
                className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-2.5 py-2 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <span
                  className={`h-4 w-4 shrink-0 rounded-full border border-black/10 dark:border-white/10 ${SWATCH_STYLES[swatch.key]}`}
                />
                <span className="truncate text-[11.5px] font-medium text-neutral-700 dark:text-neutral-300">
                  {swatch.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Radius */}
        <div>
          <div className="flex items-center justify-between">
            <SectionLabel>{t.radiusLabel}</SectionLabel>
            <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500">
              {radius}px
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={24}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            onClick={(e) => e.preventDefault()}
            className="mt-2.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 accent-black dark:bg-neutral-700 dark:accent-white"
          />
        </div>

        {/* Live preview */}
        <div className="mt-auto rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-3.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 dark:border-neutral-700 dark:bg-white/[0.02]">
          <span className="block font-mono text-[10px] font-medium tracking-wide text-neutral-400 dark:text-neutral-600">
            {t.previewLabel}
          </span>

          <div className="mt-2 flex items-center gap-2">
            <span
              style={{ borderRadius: `${radius}px` }}
              className="bg-black px-3.5 py-1.5 text-xs font-medium text-white transition-[border-radius] duration-150 dark:bg-white dark:text-black"
            >
              {t.buttons.primary}
            </span>
            <span
              style={{ borderRadius: `${radius}px` }}
              className="bg-neutral-950 px-3.5 py-1.5 text-xs font-medium text-white transition-[border-radius] duration-150"
            >
              {t.buttons.accent}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UiBuilderCard;