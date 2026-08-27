import React from "react";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    title: "TYPOGRAPHY",
    heading: "The quick brown fox",
    body: "Jumps over the lazy dog. Body text uses this size and weight everywhere.",
  },
  fa: {
    title: "تایپوگرافی",
    heading: "روباه قهوه‌ای چابک",
    body: "از روی سگ تنبل می‌پرد. متن بدنه در همه‌جای رابط کاربری از همین اندازه و وزن استفاده می‌کند.",
  },
};

const PreviewTypography = ({ typography, colors }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>
      <div className="mt-3 flex flex-col gap-2" style={{ fontFamily: typography.fontFamily }}>
        <h2
          style={{
            fontSize: `${typography.headingSize}px`,
            fontWeight: typography.headingWeight,
            color: colors.text,
            lineHeight: 1.15,
          }}
        >
          {t.heading}
        </h2>
        <p style={{ fontSize: `${typography.bodySize}px`, fontWeight: typography.bodyWeight, color: colors.secondary }}>
          {t.body}
        </p>
      </div>
    </div>
  );
};

export default PreviewTypography;