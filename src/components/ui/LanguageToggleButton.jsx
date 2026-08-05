import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbLanguage } from "react-icons/tb";
import { HiCheck } from "react-icons/hi2";

import { useLanguage } from "@context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی" },
];

const LanguageToggleButton = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Language"
        className={`
          group flex size-10.5 items-center justify-center
          rounded-full bg-secondary border-primary
          text-neutral-500 dark:text-neutral-300 transition-all duration-300
          hover:text-neutral-900 hover:dark:text-white active:scale-95 ${className}
        `}
      >
        <TbLanguage
          size={22}
          className="transition-colors duration-300"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute left-1/2 top-full z-50 mt-2 w-36
              -translate-x-1/2 rounded-2xl border-primary
              bg-neutral-900 p-1.5 backdrop-blur-xl shadow-xl
            "
          >
            <ul className="flex flex-col gap-0.5">
              {LANGUAGES.map(({ code, label }) => (
                <li key={code}>
                  <button
                    onClick={() => handleSelect(code)}
                    className={`
                      flex w-full items-center justify-between gap-2 rounded-full
                      px-3.5 py-2 text-[13.5px] font-medium duration-200
                      ${
                        language === code
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white"
                      }
                    `}
                  >
                    <span>{label}</span>
                    {language === code && (
                      <HiCheck size={15} className="text-neutral-300" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggleButton;