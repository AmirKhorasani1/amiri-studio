import React from "react";
import { FiCheck } from "react-icons/fi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";

const translations = {
  en: {
    title: "Dev Notes",
    description:
      "Capture ideas, track tasks, and keep development notes in one workspace.",
    progressLabel: "This sprint",
    action: "Explore",
  },
  fa: {
    title: "یادداشت‌های توسعه",
    description:
      "ایده‌ها، وظایف و یادداشت‌های توسعه را در یک فضای کاری مدیریت کنید.",
    progressLabel: "اسپرینت جاری",
    action: "مشاهده",
  },
};

const tasksByLang = {
  en: [
    { text: "Fix authentication bug", done: true },
    { text: "Write API documentation", done: false },
  ],
  fa: [
    { text: "رفع باگ احراز هویت", done: true },
    { text: "نوشتن مستندات API", done: false },
  ],
};

const DevNotesCard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const tasks = tasksByLang[language];

  const donePct = Math.round(
    (tasks.filter((task) => task.done).length / tasks.length) * 100
  );

  const isRTL = language === "fa";

  return (
    <Link
      to="/tools/dev-notes"
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

      <header className="relative z-10 p-6 text-start md:p-8">
        <h1 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {t.title}
        </h1>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          {t.description}
        </p>
      </header>

      <div className="relative z-10 mx-6 mt-0 flex-1 md:mx-8">
        <div
          className={`absolute -top-3 z-20 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 ${
            isRTL
              ? "left-2 -rotate-[3deg]"
              : "right-2 rotate-[3deg]"
          }`}
        >
          {tasks[1].text}
        </div>

        <div className="flex h-full flex-col justify-center gap-2.5 rounded-2xl border border-dashed border-neutral-300 bg-neutral-100/60 p-4 md:p-5 dark:border-neutral-700 dark:bg-white/[0.02]">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  task.done
                    ? "border-black bg-black dark:border-white dark:bg-white"
                    : "border-neutral-400 bg-transparent dark:border-neutral-600"
                }`}
              >
                {task.done && (
                  <FiCheck
                    className="h-3 w-3 text-white dark:text-black"
                    strokeWidth={3}
                  />
                )}
              </span>

              <span
                className={`truncate text-sm ${
                  task.done
                    ? "text-neutral-400 line-through dark:text-neutral-600"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-6 mb-6 mt-4 rounded-2xl border border-neutral-300 bg-white p-4 md:mx-8 md:mb-8 md:p-5 dark:border-neutral-800 dark:bg-neutral-800/60">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-700 dark:text-neutral-200">
            {t.progressLabel}
          </span>

          <span className="text-sm font-semibold text-black dark:text-white">
            {donePct}%
          </span>
        </div>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <div
            className="h-full rounded-full bg-black transition-all duration-500 dark:bg-white"
            style={{ width: `${donePct}%` }}
          />
        </div>
      </div>
    </Link>
  );
};

export default DevNotesCard;