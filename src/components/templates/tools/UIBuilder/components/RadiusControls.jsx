import React from "react";
import { useLanguage } from "@context/LanguageContext";
import PresetChipGroup from "./PresetChipGroup";
import { RADIUS_PRESETS } from "../constants/uiBuilderConstants";

const translations = {
  en: {
    title: "RADIUS",
    labels: { sharp: "Sharp", subtle: "Subtle", rounded: "Rounded", pill: "Pill" },
  },
  fa: {
    title: "شعاع گوشه‌ها",
    labels: { sharp: "تیز", subtle: "ملایم", rounded: "گرد", pill: "کپسولی" },
  },
};

const RadiusControls = ({ radius, onUpdate }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const options = Object.keys(RADIUS_PRESETS).map((id) => ({ id }));

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <div className="mt-3">
        <PresetChipGroup
          options={options}
          value={radius}
          onChange={(id) => onUpdate("radius", id)}
          renderLabel={(o) => t.labels[o.id]}
        />
      </div>
    </div>
  );
};

export default RadiusControls;