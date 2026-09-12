import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineArrowSmRight,
} from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import { getArticleBySlug } from "@api/articleApi";
import { getMediaUrl } from "@lib/getMediaUrl";

const translations = {
  en: {
    back: "Back to articles",
    minutes: "min read",
    notFound: "This article could not be found.",
    loading: "Loading...",
  },

  fa: {
    back: "بازگشت به مقالات",
    minutes: "دقیقه مطالعه",
    notFound: "مقاله‌ی مورد نظر پیدا نشد.",
    loading: "در حال بارگذاری...",
  },
};

const formatDate = (date, language) =>
  new Date(date).toLocaleDateString(
    language === "fa" ? "fa-IR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

/* -------------------------------------------------------------------------- */
/* Markdown Components                                                        */
/* -------------------------------------------------------------------------- */

function H1({ children }) {
  return (
    <h1 className="mb-5 mt-14 text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-3xl">
      {children}
    </h1>
  );
}

function H2({ children }) {
  return (
    <h2 className="mb-4 mt-12 text-xl font-semibold leading-8 text-neutral-900 dark:text-white">
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3 className="mb-3 mt-8 text-lg font-medium leading-7 text-neutral-900 dark:text-white">
      {children}
    </h3>
  );
}

function Paragraph({ children }) {
  return (
    <p className="mb-5 text-[15px] leading-8 text-neutral-600 dark:text-neutral-300">
      {children}
    </p>
  );
}

function Anchor({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-blue-500 underline decoration-blue-500/30 underline-offset-4 transition-colors hover:text-blue-600"
    >
      {children}
    </a>
  );
}

function Strong({ children }) {
  return (
    <strong className="font-semibold text-neutral-900 dark:text-white">
      {children}
    </strong>
  );
}

function Blockquote({ children }) {
  return (
    <blockquote className="my-8 border-r-4 border-neutral-300 pr-5 text-[15px] leading-8 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
      {children}
    </blockquote>
  );
}

function Hr() {
  return (
    <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
  );
}

function Img({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className="my-8 w-full rounded-3xl object-cover"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Lists                                                                      */
/* -------------------------------------------------------------------------- */

/*
 * نکته مهم:
 *
 * برای ol از list-decimal استفاده می‌کنیم.
 * برای ul از list-disc استفاده می‌کنیم.
 *
 * بنابراین شماره‌گذاری توسط خود HTML انجام می‌شود
 * و دیگر به props.ordered یا index وابسته نیستیم.
 */

function OrderedList({ children }) {
  return (
    <ol
      dir="rtl"
      className="mb-7 mt-5 list-decimal space-y-3 pr-7 text-[15px] leading-7 text-neutral-600 marker:font-medium marker:text-neutral-900 dark:text-neutral-300 dark:marker:text-white"
    >
      {children}
    </ol>
  );
}

function UnorderedList({ children }) {
  return (
    <ul
      dir="rtl"
      className="mb-7 mt-5 list-disc space-y-3 pr-7 text-[15px] leading-7 text-neutral-600 marker:text-neutral-400 dark:text-neutral-300 dark:marker:text-neutral-500"
    >
      {children}
    </ul>
  );
}

function ListItem({ children }) {
  return (
    <li className="ps-1 leading-7">
      {children}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Code                                                                       */
/* -------------------------------------------------------------------------- */

function CodeBlock({ inline, children }) {
  if (inline) {
    return (
      <code
        dir="ltr"
        className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
      >
        {children}
      </code>
    );
  }

  return (
    <code
      dir="ltr"
      className="block overflow-x-auto rounded-2xl bg-neutral-900 p-5 font-mono text-sm leading-7 text-neutral-100 dark:bg-neutral-950"
    >
      {children}
    </code>
  );
}

/* -------------------------------------------------------------------------- */
/* Table                                                                      */
/* -------------------------------------------------------------------------- */

function Table({ children }) {
  return (
    <div className="my-8 w-full overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <thead className="bg-neutral-100 dark:bg-neutral-800/80">
      {children}
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }) {
  return (
    <tr className="border-b border-neutral-200 last:border-b-0 dark:border-neutral-800">
      {children}
    </tr>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-4 py-3 text-start font-semibold text-neutral-900 dark:text-white">
      {children}
    </th>
  );
}

function TableCell({ children }) {
  return (
    <td className="px-4 py-3 text-start text-neutral-600 dark:text-neutral-300">
      {children}
    </td>
  );
}

/* -------------------------------------------------------------------------- */
/* Markdown Mapping                                                           */
/* -------------------------------------------------------------------------- */

const markdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,

  p: Paragraph,

  a: Anchor,

  strong: Strong,

  blockquote: Blockquote,

  hr: Hr,

  img: Img,

  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,

  code: CodeBlock,

  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

/* -------------------------------------------------------------------------- */
/* Article Detail Page                                                        */
/* -------------------------------------------------------------------------- */

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    getArticleBySlug(slug)
      .then((res) => {
        setArticle(res.data.data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  /* ------------------------------------------------------------------------ */
  /* Loading                                                                  */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400">
          {t.loading}
        </p>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Not Found                                                                */
  /* ------------------------------------------------------------------------ */

  if (notFound || !article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-neutral-500 dark:text-neutral-400">
          {t.notFound}
        </p>

        <Link
          to="/articles"
          className="text-sm font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
        >
          {t.back}
        </Link>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Page                                                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <article
      dir={isRTL ? "rtl" : "ltr"}
      lang={language}
      className="container py-20 md:py-28"
    >
      {/* Header */}
      <header className="w-full">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/articles"
            className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <HiOutlineArrowSmRight
              size={16}
              className={`transition-transform duration-300 group-hover:-translate-x-0.5 ${
                isRTL ? "rotate-180" : ""
              }`}
            />

            {t.back}
          </Link>

          {article.category && (
            <span className="inline-block w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-800/80 dark:text-neutral-300">
              {article.category}
            </span>
          )}
        </div>

        <h1 className="mb-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-400 dark:text-neutral-500">
          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendar size={16} />
              {formatDate(article.publishedAt, language)}
            </span>
          )}

          {article.readingTime && (
            <span className="flex items-center gap-1.5">
              <HiOutlineClock size={16} />

              <span dir="ltr">
                {article.readingTime} {t.minutes}
              </span>
            </span>
          )}
        </div>
      </header>

      {/* Cover */}
      <div className="mb-12 aspect-[16/9] w-full overflow-hidden rounded-4xl">
        <img
          src={getMediaUrl(article.cover)}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Markdown Content */}
      <div className="mx-auto max-w-4xl text-[15px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {article.content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap gap-2 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500 dark:bg-neutral-800/80 dark:text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default ArticleDetailPage;