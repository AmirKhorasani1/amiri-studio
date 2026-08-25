import { useRef } from "react";
import { useLanguage } from "@context/LanguageContext";

const LanguageToggleButton = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const wrapperRef = useRef(null);

  const handleToggle = () => {
    const nextLang = language === "en" ? "fa" : "en";
    setLanguage(nextLang);
  };

  const nextLanguageLabel = language === "en" ? "FA" : "EN";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={handleToggle}
        aria-label="Toggle Language"
        className={`
          group flex h-10.5 px-3 items-center justify-center gap-1.5
          rounded-full bg-secondary border-primary
          text-neutral-500 dark:text-neutral-300 transition-all duration-300
          hover:text-neutral-900 hover:dark:text-white active:scale-95 ${className}
        `}
      >
        <span className="text-xs font-semibold tracking-wider">
          {nextLanguageLabel}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggleButton;