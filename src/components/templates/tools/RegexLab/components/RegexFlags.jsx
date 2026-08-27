import React, { useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import { AVAILABLE_FLAGS } from "../constants/regexConstants";
import { cn, isFlagActive, toggleFlag } from "../utils/regexHelpers";

const translations = {
  en: {
    label: "FLAGS",
  },
  fa: {
    label: "تنظیمات",
  },
};
const RegexFlags = ({ flags, onChange }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [hoveredFlag, setHoveredFlag] = useState(null);

  const hovered = AVAILABLE_FLAGS.find((f) => f.id === hoveredFlag);

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">
        {t.label}
      </span>

      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        {AVAILABLE_FLAGS.map((flag) => {
          const active = isFlagActive(flags, flag.id);
          return (
            <button
              key={flag.id}
              type="button"
              onMouseEnter={() => setHoveredFlag(flag.id)}
              onMouseLeave={() => setHoveredFlag(null)}
              onClick={() => onChange(toggleFlag(flags, flag.id))}
              aria-pressed={active}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-medium transition-colors",
                active
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-neutral-300 text-neutral-400 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-500 dark:hover:border-neutral-600"
              )}
            >
              {flag.id}
            </button>
          );
        })}
      </div>

      <p className="mt-1.5 min-h-[1rem] text-xs text-neutral-500 dark:text-neutral-500">
        {hovered ? hovered.label[language] : ""}
      </p>
    </div>
  );
};

export default RegexFlags;