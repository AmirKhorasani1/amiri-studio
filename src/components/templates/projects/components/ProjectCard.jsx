import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    details: "View details",
  },
  fa: {
    details: "مشاهده جزئیات",
  },
};

const ProjectCard = ({ project }) => {
  const { language } = useLanguage();
  const locale = language === "fa" ? "fa" : "en";
  const content = project[locale];
  const t = translations[locale];
  const isRTL = locale === "fa";

  return (
    <Link
      to={project.href}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={`${t.details}: ${content.title}`}
      className="group relative flex h-[350px] w-full flex-col overflow-hidden rounded-4xl bg-neutral-200/65 transition-colors duration-300 hover:bg-neutral-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 md:h-[370px]"
    >
      <span
        className={`pointer-events-none absolute top-5 z-30 flex translate-y-1 items-center gap-1.5 rounded-full bg-black px-3 py-2 text-xs font-medium text-white opacity-0 shadow-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-white dark:text-black ${
          isRTL ? "left-5" : "right-5"
        }`}
      >
        {t.details}
        <HiOutlineArrowSmRight
          size={17}
          className={isRTL ? "rotate-180" : ""}
        />
      </span>

      <header className="relative z-10 px-6 pb-5 pt-6 text-start md:px-8 md:pb-6 md:pt-5">

        {/*
        <div className="flex items-center">
          <span className="rounded-full border border-neutral-300 bg-white/60 px-2.5 py-1 text-[10px] font-medium text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.03] dark:text-neutral-400">
            {content.category}
          </span>
        </div>
        */}

        <h2 className="mt-3 text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {content.title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400 sm:text-base">
          {content.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              dir="ltr"
              className="rounded-full border border-neutral-300/80 bg-white/50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-600 dark:border-neutral-700 dark:bg-white/[0.04] dark:text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      <div className="relative z-10 mx-6 mt-auto min-h-0 flex-1 md:mx-8">
        <div className="relative h-full overflow-hidden rounded-t-2xl border border-b-0 border-neutral-300 bg-neutral-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-focus-visible:-translate-y-1 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
          <div className="relative z-10 flex h-10 items-center border-b border-neutral-200 bg-neutral-50 px-3.5 dark:border-neutral-800 dark:bg-white/[0.04]">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            <span className="absolute left-1/2 -translate-x-1/2 truncate text-[11px] text-secondary">
              {content.category}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden">
            <img
              src={project.image}
              alt={content.imageAlt}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;