import React from "react";
import { useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import { cn } from "../utils/regexHelpers";

const translations = {
  en: {
    label: "PATTERN",
    placeholder: "Type a pattern…",
    copy: "Copy",
    copied: "Copied",
  },
  fa: {
    label: "الگو",
    placeholder: "یک الگوی Regex وارد کنید…",
    copy: "کپی",
    copied: "کپی شد",
  },
};

const RegexEditor = ({ pattern, onChange, isValid }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!pattern) return;

    try {
      await navigator.clipboard.writeText(pattern);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">
        {t.label}
      </span>

      <div
        dir="ltr"
        className={cn(
          "mt-1.5 flex items-center gap-1.5 rounded-full border bg-neutral-50 px-3 py-2.5 transition-colors dark:bg-white/[0.03]",
          isValid
            ? "border-neutral-200 focus-within:border-neutral-400 dark:border-neutral-700 dark:focus-within:border-neutral-500"
            : "border-neutral-400 dark:border-neutral-400"
        )}
      >
        <span className="select-none font-mono text-[13.5px] text-neutral-400 dark:text-neutral-600">
          /
        </span>

        <input
          type="text"
          value={pattern}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full bg-transparent font-mono text-[13.5px] text-black outline-none placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-600"
        />

        <span className="select-none font-mono text-[13.5px] text-neutral-400 dark:text-neutral-600">
          /
        </span>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!pattern}
          className="shrink-0 rounded-full bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:bg-neutral-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </div>
  );
};

export default RegexEditor;