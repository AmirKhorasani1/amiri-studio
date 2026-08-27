import React from "react";
import PresetCard from "./PresetCard";

const PresetList = ({ presets, selectedPresetId, onSelect }) => {
  return (
    <section>
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            active={preset.id === selectedPresetId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default PresetList;