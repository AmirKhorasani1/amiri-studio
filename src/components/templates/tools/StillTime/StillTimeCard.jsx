import React, { useEffect, useState } from "react";
import { useLanguage } from "@context/LanguageContext";

const getCurrentTime = () => {
  const now = new Date();

  return [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join("");
};

const translations = {
  en: {
    title: "Still Time",
    description:
      "A distraction-free clock, timer, and stopwatch for focused work.",
  },
  fa: {
    title: "استیل‌تایم",
    description:
      "ساعت، تایمر و کرنومتر برای کار متمرکز، بدون حواس‌پرتی.",
  },
};

const StillTimeCard = () => {
  const [time, setTime] = useState(getCurrentTime);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="group relative w-full h-[270px] md:h-full overflow-hidden rounded-lg border-primary">
      {/* Header */}
      <div className="absolute left-6 right-6 top-6 z-10 flex items-start justify-between rtl:flex-row-reverse">
        <div className="text-left rtl:text-right">
          <h1
            className="text-[20px] font-medium text-black dark:text-white md:text-[25px] tracking-tighter leading-[1.05]"
          >
            {t.title}
          </h1>

          <p className="mt-1.5 text-sm md:text-base leading-[1.45] text-neutral-600 dark:text-neutral-400 md:text-[16px]">
            {t.description}
          </p>
        </div>
      </div>

      {/* Live clock */}
      <time
        dateTime={new Date().toISOString()}
        aria-label={`Current time: ${time.slice(0, 2)}:${time.slice(2)}`}
        className="absolute inset-x-0 bottom-0 top-[120px] grid grid-cols-4"
      >
        {time.split("").map((digit, index) => (
          <div
            key={`${index}-${digit}`}
            className="relative overflow-hidden border-r-2 border-transparent"
          >
            <span
              className={[
                "absolute left-1/2 -translate-x-1/2 scale-x-[0.9] duration-300 group-hover:scale-101 group-hover:text-neutral-500 text-neutral-400 dark:text-neutral-600",
                "whitespace-nowrap text-[240px] md:text-[390px] font-bold leading-[0.76]",
                index % 2 === 0 ? "top-0 md:top-[70px]" : "top-0 md:top-[150px]",
              ].join(" ")}
            >
              {digit}
            </span>
          </div>
        ))}
      </time>
    </div>
  );
};

export default StillTimeCard;