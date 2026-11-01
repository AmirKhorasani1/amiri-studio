import React from "react";
import PresetCard from "./PresetCard";

const PresetList = ({ presets, selectedPresetId, onSelect }) => {
  return (
    <section>
      <div className="w-full lg:w-fit mt-3 flex border border-neutral-200 dark:border-neutral-800 p-1 rounded-full overflow-x-auto hide-scrollbar">
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