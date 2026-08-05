import React from "react";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    title: "Snippet Vault",
    description:
      "Discover reusable snippets and copy production-ready code.",
  },
  fa: {
    title: "کدهای آماده",
    description:
      "قطعه‌کدهای آماده را پیدا کنید و با یک کلیک از آن‌ها استفاده کنید.",
  },
};

const SnippetVaultCard = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="group relative h-[270px] w-full overflow-hidden rounded-lg border border-[#303030]">
      {/* Text */}
      <div className="absolute bottom-44 md:bottom-6 z-10 left-6 text-left rtl:left-6 rtl:text-right leading-[1.05]">
        <h1
          className="text-[20px] font-medium text-white md:text-[25px] tracking-tighter"
        >
          {t.title}
        </h1>

        <p className="mt-1.5 text-[14px] leading-[1.45] text-[#adadad] max-w-80 md:text-[16px]">
          {t.description}
        </p>
      </div>

      {/* Terminal */}
      <div
        dir="ltr"
        className="
          absolute -bottom-5 right-0 md:top-8 w-[64%]
          origin-bottom-right rounded-tl-xl border border-[#262626]
          bg-[#101010] p-3 font-mono text-[11.5px] leading-[1.6]
          text-[#f5f5f5] transition-transform duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:-rotate-2
          sm:w-[47%] sm:p-4 md:text-[15px] md:leading-[1.75]
        "
      >
        <p>
          <span className="mr-2 text-[#42d1f5]">✓</span>
          React
        </p>

        <p className="mb-4 text-sm text-neutral-400">
          const [theme, setTheme] = useState("dark");
        </p>

        <p className="hidden md:block">
          <span className="mr-2 text-[#ffffff]">✓</span>
          Next.js
        </p>

        <p className="hidden md:block mb-4 text-sm text-neutral-400">
          <pre>
            {`export const metadata = {
  title: "Portfolio",
};`}
          </pre>
        </p>

        <p>
          <span className="mr-2 text-[#48f39d]">✓</span>
          Tailwind
        </p>

        <p className="mb-4 text-sm text-neutral-400">
          className="rounded-xl bg-zinc-900 p-6"
        </p>
      </div>
    </div>
  );
};

export default SnippetVaultCard;