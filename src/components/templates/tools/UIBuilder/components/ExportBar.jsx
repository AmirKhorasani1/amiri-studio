import React, { useState } from "react";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: { reset: "Reset", copyCss: "Copy CSS", copied: "Copied", exportJson: "Export JSON" },
  fa: { reset: "بازنشانی", copyCss: "کپی CSS", copied: "کپی شد", exportJson: "خروجی JSON" },
};

const ActionButton = ({ children, onClick, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={
      "rounded-full px-3.5 py-2 text-xs font-medium transition-all active:scale-95 " +
      (active
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600")
    }
  >
    {children}
  </button>
);

const ExportBar = ({ onReset, cssOutput, jsonOutput }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const copy = async (text, setCopied) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ActionButton onClick={onReset}>{t.reset}</ActionButton>
      <ActionButton onClick={() => copy(cssOutput, setCopiedCss)} active={copiedCss}>
        {copiedCss ? t.copied : t.copyCss}
      </ActionButton>
      <ActionButton onClick={() => copy(jsonOutput, setCopiedJson)} active={copiedJson}>
        {copiedJson ? t.copied : t.exportJson}
      </ActionButton>
    </div>
  );
};

export default ExportBar;