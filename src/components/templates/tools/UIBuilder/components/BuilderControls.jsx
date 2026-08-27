import React from "react";
import { useLanguage } from "@context/LanguageContext";
import ColorControls from "./ColorControls";
import TypographyControls from "./TypographyControls";
import RadiusControls from "./RadiusControls";
import ShadowControls from "./ShadowControls";
import SpacingControls from "./SpacingControls";

const translations = {
  en: { title: "CONTROLS" },
  fa: { title: "کنترل‌ها" },
};

const BuilderControls = ({ config, onUpdate }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="rounded-4xl bg-neutral-200/70 p-4 dark:bg-neutral-800/80 sm:p-5">
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>

      <div className="mt-4 flex flex-col gap-7">
        <ColorControls colors={config.colors} onUpdate={onUpdate} />
        <TypographyControls typography={config.typography} onUpdate={onUpdate} />
        <RadiusControls radius={config.radius} onUpdate={onUpdate} />
        <ShadowControls shadow={config.shadow} onUpdate={onUpdate} />
        <SpacingControls spacing={config.spacing} onUpdate={onUpdate} />
      </div>
    </section>
  );
};

export default BuilderControls;