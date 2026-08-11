import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { TAILWIND_COLORS } from "./data/tailwindColors";
import { useLanguage } from "@context/LanguageContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const SHADE_LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const translations = {
  en: {
    title: "ColorCraft",
    description: "The full Tailwind CSS color system, ready to copy.",
    breadcrumbHome: 'Home',
    breadcrumbTools: 'Tools',
    breadcrumbCurrent: 'ColorCraft',
    official: "Official",
    custom: "Custom",
    copied: "Copied",
    click: "Click to copy",
  },
  fa: {
    title: "کالرکرفت",
    description: "طیف کامل رنگ‌های تیلویند، آماده برای کپی.",
    breadcrumbHome: 'خانه',
    breadcrumbTools: 'ابزارها',
    breadcrumbCurrent: 'کالرکرفت',
    official: "رسمی",
    custom: "سفارشی",
    copied: "کپی شد",
    click: "برای کپی کلیک کنید",
  },
};

const readableTextColor = (hex) => {
  const v = parseInt(hex.slice(1), 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#111111" : "#f5f5f5";
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};

const Swatch = ({ hex, level, t, onCopy }) => {
  const textColor = readableTextColor(hex);

  const handleClick = useCallback(async () => {
    await copyToClipboard(hex);
    onCopy(hex);
  }, [hex, onCopy]);

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`${hex} · ${t.click}`}
      style={{ backgroundColor: hex, color: textColor }}
      className="group/swatch relative flex h-8 md:h-10 w-full items-center justify-between px-2 md:px-3 text-[10px] md:text-[12px] ring-inset ring-1 ring-transparent transition-[box-shadow] hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <span className="font-medium opacity-80">{level}</span>
      <span className="flex items-center gap-1.5 font-mono">
        <Copy
          size={11}
          className="opacity-0 transition-opacity group-hover/swatch:opacity-100"
        />
        {hex}
      </span>
    </button>
  );
};

const ColorFamilyCard = ({ family, t, onCopy }) => (
  <div className="overflow-hidden rounded-lg border-primary">
    <div className="flex items-center justify-between border-b-primary px-3 py-2">
      <div>
        <p className="text-[13px] font-semibold tracking-wide text-primary">
          {t === translations.fa ? family.fa : family.en}
        </p>
      </div>
    </div>

    <div className="flex flex-col">
      {SHADE_LEVELS.map((level) => (
        <Swatch
          key={level}
          hex={family.shades[level]}
          level={level}
          t={t}
          onCopy={onCopy}
        />
      ))}
    </div>
  </div>
);

const CopyToast = ({ hex, t }) => (
  <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
    <AnimatePresence>
      {hex && (
        <motion.div
          key={hex + Math.random()} // یک entrance جدید برای هر کپی، حتی روی رنگ تکراری
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/95 px-4 py-2 text-[13px] text-white shadow-lg shadow-black/40 backdrop-blur"
        >
          <span
            className="h-3 w-3 rounded-full border border-white/20"
            style={{ backgroundColor: hex }}
          />
          <span className="font-medium">{t.copied}</span>
          <span className="font-mono text-secondary">{hex}</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ColorCraftPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [toastHex, setToastHex] = useState(null);
  const timeoutRef = useRef(null);

  const handleCopy = useCallback((hex) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setToastHex(hex);
    timeoutRef.current = window.setTimeout(() => setToastHex(null), 1400);
  }, []);

  return (
    <div
      dir={language === "fa" ? "rtl" : "ltr"}
      className="flex flex-col gap-5 min-h-screen container py-25"
    >
      <div>
        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: '/' },
            { label: t.breadcrumbTools, to: '/tools' },
            { label: t.breadcrumbCurrent },
          ]}
        />

        <h1 className="text-[20px] font-medium text-primary md:text-[25px] tracking-tighter">
          {t.title}
        </h1>

        <p className="mt-0.5 text-[14px] leading-[1.45] text-secondary max-w-lg md:text-[16px]">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9">
        {TAILWIND_COLORS.map((family) => (
          <ColorFamilyCard
            key={family.key}
            family={family}
            t={t}
            onCopy={handleCopy}
          />
        ))}
      </div>

      <CopyToast hex={toastHex} t={t} />
    </div>
  );
};

export default ColorCraftPage;