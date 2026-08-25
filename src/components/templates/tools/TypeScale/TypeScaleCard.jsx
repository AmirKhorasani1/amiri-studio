import { useLanguage } from "@context/LanguageContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const SIZE_TICKS = [12, 16, 24, 40, 64];
const SIZE_MIN = 12;
const SIZE_MAX = 72;

const WEIGHTS = [
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semibold" },
  { value: 700, label: "Bold" },
];

const translations = {
  en: {
    title: "TypeScale",
    description:
      "Adjust type size and weight to preview a balanced type scale in real time.",
    sample: "Aa",
    sizeLabel: "Font size",
    weightLabel: "Weight",
    unit: "px",
    action: "Explore",
  },
  fa: {
    title: "TypeScale",
    description:
      "اندازه و وزن متن را تغییر دهید و مقیاس تایپوگرافی را به‌صورت زنده بررسی کنید.",
    sample: "آب",
    sizeLabel: "اندازه متن",
    weightLabel: "وزن فونت",
    unit: "px",
    action: "مشاهده",
  },
};

const FontScaleCard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === "fa";

  const [size, setSize] = useState(28);
  const [weight, setWeight] = useState(600);

  return (
    <Link
      to="/tools/font-scale"
      dir={isRtl ? "rtl" : "ltr"}
      className="group relative flex h-[370px] w-full flex-col overflow-hidden rounded-4xl bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300"
    >
      <span
        className={`pointer-events-none absolute top-5 z-30 flex items-center gap-1.5 rounded-full bg-black px-3 py-2 text-xs font-medium text-white opacity-0 shadow-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-white dark:text-black ${
          isRtl ? "left-5" : "right-5"
        }`}
      >
        {t.action}

        <HiOutlineArrowSmRight
          size={17}
          className={isRtl ? "rotate-180" : ""}
          aria-hidden="true"
        />
      </span>

      <div className="flex flex-col p-8 text-left rtl:text-right">
        <h1 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {t.title}
        </h1>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          {t.description}
        </p>
      </div>

      <div className="relative z-10 m-8 mt-0 min-h-0 flex-1 px-0">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex h-14 shrink-0 items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
            <span
              className="text-black transition-all duration-150 dark:text-white"
              style={{
                fontSize: `${size}px`,
                fontWeight: weight,
                lineHeight: 1,
              }}
            >
              {t.sample}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 p-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-500">
                  {t.sizeLabel}
                </span>

                <span className="text-[11px] font-semibold text-black dark:text-white">
                  {size} {t.unit}
                </span>
              </div>

              <input
                type="range"
                min={SIZE_MIN}
                max={SIZE_MAX}
                step={1}
                value={size}
                onClick={(e) => e.preventDefault()}
                onChange={(e) => setSize(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-black dark:bg-neutral-700 dark:accent-white"
                style={{
                  background: `linear-gradient(to ${
                    isRtl ? "left" : "right"
                  }, currentColor ${
                    ((size - SIZE_MIN) / (SIZE_MAX - SIZE_MIN)) * 100
                  }%, transparent 0%)`,
                }}
              />
            </div>

            <div>
              <span className="mb-2 block text-[11px] font-medium text-neutral-500 dark:text-neutral-500">
                {t.weightLabel}
              </span>

              <div className="grid grid-cols-4 gap-1.5">
                {WEIGHTS.map((w) => (
                  <button
                    key={w.value}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setWeight(w.value);
                    }}
                    className={`flex items-center justify-between rounded-lg px-3 py-1 text-[11px] transition-colors ${
                      weight === w.value
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-white/10 dark:text-neutral-500 dark:hover:bg-white/15"
                    }`}
                  >
                    <span className="text-[10px]">{w.label}</span>
                    <span style={{ fontWeight: w.value }}>{w.value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FontScaleCard;