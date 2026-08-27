import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { cn } from "../utils/regexHelpers";

const translations = {
  en: {
    match: "MATCH",
    noMatch: "NO MATCH",
    invalid: "INVALID REGEX",
    matchCount: (n) => (n === 1 ? "1 match found" : `${n} matches found`),
    noMatchHint: "No matches found",
    invalidHint: "Nothing to show",
  },
  fa: {
    match: "تطابق دارد",
    noMatch: "تطابق ندارد",
    invalid: "عبارت باقاعده نامعتبر",
    matchCount: (n) => `${n.toLocaleString("fa-IR")} تطابق پیدا شد`,
    noMatchHint: "هیچ تطابقی پیدا نشد",
    invalidHint: "موردی برای نمایش وجود ندارد",
  },
};

const MatchResult = ({ isValid, error, count }) => {
  const { language } = useLanguage();
  const t = translations[language];

  let status = "match";
  if (!isValid) status = "invalid";
  else if (count === 0) status = "noMatch";

  const config = {
    match: {
      icon: "✓",
      title: t.match,
      hint: t.matchCount(count),
      tone: "solid",
    },
    noMatch: {
      icon: "×",
      title: t.noMatch,
      hint: t.noMatchHint,
      tone: "muted",
    },
    invalid: {
      icon: "!",
      title: t.invalid,
      hint: error || t.invalidHint,
      tone: "muted",
    },
  }[status];

  return (
    <div className="flex items-start gap-2.5 border-t border-dashed border-neutral-200 pt-3.5 dark:border-neutral-700">
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
          config.tone === "solid"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "border border-neutral-300 text-neutral-400 dark:border-neutral-600 dark:text-neutral-500"
        )}
      >
        {config.icon}
      </span>

      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-black dark:text-white">
          {config.title}
        </p>
        <p
          dir={status === "invalid" ? "ltr" : undefined}
          className="truncate text-[13px] text-neutral-500 dark:text-neutral-500"
        >
          {config.hint}
        </p>
      </div>
    </div>
  );
};

export default MatchResult;