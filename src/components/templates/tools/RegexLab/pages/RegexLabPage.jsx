import React, { useMemo, useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import RegexHeader from "../components/RegexHeader";
import PresetList from "../components/PresetList";
import RegexEditor from "../components/RegexEditor";
import RegexFlags from "../components/RegexFlags";
import TestInput from "../components/TestInput";
import MatchResult from "../components/MatchResult";
import RegexExplanation from "../components/RegexExplanation";
import MatchList from "../components/MatchList";
import { REGEX_PRESETS, MAX_TEST_LENGTH } from "../constants/regexConstants";
import { testRegex } from "../utils/regexHelpers";

const translations = {
  en: {
    playground: "PLAYGROUND",
    analysis: "ANALYSIS",
  },
  fa: {
    playground: "محیط تست",
    analysis: "تحلیل",
  },
};

const RegexLabPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "fa";

  const defaultPreset = REGEX_PRESETS[0];

  const [pattern, setPattern] = useState(defaultPreset?.pattern ?? "");
  const [flags, setFlags] = useState(defaultPreset?.flags ?? "");
  const [testValue, setTestValue] = useState(
    defaultPreset?.examples?.[0]?.value ?? ""
  );
  const [selectedPresetId, setSelectedPresetId] = useState(
    defaultPreset?.id ?? null
  );

  const selectedPreset = useMemo(
    () => REGEX_PRESETS.find((preset) => preset.id === selectedPresetId),
    [selectedPresetId]
  );

  const result = useMemo(
    () => testRegex(pattern, flags, testValue),
    [pattern, flags, testValue]
  );

  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    setPattern(preset.pattern);
    setFlags(preset.flags);
    setTestValue(preset.examples?.[0]?.value ?? "");
  };

  const handlePatternChange = (value) => {
    setPattern(value);
    setSelectedPresetId(null);
  };

  const handleFlagsChange = (value) => {
    setFlags(value);
    setSelectedPresetId(null);
  };

  const handleTestValueChange = (value) => {
    setTestValue(value.slice(0, MAX_TEST_LENGTH));
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className="container py-22 md:py-30">
      <RegexHeader />

      <div className="mt-8">
        <PresetList
          presets={REGEX_PRESETS}
          selectedPresetId={selectedPresetId}
          onSelect={handlePresetSelect}
        />
      </div>

      <div className="mt-4.5 grid gap-4.5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
        <section className="rounded-4xl p-5 md:p-7 bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300">
          <div className="flex flex-col gap-5">
            <RegexEditor
              pattern={pattern}
              onChange={handlePatternChange}
              isValid={result.valid}
            />

            <RegexFlags flags={flags} onChange={handleFlagsChange} />

            <TestInput
              value={testValue}
              onChange={handleTestValueChange}
              examples={selectedPreset?.examples ?? []}
            />

            <MatchResult
              isValid={result.valid}
              error={result.error}
              count={result.count}
            />
          </div>
        </section>

        <section className="rounded-4xl bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300 p-5 md:p-7">
          <div className="flex flex-col gap-6">
            <RegexExplanation pattern={pattern} />

            <MatchList
              matches={result.matches}
              count={result.count}
              isValid={result.valid}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegexLabPage;