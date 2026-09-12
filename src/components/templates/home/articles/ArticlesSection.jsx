import React, { useEffect, useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import SectionTitle from "@/components/ui/SectionTitle";
import ArticleCard from "@components/templates/articles/components/ArticleCard";
import { getPublishedArticles } from "@api/articleApi";
import StickyViewAllLink from "@/components/ui/StickyViewAllLink";

const translations = {
  en: {
    eyebrow: "Blog",
    title: "Latest articles",
    description:
      "Notes on building on the web — patterns, tools, and things I learned the hard way.",
    viewAll: "View All articles",
  },
  fa: {
    eyebrow: "بلاگ",
    title: "آخرین مقالات",
    description:
      "یادداشت‌هایی درباره‌ی توسعه‌ی وب — الگوها، ابزارها، و چیزهایی که از راه سخت یاد گرفتم.",
    viewAll: "مشاهده همه مقالات",
  },
};

const ArticlesSection = () => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedArticles({ limit: 3, page: 1 })
      .then((res) => setArticles(res.data.data))
      .catch((err) => console.error("Failed to load latest articles:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="container py-30">
      <SectionTitle title={t.title} description={t.description} />

      <div className="flex flex-col gap-4.5 md:gap-8">
        <div className="mt-10 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/5] w-full animate-pulse rounded-4xl bg-neutral-100 dark:bg-neutral-800/80"
                />
              ))
            : articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
        </div>

        <StickyViewAllLink label={t.viewAll} to="/articles" />
      </div>
    </section>
  );
};

export default ArticlesSection;
