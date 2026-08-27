import React from "react";
import { useLanguage } from "@context/LanguageContext";
import PreviewTypography from "./PreviewTypography";
import PreviewButtons from "./PreviewButtons";
import PreviewCard from "./PreviewCard";
import PreviewInput from "./PreviewInput";

const translations = {
  en: { title: "PREVIEW" },
  fa: { title: "پیش‌نمایش" },
};

const PreviewPanel = ({ config }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="rounded-4xl bg-neutral-200/70 p-4 dark:bg-neutral-800/80 sm:p-5">
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>

      {/* Inner canvas — this is the one place that actually uses
          config.colors.background as a real background, so choosing a
          background color has a visible effect instead of being just
          another swatch. */}
      <div className="mt-4 rounded-3xl p-5 transition-colors" style={{ background: config.colors.background }}>
        <div className="flex flex-col gap-6">
          <PreviewTypography typography={config.typography} colors={config.colors} />
          <PreviewButtons colors={config.colors} radius={config.radius} shadow={config.shadow} spacing={config.spacing} />
          <PreviewCard
            colors={config.colors}
            typography={config.typography}
            radius={config.radius}
            shadow={config.shadow}
            spacing={config.spacing}
          />
          <PreviewInput colors={config.colors} radius={config.radius} spacing={config.spacing} />
        </div>
      </div>
    </section>
  );
};

export default PreviewPanel;