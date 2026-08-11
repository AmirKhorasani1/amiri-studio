import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";

const SCALE = [
  { label: "Caption", px: 12, weight: 400, leading: 1.4 },
  { label: "Body", px: 16, weight: 400, leading: 1.5 },
  { label: "Subtitle", px: 20, weight: 500, leading: 1.4 },
  { label: "Title", px: 28, weight: 600, leading: 1.25 },
  { label: "Display", px: 40, weight: 700, leading: 1.1 },
];

const translations = {
  en: {
    title: "TypeScale",
    description:
      "Experiment with font sizes, weights, and spacing to build consistent typography.",
    sample: "Aa Bb Cc",
    weight: "Weight",
    leading: "Line height",
    labels: {
      Caption: "Caption",
      Body: "Body",
      Subtitle: "Subtitle",
      Title: "Title",
      Display: "Display",
    },
  },
  fa: {
    title: "تایپ‌اسکیل",
    description:
      "اندازه فونت، وزن و فاصله‌گذاری را برای طراحی تایپوگرافی یکدست تجربه کنید.",
    sample: "آب پ ت ث",
    weight: "وزن",
    leading: "ارتفاع خط",
    labels: {
      Caption: "زیرنویس",
      Body: "متن",
      Subtitle: "زیرعنوان",
      Title: "عنوان",
      Display: "نمایشی",
    },
  },
};

const ScaleRow = ({ item, isActive, onEnter, onLeave, t }) => (
  <motion.div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    animate={{ flexGrow: isActive ? 2.2 : 1 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="relative flex basis-0 cursor-default items-center justify-between overflow-hidden border-t border-neutral-200 px-6 first:border-t-0 dark:border-neutral-800"
  >
    <span
      className="truncate text-black duration-200 dark:text-white"
      style={{
        fontSize: `${item.px}px`,
        fontWeight: item.weight,
        lineHeight: item.leading,
      }}
    >
      {t.sample}
    </span>

    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2 }}
          className="flex shrink-0 flex-col items-end gap-0.5 ps-4 text-end"
        >
          <span className="text-[12px] font-medium text-neutral-900 dark:text-white">
            {t.labels[item.label]}
          </span>
          <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            {item.px}px · {(item.px / 16).toFixed(2)}rem
          </span>
          <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            {t.weight} {item.weight} · {t.leading} {item.leading}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const TypeScaleCard = () => {
  const [active, setActive] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Link
      to="/tools/type-scale"
      dir={language === "fa" ? "rtl" : "ltr"}
      className="group flex h-[420px] flex-col overflow-hidden rounded-lg border-primary duration-300 md:h-full"
    >
      <div className="flex flex-col gap-1.5 p-6 text-left rtl:text-right">
        <h1 className="text-[24px] font-medium text-black dark:text-white md:text-[26px]">
          {t.title}
        </h1>
        <p className="text-sm text-secondary md:text-base">
          {t.description}
        </p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {SCALE.map((item) => (
          <ScaleRow
            key={item.label}
            item={item}
            isActive={active === item.label}
            onEnter={() => setActive(item.label)}
            onLeave={() => setActive(null)}
            t={t}
          />
        ))}
      </div>
    </Link>
  );
};

export default TypeScaleCard;