import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { MAX_RENDERED_MATCHES } from "../constants/regexConstants";

const translations = {
  en: {
    title: "MATCHES",
    empty: "No matches found.",
    invalid: "Fix the pattern to see matches.",
    index: "Index",
    value: "Match",
    more: (n) => `Showing ${n} of the total matches.`,
  },
  fa: {
    title: "تطابق‌ها",
    empty: "هیچ موردی پیدا نشد.",
    invalid: "برای مشاهده Matchها الگو را اصلاح کن.",
    index: "موقعیت",
    value: "Match",
    more: (n) => `فقط ${n.toLocaleString("fa-IR")} مورد نمایش داده می‌شود.`,
  },
};

const MatchList = ({ matches = [], count = 0, isValid = true }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const visibleMatches = matches.slice(0, MAX_RENDERED_MATCHES);

  return (
    <section dir={language === "fa" ? "rtl" : "ltr"}>
      <span className="block text-xs font-medium tracking-wide text-secondary">
        {t.title}
      </span>

      {!isValid ? (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.03]">
          {t.invalid}
        </div>
      ) : visibleMatches.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.03]">
          {t.empty}
        </div>
      ) : (
        <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-white/[0.03]">
          <div className="grid grid-cols-[70px_1fr] border-b border-neutral-200 px-3.5 py-2 text-[10px] font-medium uppercase tracking-wide text-neutral-400 dark:border-neutral-800">
            <span>{t.index}</span>
            <span>{t.value}</span>
          </div>

          {visibleMatches.map((match, index) => (
            <div
              key={`${match.index}-${index}`}
              className="grid grid-cols-[70px_1fr] items-center border-b border-neutral-200 px-3.5 py-2.5 last:border-b-0 dark:border-neutral-800"
            >
              <span
                dir="ltr"
                className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500"
              >
                {match.index}
              </span>

              <code
                dir="ltr"
                className="min-w-0 truncate rounded-md bg-white px-2 py-1 font-mono text-xs text-black shadow-sm dark:bg-neutral-800 dark:text-white"
                title={match[0]}
              >
                {match[0]}
              </code>
            </div>
          ))}

          {count > MAX_RENDERED_MATCHES && (
            <div className="border-t border-dashed border-neutral-200 px-3.5 py-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
              {t.more(visibleMatches.length)}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MatchList;