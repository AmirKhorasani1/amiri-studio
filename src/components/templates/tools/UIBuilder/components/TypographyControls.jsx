import React from "react";
import { useLanguage } from "@context/LanguageContext";
import PresetChipGroup from "./PresetChipGroup";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../constants/uiBuilderConstants";

const translations = {
  en: {
    title: "TYPOGRAPHY",
    font: "Font",
    heading: "Heading size",
    body: "Body size",
    weight: "Heading weight",
  },
  fa: {
    title: "تایپوگرافی",
    font: "فونت",
    heading: "اندازه تیتر",
    body: "اندازه متن",
    weight: "وزن تیتر",
  },
};

const RangeRow = ({ label, value, min, max, unit = "px", onChange }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between">
      <span className="text-xs text-neutral-500 dark:text-neutral-400">{label}</span>
      <span dir="ltr" className="text-xs tabular-nums text-black dark:text-white">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="ui-range h-[2px] w-full cursor-pointer appearance-none rounded-full bg-neutral-300 accent-black dark:bg-neutral-700 dark:accent-white"
    />
  </div>
);

const TypographyControls = ({ typography, onUpdate }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <span className="block text-xs font-medium tracking-wide text-secondary">{t.title}</span>

      <div className="mt-3 flex flex-col gap-4">
        <div>
          <span className="mb-1.5 block text-xs text-neutral-500 dark:text-neutral-400">{t.font}</span>
          <PresetChipGroup
            options={FONT_OPTIONS.map((f) => ({ id: f }))}
            value={typography.fontFamily}
            onChange={(id) => onUpdate("typography.fontFamily", id)}
            renderLabel={(o) => o.id}
          />
        </div>

        <RangeRow
          label={t.heading}
          value={typography.headingSize}
          min={24}
          max={72}
          onChange={(v) => onUpdate("typography.headingSize", v)}
        />

        <RangeRow
          label={t.body}
          value={typography.bodySize}
          min={12}
          max={20}
          onChange={(v) => onUpdate("typography.bodySize", v)}
        />

        <div>
          <span className="mb-1.5 block text-xs text-neutral-500 dark:text-neutral-400">{t.weight}</span>
          <PresetChipGroup
            options={WEIGHT_OPTIONS.map((w) => ({ id: w }))}
            value={typography.headingWeight}
            onChange={(id) => onUpdate("typography.headingWeight", id)}
            renderLabel={(o) => o.id}
          />
        </div>
      </div>
    </div>
  );
};

export default TypographyControls;