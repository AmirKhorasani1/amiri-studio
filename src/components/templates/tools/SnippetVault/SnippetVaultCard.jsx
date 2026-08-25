import React from "react";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";

const translations = {
  en: {
    title: "Snippet Vault",
    description:
      "Discover reusable snippets and keep production-ready code within reach.",
    panelLabel: "snippets.tsx",
    badge: "Copy",
    action: "Explore",
  },
  fa: {
    title: "مخزن اسنیپت",
    description:
      "قطعه‌کدهای قابل استفاده مجدد را پیدا کنید و کدهای آماده را همیشه در دسترس داشته باشید.",
    panelLabel: "snippets.tsx",
    badge: "کپی",
    action: "مشاهده",
  },
};

const SNIPPETS = [
  {
    label: "REACT",
    code: 'const [theme, setTheme] = useState("dark");',
  },
  {
    label: "NEXT.JS",
    code: 'export const metadata = { title: "Portfolio" };',
  },
  {
    label: "TAILWIND",
    code: 'className="rounded-xl bg-zinc-900"',
  },
];

const SnippetVaultCard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <Link
      to="/tools/snippet-vault"
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

      <header className="relative z-10 p-6 text-start md:px-8 md:pt-8">
        <h1 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-[23px]">
          {t.title}
        </h1>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          {t.description}
        </p>
      </header>

      <div className="relative z-10 mx-6 mb-0 mt-auto flex justify-center md:mx-8">
        <div
          dir="ltr"
          className="flex w-full flex-col overflow-hidden rounded-t-2xl border border-b-0 border-neutral-300 bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div className="relative flex h-9 shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 dark:border-neutral-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              {t.panelLabel}
            </span>

            <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-medium text-white dark:bg-white dark:text-black">
              {t.badge}
            </span>
          </div>

          <div className="flex flex-col gap-4.5 p-6 font-mono text-[11px] leading-[1.5] md:gap-4.5 md:p-3.5 md:text-[12px]">
            {SNIPPETS.map((item) => (
              <div key={item.label}>
                <div className="mb-0.5 font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
                  ## {item.label}
                </div>

                <div className="truncate text-neutral-700 dark:text-neutral-300">
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SnippetVaultCard;