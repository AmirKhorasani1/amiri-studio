import { useState } from "react";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";

const SWATCHES = [
  {
    name: "Neutral 100",
    hex: "#f5f5f5",
    className: "bg-neutral-100",
  },
  {
    name: "Neutral 300",
    hex: "#d4d4d4",
    className: "bg-neutral-300",
  },
  {
    name: "Neutral 500",
    hex: "#737373",
    className: "bg-neutral-500",
  },
  {
    name: "Neutral 700",
    hex: "#404040",
    className: "bg-neutral-700",
  },
  {
    name: "Neutral 900",
    hex: "#171717",
    className: "bg-neutral-900",
  },
];

const translations = {
  en: {
    title: "ColorCraft",
    description:
      "Explore color scales, gradients, and contrast before bringing your interface to life.",
    countLabel: "colors · complete grayscale palette",
    more: "View full palette",
    moreSub: "142 more shades",
    action: "Explore",
  },
  fa: {
    title: "ColorCraft",
    description:
      "طیف‌های رنگی، گرادیان‌ها و کنتراست را پیش از پیاده‌سازی رابط کاربری بررسی کنید.",
    countLabel: "رنگ · پالت کامل خاکستری",
    more: "مشاهده پالت کامل",
    moreSub: "۱۴۲ طیف دیگر",
    action: "مشاهده",
  },
};

const SwatchCard = ({ swatch, onEnter, onLeave }) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className="flex flex-col rounded-xl border border-neutral-300 bg-white p-3.5 transition-colors dark:border-neutral-800 dark:bg-neutral-800/60"
  >
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-medium text-black dark:text-white">
        {swatch.name}
      </span>

      <span
        className={`h-7.5 w-7.5 shrink-0 rounded-2xl border border-neutral-300 dark:border-neutral-700 ${swatch.className}`}
      />
    </div>

    <span className="mt-0.5 font-mono text-[10px] text-neutral-500 dark:text-neutral-500">
      {swatch.hex}
    </span>
  </div>
);

const MoreCard = ({ t }) => (
  <div className="flex flex-col justify-center gap-1 rounded-xl border border-dashed border-neutral-300 bg-neutral-100/60 px-3.5 py-3 text-neutral-600 dark:border-neutral-700 dark:bg-white/[0.02] dark:text-neutral-300">
    <div className="flex items-center gap-1.5">
      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-400 text-[10px] leading-none dark:border-neutral-600">
        +
      </span>

      <span className="text-[12px] font-medium text-black dark:text-white">
        {t.more}
      </span>
    </div>

    <span className="text-[10px] text-neutral-500 dark:text-neutral-500">
      {t.moreSub}
    </span>
  </div>
);

const ColorCraftCard = () => {
  const [hovered, setHovered] = useState(null);
  const { language } = useLanguage();

  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <Link
      to="/tools/color-craft"
      dir={isRTL ? "rtl" : "ltr"}
      className="group relative flex h-[350px] w-full flex-col overflow-hidden rounded-4xl bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300 md:h-[370px]"
    >
      <span
        className={`pointer-events-none absolute top-5 z-30 flex items-center gap-1.5 rounded-full bg-black px-3 py-2 text-xs font-medium text-white opacity-0 shadow-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-white dark:text-black ${
          isRTL ? "left-5" : "right-5"
        }`}
      >
        {t.action}

        <HiOutlineArrowSmRight
          size={17}
          className={isRTL ? "rotate-180" : ""}
          aria-hidden="true"
        />
      </span>

      <div className="flex flex-col p-6 text-left rtl:text-right md:p-8">
        <h1 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {t.title}
        </h1>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          {t.description}
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-between gap-4 px-6 md:flex-row md:items-center md:gap-8 md:px-8">
        <div className="hidden shrink-0 flex-col md:flex">
          <span className="text-[64px] font-semibold leading-none tracking-tight text-black dark:text-white lg:text-[72px]">
            147+
          </span>

          <span className="mt-3 text-[13px] text-neutral-500 dark:text-neutral-500">
            {t.countLabel}
          </span>
        </div>

        <div className="grid w-full flex-1 grid-cols-2 gap-3 self-center md:grid-cols-3">
          {SWATCHES.map((swatch) => (
            <SwatchCard
              key={swatch.name}
              swatch={swatch}
              onEnter={() => setHovered(swatch.name)}
              onLeave={() => setHovered(null)}
            />
          ))}

          <MoreCard t={t} />
        </div>
      </div>
    </Link>
  );
};

export default ColorCraftCard;