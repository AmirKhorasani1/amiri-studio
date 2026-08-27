import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { cn } from "../utils/regexHelpers";

const PresetCard = ({ preset, active, onSelect }) => {
  const { language } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => onSelect(preset)}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
      )}
    >
      <img className={`${active ? "invert-0 dark:invert" : "invert dark:invert-0"}`} width={21} height={21} src={preset.icon} />
      <span>{preset.name[language]}</span>
    </button>
  );
};

export default PresetCard;