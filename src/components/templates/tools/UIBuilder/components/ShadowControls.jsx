import React from "react";
import { useLanguage } from "@context/LanguageContext";
import PresetChipGroup from "./PresetChipGroup";
import { SHADOW_PRESETS } from "../constants/uiBuilderConstants";

const translations = {
  en: {
    title: "SHADOWS",
    labels: { none: "None", soft: "Soft", medium: "Medium", strong: "Strong" },
  },
  fa: {
    title: "سایه‌ها",
    labels: { none: "بدون سایه", soft: "ملایم", medium: "متوسط", strong: "قوی" },
  },
};

const ShadowControls = ({ shadow, onUpdate }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const options = Object.keys(SHADOW_PRESETS).map((id) => ({ id }));

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <div className="mt-3">
        <PresetChipGroup
          options={options}
          value={shadow}
          onChange={(id) => onUpdate("shadow", id)}
          renderLabel={(o) => t.labels[o.id]}
        />
      </div>
    </div>
  );
};

export default ShadowControls;