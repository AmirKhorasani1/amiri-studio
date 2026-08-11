import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";

const COLORS = [
  { name: "bg-neutral-400", hex: "#a3a3a3", className: "bg-neutral-400" },
  { name: "bg-neutral-500", hex: "#737373", className: "bg-neutral-500" },
  { name: "bg-neutral-600", hex: "#525252", className: "bg-neutral-600" },
  { name: "bg-neutral-700", hex: "#404040", className: "bg-neutral-700" },
  { name: "bg-neutral-800", hex: "#262626", className: "bg-neutral-800" },
];

const translations = {
  en: {
    title: "ColorCraft",
    description:
      "Explore color scales, gradients, and contrast before bringing your interface to life.",
    tailwind: "Tailwind",
    hex: "HEX",
    rgb: "RGB",
  },
  fa: {
    title: "کالرکرفت",
    description:
      "طیف‌های رنگی، گرادیان‌ها و کنتراست را پیش از پیاده‌سازی رابط کاربری بررسی کنید.",
    tailwind: "Tailwind",
    hex: "هگز",
    rgb: "RGB",
  },
};

const hexToRgb = (hex) => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
};

const ColorRow = ({ color, isOpen, onToggle, onHoverStart, onHoverEnd, t }) => {
  return (
    <motion.div
      onClick={onToggle}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      animate={{ flexGrow: isOpen ? 3 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileTap={{ scale: 0.99 }}
      className={`${color.className} relative flex basis-0 cursor-pointer flex-col justify-center overflow-hidden px-4 md:px-6`}
      style={{ transformOrigin: "center" }}
    >
      <div className="flex items-center justify-between py-5 text-[13px] text-white">
        <p>{color.name}</p>
        <p>{color.hex}</p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col gap-1 pb-4 text-[12px] md:text-[13px]"
          >
            <div className="flex items-center justify-between">
              <span className="opacity-70">{t.tailwind}</span>
              <span className="font-medium">{color.className}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">{t.hex}</span>
              <span className="font-medium">{color.hex}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">{t.rgb}</span>
              <span className="font-medium">{hexToRgb(color.hex)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ColorCraftCard = () => {
  const [activeColor, setActiveColor] = useState(null);
  const [hoveredColor, setHoveredColor] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  const toggleColor = (name) =>
    setActiveColor((prev) => (prev === name ? null : name));

  return (
    <Link
      to="/tools/color-craft"
      className="group border-primary rounded-lg"
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <div className="flex flex-col gap-1.5 p-6 text-left rtl:text-right">
        <h1 className="text-[24px] md:text-[26px] font-medium">{t.title}</h1>
        <p className="text-secondary text-sm md:text-base">
          {t.description}
        </p>
      </div>

      <div className="flex h-[280px] md:h-[370px] flex-col overflow-hidden">
        {COLORS.map((color) => (
          <ColorRow
            key={color.name}
            color={color}
            t={t}
            isOpen={activeColor === color.name || hoveredColor === color.name}
            onToggle={() => toggleColor(color.name)}
            onHoverStart={() => setHoveredColor(color.name)}
            onHoverEnd={() => setHoveredColor(null)}
          />
        ))}
      </div>
    </Link>
  );
};

export default ColorCraftCard;