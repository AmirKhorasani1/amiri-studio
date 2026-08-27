import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { MAX_TEST_LENGTH } from "../constants/regexConstants";

const translations = {
  en: {
    label: "TEST STRING",
    placeholder: "Type something to test…",
    clear: "Clear",
  },
  fa: {
    label: "متن آزمایشی",
    placeholder: "متنی برای تست وارد کنید…",
    clear: "پاک کردن",
  },
};

const TestInput = ({ value, onChange, examples = [] }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="block text-xs font-medium tracking-wide text-secondary">
          {t.label}
        </span>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 rounded-full bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:bg-neutral-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {t.clear}
          </button>
        )}
      </div>

      <textarea
        dir="ltr"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_TEST_LENGTH))}
        placeholder={t.placeholder}
        rows={2}
        spellCheck={false}
        className="mt-1.5 w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 p-4 font-mono text-[13.5px] text-neutral-700 outline-none transition-colors focus:border-neutral-400 dark:border-neutral-700 dark:bg-white/[0.03] dark:text-neutral-300 dark:focus:border-neutral-500"
      />

      {examples.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {examples.map((example, index) => (
            <button
              key={`${example.value}-${index}`}
              type="button"
              onClick={() => onChange(example.value)}
              className="max-w-full truncate rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 font-mono text-[11px] text-neutral-500 transition-colors hover:border-neutral-400 hover:text-black dark:border-neutral-700 dark:bg-white/[0.03] dark:text-neutral-500 dark:hover:border-neutral-500 dark:hover:text-white"
              title={example.value}
            >
              {example.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestInput;