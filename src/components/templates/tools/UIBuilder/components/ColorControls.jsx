import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { COLOR_FIELDS } from "../constants/uiBuilderConstants";

const translations = {
  en: { title: "COLORS" },
  fa: { title: "رنگ‌ها" },
};

const ColorRow = ({ field, value, onChange, language }) => {
  const label = field.label[language] ?? field.label.en;

  return (
    <div
      dir="ltr"
      className="flex items-center gap-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 transition-colors focus-within:border-neutral-400 dark:border-neutral-700 dark:bg-white/[0.03] dark:focus-within:border-neutral-500"
    >
      <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-full border border-neutral-300 dark:border-neutral-600">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -inset-1 cursor-pointer"
        />
      </label>

      <span className="w-20 shrink-0 truncate text-[13px] text-neutral-600 dark:text-neutral-300">
        {label}
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className="w-full bg-transparent font-mono text-[13px] text-black outline-none dark:text-white"
      />
    </div>
  );
};

const ColorControls = ({ colors, onUpdate }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {COLOR_FIELDS.map((field) => (
          <ColorRow
            key={field.id}
            field={field}
            language={language}
            value={colors[field.id]}
            onChange={(value) => onUpdate(`colors.${field.id}`, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorControls;