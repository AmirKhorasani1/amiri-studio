import React from "react";

const PresetChipGroup = ({ options, value, onChange, renderLabel }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const isActive = option.id === value;
      return (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={
            "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors " +
            (isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "border border-neutral-200 text-neutral-500 hover:text-black dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white")
          }
        >
          {renderLabel(option)}
        </button>
      );
    })}
  </div>
);

export default PresetChipGroup;