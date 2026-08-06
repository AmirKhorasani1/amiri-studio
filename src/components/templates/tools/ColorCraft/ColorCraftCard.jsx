import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { name: "bg-neutral-400", hex: "#a3a3a3", className: "bg-neutral-400" },
  { name: "bg-neutral-500", hex: "#737373", className: "bg-neutral-500" },
  { name: "bg-neutral-600", hex: "#525252", className: "bg-neutral-600" },
  { name: "bg-neutral-700", hex: "#404040", className: "bg-neutral-700" },
  { name: "bg-neutral-800", hex: "#a3a3a3", className: "bg-neutral-800" },
];

const hexToRgb = (hex) => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
};

const ColorRow = ({ color, isOpen, onToggle, onHoverStart, onHoverEnd }) => {
  return (
    <motion.div
      layout
      onClick={onToggle}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
      className={`${color.className} relative flex h-full cursor-pointer flex-col justify-center overflow-hidden px-4 md:px-6 md:py-2.5`}
      style={{ transformOrigin: "center" }}
    >
      <div className="flex items-center justify-between py-5 text-[13px]">
        <p>{color.name}</p>
        <p>{color.hex}</p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-1 pb-4 text-[12px] md:text-[13px]">
              <div className="flex items-center justify-between">
                <span className="opacity-70">Tailwind</span>
                <span className="font-medium">{color.className}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-70">HEX</span>
                <span className="font-medium">{color.hex}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-70">RGB</span>
                <span className="font-medium">{hexToRgb(color.hex)}</span>
              </div>
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

  const toggleColor = (name) =>
    setActiveColor((prev) => (prev === name ? null : name));

  const gridTemplateRows = COLORS.map((color) =>
    color.name === activeColor || color.name === hoveredColor ? "auto" : "1fr"
  ).join(" ");

  return (
    <div className="group border border-neutral-800 rounded-lg">
      <div className="flex flex-col gap-1.5 p-6">
        <h1 className="text-[24px] md:text-[26px] font-medium">ColorCraft</h1>
        <p className="text-neutral-400 text-sm md:text-base">
          Explore color scales, gradients, and contrast before bringing your
          interface to life.
        </p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1"
        style={{ gridTemplateRows }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {COLORS.map((color) => (
          <ColorRow
            key={color.name}
            color={color}
            isOpen={activeColor === color.name || hoveredColor === color.name}
            onToggle={() => toggleColor(color.name)}
            onHoverStart={() => setHoveredColor(color.name)}
            onHoverEnd={() => setHoveredColor(null)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ColorCraftCard;