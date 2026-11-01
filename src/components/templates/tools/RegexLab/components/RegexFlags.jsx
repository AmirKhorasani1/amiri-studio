import React, { useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import { AVAILABLE_FLAGS } from "../constants/regexConstants";
import { cn, isFlagActive, toggleFlag } from "../utils/regexHelpers";

const translations = {
  en: { label: "FLAGS" },
  fa: { label: "تنظیمات" },
};

const RegexFlags = ({ flags, onChange }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [hoveredFlag, setHoveredFlag] = useState(null);
  const isRTL = language === "fa";

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <span className="block text-xs font-medium tracking-wide text-secondary">
        {t.label}
      </span>

      <div className="mt-2 space-y-1">
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
                "flex w-full items-center gap-3 rounded-lg pt-2.5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
                isRTL ? "justify-start" : "justify-start"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                  active
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
                )}
              >
                {active && (
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="h-3 w-3 stroke-current"
                    strokeWidth="2"
                  >
                    <path d="M2.5 6L5 8.5L9.5 3.5" />
                  </svg>
                )}
              </span>

              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {flag.label[language]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RegexFlags;