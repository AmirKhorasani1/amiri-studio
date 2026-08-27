import React from "react";
import { useLanguage } from "@context/LanguageContext";
import PresetChipGroup from "./PresetChipGroup";
import { SPACING_PRESETS } from "../constants/uiBuilderConstants";

const translations = {
  en: {
    title: "SPACING",
    labels: {
      compact: "Compact",
      cozy: "Cozy",
      default: "Default",
      relaxed: "Relaxed",
      spacious: "Spacious",
    },
  },
  fa: {
    title: "فاصله‌گذاری",
    labels: {
      compact: "فشرده",
      cozy: "دنج",
      default: "پیش‌فرض",
      relaxed: "آرام",
      spacious: "باز",
    },
  },
};

const SpacingControls = ({ spacing, onUpdate }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const options = Object.keys(SPACING_PRESETS).map((id) => ({ id }));

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <div className="mt-3">
        <PresetChipGroup
          options={options}
          value={spacing}
          onChange={(id) => onUpdate("spacing", id)}
          renderLabel={(o) => t.labels[o.id]}
        />
      </div>
    </div>
  );
};

export default SpacingControls;