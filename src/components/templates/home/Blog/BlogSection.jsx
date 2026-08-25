import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import SectionTitle from "@/components/ui/SectionTitle";

const translations = {
  en: {
    eyebrow: "Blog",
    title: "Latest articles",
    description: "Notes on building on the web — patterns, tools, and things I learned the hard way.",
    readMore: "Continue reading",
    posts: [
      {
        slug: "designing-with-restraint",
        title: "Designing with restraint",
        excerpt: "Why the best interfaces are the ones you barely notice, and how to get there without stripping out all the personality.",
        date: "May 12, 2025",
        image: "https://picsum.photos/seed/blog-restraint/640/420",
      },
      {
        slug: "state-management-2025",
        title: "State management in 2025",
        excerpt: "A practical look at when you actually need a global store, and when local state and context are simply enough.",
        date: "Apr 28, 2025",
        image: "https://picsum.photos/seed/blog-state/640/420",
      },
      {
        slug: "animations-that-earn-their-keep",
        title: "Animations that earn their keep",
        excerpt: "Motion should clarify, not decorate. A few rules I follow before adding any transition to a real interface.",
        date: "Apr 09, 2025",
        image: "https://picsum.photos/seed/blog-motion/640/420",
      },
    ],
  },
  fa: {
    eyebrow: "بلاگ",
    title: "آخرین مقالات",
    description: "یادداشت‌هایی درباره‌ی توسعه‌ی وب — الگوها، ابزارها، و چیزهایی که از راه سخت یاد گرفتم.",
    readMore: "ادامه مطلب",
    posts: [
      {
        slug: "designing-with-restraint",
        title: "طراحی با خویشتن‌داری",
        excerpt: "چرا بهترین رابط‌های کاربری اونایی هستن که به‌سختی متوجه‌شون می‌شی، و چطور بدون از دست دادن شخصیت طراحی به اونجا برسیم.",
        date: "۲۲ اردیبهشت ۱۴۰۴",
        image: "https://picsum.photos/seed/blog-restraint/640/420",
      },
      {
        slug: "state-management-2025",
        title: "مدیریت state در سال ۲۰۲۵",
        excerpt: "یه نگاه کاربردی به اینکه واقعاً کِی به یه استور سراسری نیاز داری، و کِی state محلی و context کاملاً کافیه.",
        date: "۸ اردیبهشت ۱۴۰۴",
        image: "https://picsum.photos/seed/blog-state/640/420",
      },
      {
        slug: "animations-that-earn-their-keep",
        title: "انیمیشن‌هایی که واقعاً لازمن",
        excerpt: "حرکت باید چیزی رو واضح‌تر کنه، نه فقط تزئین باشه. چند قانونی که قبل از اضافه‌کردن هر ترنزیشن رعایت می‌کنم.",
        date: "۲۰ فروردین ۱۴۰۴",
        image: "https://picsum.photos/seed/blog-motion/640/420",
      },
    ],
  },
};

const BlogCard = ({ post, readMore, isRTL }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group flex flex-col overflow-hidden rounded-4xl gap-5 md:gap-6 p-5 md:p-6 bg-neutral-100 transition-all duration-300 dark:bg-neutral-800/80 dark:hover:border-neutral-700"
  >
    <div className="aspect-[16/10] w-full overflow-hidden">
      <img
        src="src/assets/images/backgroundcover1.png"
        alt={post.title}
        loading="lazy"
        className="h-full w-full object-cover rounded-3xl transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col gap-2">
      <h3 className="text-[17px] font-medium leading-snug tracking-tight text-neutral-900 dark:text-white">
        {post.title}
      </h3>

      <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">{post.date}</span>

        <span className="flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {readMore}
          <HiOutlineArrowSmRight
            size={16}
            className={[
              "transition-transform duration-300 group-hover:translate-x-0.5",
              isRTL ? "rotate-180 group-hover:-translate-x-0.5" : "",
            ].join(" ")}
          />
        </span>
      </div>
    </div>
  </Link>
);

const BlogSection = () => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="container py-37">
      <SectionTitle 
        title={t.title}
        description={t.description}
      />

      <div className="mt-10 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
        {t.posts.map((post) => (
          <BlogCard key={post.slug} post={post} readMore={t.readMore} isRTL={isRTL} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;