import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { RADIUS_PRESETS, SHADOW_PRESETS, SPACING_PRESETS } from "../constants/uiBuilderConstants";

const translations = {
  en: {
    title: "CARD",
    eyebrow: "Card title",
    body: "A short description showing how body text sits inside a card at this spacing and radius.",
  },
  fa: {
    title: "کارت",
    eyebrow: "عنوان کارت",
    body: "توضیح کوتاهی که نشان می‌دهد متن بدنه داخل یک کارت با این فاصله و شعاع گوشه چه شکلی است.",
  },
};

const PreviewCard = ({ colors, typography, radius, shadow, spacing }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const scale = SPACING_PRESETS[spacing];

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <div
        className="mt-3"
        style={{
          background: colors.surface,
          borderRadius: RADIUS_PRESETS[radius],
          boxShadow: SHADOW_PRESETS[shadow],
          padding: `${1.25 * scale}rem`,
          fontFamily: typography.fontFamily,
        }}
      >
        <p style={{ color: colors.text, fontWeight: 600, fontSize: "15px", marginBottom: `${0.4 * scale}rem` }}>
          {t.eyebrow}
        </p>
        <p style={{ color: colors.secondary, fontSize: "13.5px", lineHeight: 1.6 }}>{t.body}</p>
      </div>
    </div>
  );
};

export default PreviewCard;