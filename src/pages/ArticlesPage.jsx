import React, { useEffect, useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import SectionTitle from "@ui/SectionTitle";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ArticleCard from "@/components/templates/articles/components/ArticleCard";
import { getPublishedArticles } from "@api/articleApi";

const translations = {
  en: {
    title: "Selected Articles",
    description:
      "A collection of notes, experiences, and practical insights about frontend development and modern web technologies.",
    breadcrumbHome: "Home",
    breadcrumbArticles: "Articles",
    loading: "Loading articles...",
    empty: "No articles have been published yet.",
  },

  fa: {
    title: "مقالات منتخب",
    description:
      "مجموعه‌ای از یادداشت‌ها، تجربه‌ها و مطالب کاربردی درباره توسعه فرانت‌اند و تکنولوژی‌های مدرن وب.",
    breadcrumbHome: "خانه",
    breadcrumbArticles: "مقالات",
    loading: "در حال بارگذاری مقالات...",
    empty: "هنوز مقاله‌ای منتشر نشده است.",
  },
};

const ArticlesPage = () => {
  const { language } = useLanguage();

  const locale = language === "fa" ? "fa" : "en";
  const t = translations[locale];

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const res = await getPublishedArticles({
          page,
          limit: 9,
        });

        setArticles(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to load articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  return (
    <main
      dir={locale === "fa" ? "rtl" : "ltr"}
      lang={locale}
      className="container relative flex flex-col gap-8 py-35"
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <SectionTitle
            title={t.title}
            description={t.description}
          />
        </div>

        <Breadcrumb
          items={[
            {
              label: t.breadcrumbHome,
              to: "/",
            },
            {
              label: t.breadcrumbArticles,
              to: "/articles",
            },
          ]}
        />
      </div>

      {/* Articles */}
      <section
        aria-label={t.title}
        className="grid grid-cols-1 gap-4.5 md:grid-cols-3"
      >
        {loading ? (
          <div className="col-span-full flex min-h-40 items-center justify-center">
            <p className="text-sm text-neutral-500">{t.loading}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="col-span-full flex min-h-40 items-center justify-center">
            <p className="text-sm text-neutral-500">{t.empty}</p>
          </div>
        ) : (
          articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
            />
          ))
        )}
      </section>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-2"
        >
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => {
                setPage(number);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              aria-current={number === page ? "page" : undefined}
              className={`h-9 w-9 rounded-full text-sm transition-colors ${
                number === page
                  ? "bg-white text-neutral-950"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              {number}
            </button>
          ))}
        </nav>
      )}
    </main>
  );
};

export default ArticlesPage;