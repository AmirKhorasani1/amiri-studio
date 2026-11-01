import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";
import { cn } from "../utils/regexHelpers";

const PresetCard = ({ preset, active, onSelect }) => {
  const { language } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(preset)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium cursor-pointer shrink-0 whitespace-nowrap outline-none",
        "focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30",
        !active && "hover:bg-black/5 dark:hover:bg-white/5"
      )}
    >
      {active && (
        <motion.span
          layoutId="activePresetPill"
          className="absolute inset-0 rounded-full bg-black dark:bg-white"
          transition={{ type: "spring", stiffness: 500, damping: 50 }}
        />
      )}

      <img
        className={cn(
          "relative z-10 transition-[filter,opacity] duration-200",
          active ? "invert-0 dark:invert" : "invert dark:invert-0 opacity-50"
        )}
        width={19}
        height={19}
        src={preset.icon}
        alt=""
      />

      <span
        className={cn(
          "relative z-10 transition-colors duration-200",
          active ? "text-white dark:text-black" : "text-black/50 dark:text-neutral-400/90"
        )}
      >
        {preset.name[language]}
      </span>
    </motion.button>
  );
};

export default PresetCard;