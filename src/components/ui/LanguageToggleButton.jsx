import { useRef } from "react";
import { useLanguage } from "@context/LanguageContext";

const LANGUAGES = {
  en: { name: "English", region: "United States" },
  fa: { name: "فارسی", region: "ایران" },
};

const GlobeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9s1.3-6.6 3.8-9z" />
  </svg>
);

const LanguageToggleButton = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const wrapperRef = useRef(null);

  const handleToggle = () => {
    setLanguage(language === "en" ? "fa" : "en");
  };

  const current = LANGUAGES[language] ?? LANGUAGES.en;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={handleToggle}
        aria-label="Toggle Language"
        className={`group flex h-10.5 items-center gap-2 rounded-full bg-neutral-100 px-4 transition-colors duration-300 border-primary dark:bg-neutral-900 cursor-pointer ${className}`}
      >
        <GlobeIcon className="h-4.5 w-4.5 shrink-0 text-neutral-900 dark:text-white" />
        <span className="text-sm font-semibold text-neutral-900 dark:text-white">{current.name}</span>
      </button>
    </div>
  );
};

export default LanguageToggleButton;