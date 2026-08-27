import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { RADIUS_PRESETS, SHADOW_PRESETS, SPACING_PRESETS } from "../constants/uiBuilderConstants";

const translations = {
  en: { title: "BUTTONS", primary: "Primary", secondary: "Secondary", accent: "Accent" },
  fa: { title: "دکمه‌ها", primary: "اصلی", secondary: "ثانویه", accent: "تاکیدی" },
};

const PreviewButtons = ({ colors, radius, shadow, spacing }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const scale = SPACING_PRESETS[spacing];

  const baseStyle = {
    borderRadius: RADIUS_PRESETS[radius],
    boxShadow: SHADOW_PRESETS[shadow],
    padding: `${0.65 * scale}rem ${1.25 * scale}rem`,
    fontSize: "14px",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
  };

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button type="button" style={{ ...baseStyle, background: colors.primary, color: colors.background }}>
          {t.primary}
        </button>
        <button
          type="button"
          style={{
            ...baseStyle,
            background: colors.surface,
            color: colors.text,
            boxShadow: "none",
            border: `1px solid ${colors.secondary}33`,
          }}
        >
          {t.secondary}
        </button>
        <button type="button" style={{ ...baseStyle, background: colors.accent, color: "#ffffff" }}>
          {t.accent}
        </button>
      </div>
    </div>
  );
};

export default PreviewButtons;