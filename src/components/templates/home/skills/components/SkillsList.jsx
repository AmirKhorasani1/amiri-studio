import React from "react";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    title: "Engineering Modern Interfaces",
    description:
      "Building modern web applications from the logic behind them to the interfaces people interact with.",
    
    listItems: [
      {
        id: "01",
        text: (
          <>
            Building scalable frontend systems with{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              clean architecture
            </strong>
            .
          </>
        ),
      },
      {
        id: "02",
        text: (
          <>
            Designing predictable state and data flows with{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              clear, maintainable logic
            </strong>
            .
          </>
        ),
      },
      {
        id: "03",
        text: (
          <>
            Turning complex requirements into{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              responsive, intuitive interfaces
            </strong>
            .
          </>
        ),
      },
      {
        id: "04",
        text: (
          <>
            Building fast, reliable applications with{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              efficient data and API flows
            </strong>
            .
          </>
        ),
      },
      {
        id: "05",
        text: (
          <>
            Creating reusable components and{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              production-ready frontend systems
            </strong>
            .
          </>
        ),
      },
    ],
  },

  fa: {
    title: "مهندسی رابط‌های مدرن",
    description:
      "توسعه اپلیکیشن‌های وب مدرن؛ از منطق و معماری پشت محصول تا رابطی که کاربر با آن تعامل دارد.",

    listItems: [
      {
        id: "۰۱",
        text: (
          <>
            ساخت سیستم‌های فرانت‌اند مقیاس‌پذیر با{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              معماری تمیز و اصولی
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۲",
        text: (
          <>
            طراحی State و جریان داده قابل پیش‌بینی با{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              منطق شفاف و قابل نگهداری
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۳",
        text: (
          <>
            تبدیل نیازهای پیچیده به{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              رابط‌های واکنش‌گرا و قابل استفاده
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۴",
        text: (
          <>
            ساخت اپلیکیشن‌های سریع و پایدار با{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              جریان بهینه داده و API
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۵",
        text: (
          <>
            ساخت کامپوننت‌های قابل استفاده مجدد و{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              سیستم‌های فرانت‌اند آماده تولید
            </strong>
            .
          </>
        ),
      },
    ],
  },
};

const SkillsList = () => {
  const { language } = useLanguage();
  const { title, description, listItems } = translations[language];
  const isFa = language === "fa";

  return (
    <div className="w-full">
      <div
        dir={isFa ? "rtl" : "ltr"}
        className="mb-10 flex flex-col gap-3 md:mb-12 md:gap-4"
      >
        <h2
          className="text-[30px] leading-[1.2] tracking-tight text-neutral-950 dark:text-white md:text-[38px] md:leading-[1.05]"
          style={{
            letterSpacing: isFa ? "normal" : "-0.03em",
            fontWeight: isFa ? 600 : 480,
          }}
        >
          {title}
        </h2>

        <p className="max-w-2xl text-[15px] font-normal leading-[1.8] text-neutral-600 dark:text-neutral-500 md:text-[17px]">
          {description}
        </p>
      </div>

      <div
        dir={isFa ? "rtl" : "ltr"}
        className="mx-auto flex max-w-4xl flex-col gap-7 md:gap-10"
      >
        {listItems.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-5 md:gap-8"
          >
            <span className="shrink-0 select-none pt-0.5 text-xl font-normal text-neutral-400 transition-colors duration-300 dark:text-neutral-500 md:text-2xl">
              {item.id}
            </span>

            <p className="max-w-3xl text-[15.5px] font-normal leading-[1.9] tracking-wide text-neutral-700 transition-colors duration-300 dark:text-neutral-300 md:text-lg">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;