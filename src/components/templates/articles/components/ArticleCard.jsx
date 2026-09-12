import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowSmRight,
  HiOutlineCalendar,
  HiOutlineClock,
} from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import { getMediaUrl } from "@lib/getMediaUrl";

const translations = {
  en: {
    details: "Read article",
    readingTime: "min read",
  },
  fa: {
    details: "مطالعه مقاله",
    readingTime: "دقیقه مطالعه",
  },
};

const formatDate = (date, locale) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    locale === "fa" ? "fa-IR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};

const ArticleCard = ({ article }) => {
  const { language } = useLanguage();

  const locale = language === "fa" ? "fa" : "en";
  const t = translations[locale];
  const isRTL = locale === "fa";

  return (
    <Link
      to={`/articles/${article.slug}`}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={`${t.details}: ${article.title}`}
      className="group relative flex h-[430px] w-full flex-col overflow-hidden rounded-4xl bg-neutral-200/65 transition-colors duration-300 hover:bg-neutral-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 dark:focus-visible:ring-white md:h-fit"
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
        <img
          src={getMediaUrl(article.cover)}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />

        {/* Bottom fade into card background */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-10 bg-gradient-to-t from-neutral-200 via-neutral-100/40 to-transparent dark:from-[#212121] dark:via-[#21212185] dark:to-transparent" />

        {/* Read Article */}
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

        {/* Category */}
        {article.category && (
          <span
            className={`absolute top-5 z-20 rounded-full bg-black px-3 py-2 text-xs font-medium text-white shadow-sm dark:bg-white dark:text-black ${
              isRTL ? "right-5" : "left-5"
            }`}
          >
            {article.category}
          </span>
        )}
      </div>

      {/* Content */}
      <header className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-3 md:px-8 md:pb-6 md:pt-6">
        {/* Title */}
        <h2 className="line-clamp-2 text-base font-medium tracking-tight text-black dark:text-white md:text-lg">
          {article.title}
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-1.5 flex items-center justify-between gap-x-4 gap-y-2 pt-4 text-xs text-neutral-500 dark:text-neutral-400">
          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendar size={14} />

              {formatDate(article.publishedAt, locale)}
            </span>
          )}

          {article.readingTime && (
            <span className="flex items-center gap-1.5">
              <HiOutlineClock size={14} />

              <span dir="ltr">
                {article.readingTime} {t.readingTime}
              </span>
            </span>
          )}
        </div>
      </header>
    </Link>
  );
};

export default ArticleCard;