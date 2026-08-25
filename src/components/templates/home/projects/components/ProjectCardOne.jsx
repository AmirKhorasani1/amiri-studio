import React from "react";
import { HiOutlineArrowSmRight, HiOutlineExternalLink } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    eyebrow: "Featured Project",
    title: "Project One",
    subtitle: "Project subtitle here.",
    description:
      "A short description of this project — what it does, who it's for, and what makes it worth showing.",
    stack: "React · Node.js · MongoDB",
    type: "Category",
    responsive: "Responsive",
    live: "Live Demo",
    details: "View Details",
  },
  fa: {
    eyebrow: "پروژه منتخب",
    title: "پروژه یک",
    subtitle: "زیرعنوان پروژه.",
    description:
      "توضیح کوتاهی درباره‌ی این پروژه — چیکار می‌کنه، برای کی ساخته شده، و چی خاصش می‌کنه.",
    stack: "React · Node.js · MongoDB",
    type: "دسته‌بندی",
    responsive: "ریسپانسیو",
    live: "مشاهده دمو",
    details: "جزئیات پروژه",
  },
};

const ProjectCardOne = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-5 md:gap-8 rounded-4xl bg-neutral-100 p-5 md:p-8 dark:bg-neutral-800/80 border border-white/10 md:flex-row">
      {/* Text column */}
      <div className="flex w-full flex-col space-y-4 md:space-y-6 md:w-1/2">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500">{t.eyebrow}</span>

        <div className="space-y-1">
          <h1 className="text-4xl font-[450] tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl">
            {t.title}
          </h1>
          <h2 className="text-3xl font-[450] tracking-tight text-neutral-500 dark:text-neutral-300 md:text-5xl">
            {t.subtitle}
          </h2>
        </div>

        <p className="max-w-[460px] text-sm leading-6 text-neutral-600 dark:text-neutral-400 md:text-base">
          {t.description}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span>{t.stack}</span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button className="group flex items-center gap-2 rounded-full bg-neutral-900 px-4.5 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02] active:scale-95 dark:bg-neutral-100 dark:text-neutral-950">
            <span>{t.live}</span>
            <HiOutlineExternalLink
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

          <button className="group flex items-center gap-1.5 rounded-full border border-neutral-300 px-4.5 py-3 text-sm font-medium text-neutral-700 transition-colors duration-300 hover:border-neutral-400 hover:text-neutral-900 active:scale-95 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-neutral-100">
            <span>{t.details}</span>
            <HiOutlineArrowSmRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180"
            />
          </button>
        </div>
      </div>

      {/* Image column */}
      <div className="w-full md:w-1/2">
        <img
          className="w-full rounded-3xl opacity-70"
          alt={t.title}
          loading="lazy"
          src="src/assets/images/backgroundcover1.png"
        />
      </div>
    </div>
  );
};

export default ProjectCardOne;