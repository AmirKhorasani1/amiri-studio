import React from "react";
import { SiTicktick } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";

const OktaIcon = () => (
  <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      {Array.from({ length: 12 }).map((_, index) => (
        <line
          key={index}
          x1="16"
          y1="2.5"
          x2="16"
          y2="8"
          transform={`rotate(${index * 30} 16 16)`}
        />
      ))}
    </g>
  </svg>
);

const noteTypesByLang = {
  en: [
    { label: "Done", Icon: SiTicktick, done: true },
    { label: "In progress", Icon: OktaIcon, done: false },
    { label: "Cancelled", Icon: MdOutlineCancel, done: false },
  ],
  fa: [
    { label: "انجام‌شده", Icon: SiTicktick, done: true },
    { label: "در حال انجام", Icon: OktaIcon, done: false },
    { label: "لغو شده", Icon: MdOutlineCancel, done: false },
  ],
};

const translations = {
  en: {
    title: "Dev Notes",
    description:
      "Capture ideas, organize tasks, and keep notes in one workspace.",
  },
  fa: {
    title: "دفترچه یادداشت توسعه",
    description:
      "ایده‌ها، وظایف و یادداشت‌ها را در یک فضای کاری مدیریت کنید.",
  },
};

const pillLayout = [
  { type: 0, left: 10, top: "0%" },
  { type: 1, left: 117, top: "0%" },
  { type: 2, left: 275, top: "0%" },

  { type: 2, left: -45, top: "14.4%" },
  { type: 1, left: 95, top: "14.4%" },
  { type: 0, left: 255, top: "14.4%" },

  { type: 2, left: -10, top: "28.8%" },
  { type: 1, left: 130, top: "28.8%" },
  { type: 0, left: 290, top: "28.8%" },

  { type: 0, left: -20, top: "43.2%" },
  { type: 2, left: 90, top: "43.2%" },
  { type: 1, left: 230, top: "43.2%" },

  { type: 1, left: 9, top: "57.6%" },
  { type: 0, left: 168, top: "57.6%" },
  { type: 2, left: 277, top: "57.6%" },

  { type: 2, left: -36, top: "72%" },
  { type: 1, left: 107, top: "72%" },
  { type: 0, left: 270, top: "72%" },

  { type: 0, left: -60, top: "86.4%" },
  { type: 2, left: 55, top: "86.4%" },
  { type: 1, left: 200, top: "86.4%" },
];

const DevNotesCard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const noteTypes = noteTypesByLang[language];

  return (
    <Link
      to="/tools/dev-notes"
      className="
        group relative h-[270px] w-full overflow-hidden rounded-lg
        border-primary p-6
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        hover:shadow-[0_22px_60px_rgba(0,0,0,0.7)]
        md:h-full
      "
    >
      {/* Soft card glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.035) 38%, transparent 72%)",
        }}
      />

      <header className="relative z-10 max-w-[330px] text-left rtl:text-right leading-[1.05]">
        <h1
          className="text-[20px] font-medium text-black dark:text-white md:text-[25px] tracking-tighter"
        >
          {t.title}
        </h1>

        <p className="mt-1.5 text-sm md:text-base leading-[1.55] text-neutral-600 dark:text-neutral-400 md:text-[16px]">
          {t.description}
        </p>
      </header>

      {/* این بخش عمداً همیشه LTR نگه داشته می‌شود تا موزاییک pillها
          مستقل از زبان صفحه ثابت بماند. متن فارسی داخل هر pill با
          dir="auto" جدا مدیریت می‌شود و درست نمایش داده می‌شود. */}
      <div
        aria-label="DevNotes categories"
        dir="ltr"
        className="absolute inset-x-0 bottom-0 top-[165px] z-10 overflow-hidden"
      >
        {pillLayout.map((pill, index) => {
          const { label, Icon, done } = noteTypes[pill.type];

          return (
            <div
              key={`${label}-${index}`}
              dir="ltr"
              className={[
                "absolute flex h-[42px] items-center gap-2.5 whitespace-nowrap rounded-full px-3.5",
                "transition-all duration-300 ease-out",
                "group-hover:scale-[1.035]",
                done
                  ? "border border-white bg-white font-medium text-black shadow-[0_8px_24px_rgba(255,255,255,0.16)] hover:bg-[#e7e7e7] hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)]"
                  : "border border-[#282828] bg-[#050505] text-[#9d9d9d] group-hover:border-[#464545] group-hover:bg-[#0b0b0b] group-hover:text-[#e5e5e5] group-hover:shadow-[0_12px_26px_rgba(0,0,0,0.5)]",
              ].join(" ")}
              style={{
                width: "max-content",
                left: pill.left,
                top: pill.top,
              }}
            >
              <Icon />
              <span className="text-[15px]" dir="auto">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-15 bg-gradient-to-t from-neutral-100 dark:from-[#030303] to-transparent" />
    </Link>
  );
};

export default DevNotesCard;