import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { RADIUS_PRESETS, SPACING_PRESETS } from "../constants/uiBuilderConstants";

const translations = {
  en: { title: "INPUT", placeholder: "Type something…" },
  fa: { title: "ورودی", placeholder: "چیزی بنویسید…" },
};

const PreviewInput = ({ colors, radius, spacing }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const scale = SPACING_PRESETS[spacing];

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <input
        type="text"
        placeholder={t.placeholder}
        style={{
          marginTop: "0.75rem",
          width: "100%",
          borderRadius: RADIUS_PRESETS[radius],
          padding: `${0.65 * scale}rem ${1 * scale}rem`,
          background: colors.surface,
          color: colors.text,
          border: `1px solid ${colors.secondary}44`,
          fontSize: "13.5px",
          outline: "none",
        }}
      />
    </div>
  );
};

export default PreviewInput;