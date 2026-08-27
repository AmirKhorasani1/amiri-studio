import React from "react";
import { useLanguage } from "@context/LanguageContext";
import UIBuilderHeader from "./components/UIBuilderHeader";
import BuilderControls from "./components/BuilderControls";
import PreviewPanel from "./components/PreviewPanel";
import ExportBar from "./components/ExportBar";
import useUIBuilder from "./hooks/useUIBuilder";

const UIBuilderPage = () => {
  const { language } = useLanguage();
  const isRTL = language === "fa";
  const { config, updateConfig, resetConfig, cssOutput, jsonOutput } = useUIBuilder();

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className="container py-30">
      <style>{`
        .ui-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px; height: 12px; border-radius: 9999px;
          background: #000; cursor: pointer;
          box-shadow: 0 0 0 3px #fff, 0 0 0 4px #e5e5e5;
        }
        .dark .ui-range::-webkit-slider-thumb {
          background: #fff;
          box-shadow: 0 0 0 3px #000, 0 0 0 4px #262626;
        }
        .ui-range::-moz-range-thumb {
          width: 12px; height: 12px; border-radius: 9999px;
          background: #000; border: none; cursor: pointer;
        }
        .dark .ui-range::-moz-range-thumb { background: #fff; }
      `}</style>

      <UIBuilderHeader />

      <div className="mt-4.5 grid gap-4.5 lg:grid-cols-2">
        <BuilderControls config={config} onUpdate={updateConfig} />
        <PreviewPanel config={config} />
      </div>

      <div className="mt-4.5">
        <ExportBar onReset={resetConfig} cssOutput={cssOutput} jsonOutput={jsonOutput} />
      </div>
    </main>
  );
};

export default UIBuilderPage;