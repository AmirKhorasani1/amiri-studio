import React from "react";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    listItems: [
      {
        id: "01",
        text: (
          <>
            Architecting scalable applications and solving complex frontend
            challenges with{" "}
            <strong className="text-black dark:text-white font-semibold">
              React & Next.js
            </strong>
            .
          </>
        ),
      },
      {
        id: "02",
        text: (
          <>
            Writing robust, type-safe logic and managing complex data flows with{" "}
            <strong className="text-black dark:text-white font-semibold">
              TypeScript & JavaScript
            </strong>
            .
          </>
        ),
      },
      {
        id: "03",
        text: (
          <>
            Building responsive, pixel-perfect interfaces with{" "}
            <strong className="text-black dark:text-white font-semibold">
              Tailwind CSS
            </strong>
            .
          </>
        ),
      },
      {
        id: "04",
        text: (
          <>
            Managing scalable application state efficiently using{" "}
            <strong className="text-black dark:text-white font-semibold">
              Redux
            </strong>
            .
          </>
        ),
      },
      {
        id: "05",
        text: (
          <>
            Creating semantic, accessible, and SEO-friendly foundations with{" "}
            <strong className="text-black dark:text-white font-semibold">
              HTML & CSS
            </strong>
            .
          </>
        ),
      },
    ],
  },

  fa: {
    listItems: [
      {
        id: "۰۱",
        text: (
          <>
            طراحی و توسعه وب‌اپلیکیشن‌های مقیاس‌پذیر و حل چالش‌های فرانت‌اند با{" "}
            <strong className="text-black dark:text-white font-semibold">
              React و Next.js
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۲",
        text: (
          <>
            پیاده‌سازی منطق پایدار و مدیریت جریان‌های پیچیده داده با{" "}
            <strong className="text-black dark:text-white font-semibold">
              TypeScript و JavaScript
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۳",
        text: (
          <>
            تبدیل طراحی‌ها به رابط‌های کاربری سریع، واکنش‌گرا و Pixel Perfect با{" "}
            <strong className="text-black dark:text-white font-semibold">
              Tailwind CSS
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۴",
        text: (
          <>
            مدیریت State در پروژه‌های بزرگ و مقیاس‌پذیر با{" "}
            <strong className="text-black dark:text-white font-semibold">
              Redux
            </strong>
            .
          </>
        ),
      },
      {
        id: "۰۵",
        text: (
          <>
            ساخت ساختارهای استاندارد، Semantic و سازگار با موتورهای جستجو با{" "}
            <strong className="text-black dark:text-white font-semibold">
              HTML و CSS
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
  const { listItems } = translations[language];

  return (
    <div className="w-full md:py-5">
      <div className="mx-auto flex max-w-4xl flex-col gap-5 md:gap-10">
        {listItems.map((item) => (
          <div
            key={item.id}
            className="group flex cursor-default items-start gap-5 md:gap-8"
          >
            <span className="select-none pt-0.5 text-xl text-secondary transition-colors duration-300 md:text-2xl">
              {item.id}
            </span>

            <p className="text-[15.5px] leading-[1.9] font-normal tracking-wide text-neutral-700 dark:text-neutral-300 transition-colors duration-300 md:text-lg">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;