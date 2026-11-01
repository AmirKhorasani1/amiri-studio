import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";

const EASE_OUT = [0.16, 1, 0.3, 1];

const translations = {
  en: {
    title: "Engineering Modern Interfaces",
    description:
      "Building modern web applications with thoughtful architecture, efficient data flows, and a strong understanding of rendering, performance, scalability, and real-world product requirements.",

    listItems: [
      {
        id: "01",
        text: (
          <>
            Building scalable applications with{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              Next.js and its modern rendering architecture
            </strong>
            , working with SSR, SSG, ISR, CSR, dynamic rendering, Server and Client Components, Route Handlers, and Middleware to choose the right approach for each part of an application.
          </>
        ),
      },
      {
        id: "02",
        text: (
          <>
            Designing reliable{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              API and data flows
            </strong>
            , from integrating RESTful APIs and handling asynchronous operations to managing loading states, errors, caching, and structured client-server communication with tools such as Axios.
          </>
        ),
      },
      {
        id: "03",
        text: (
          <>
            Structuring{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              application state and data flow
            </strong>
            {" "}with Redux and scalable state management patterns, keeping complex interfaces predictable, maintainable, and easy to extend as applications grow.
          </>
        ),
      },
      {
        id: "04",
        text: (
          <>
            Creating{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              real-time and interactive experiences
            </strong>
            {" "}with WebSockets and persistent client-server communication, enabling applications to respond efficiently to live data, events, and user actions.
          </>
        ),
      },
      {
        id: "05",
        text: (
          <>
            Implementing{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              authentication, authorization, and secure application flows
            </strong>
            {" "}with appropriate client-side patterns for protected routes, user sessions, permissions, and authenticated API communication.
          </>
        ),
      },
      {
        id: "06",
        text: (
          <>
            Turning complex product requirements into{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              production-ready frontend systems
            </strong>
            {" "}with reusable components, responsive interfaces, clean architecture, and performance-focused implementation.
          </>
        ),
      },
    ],
  },

  fa: {
    title: "مهندسی رابط‌های مدرن",
    description:
      "توسعه اپلیکیشن‌های وب مدرن با معماری اصولی، جریان داده کارآمد و درک عمیق از رندرینگ، Performance، مقیاس‌پذیری و نیازهای واقعی محصول.",

    listItems: [
      {
        id: "۰۱",
        text: (
          <>
            توسعه اپلیکیشن‌های مقیاس‌پذیر با{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              Next.js و معماری مدرن رندرینگ آن
            </strong>
            ، با استفاده از SSR، SSG، ISR، CSR، Dynamic Rendering، Server و Client Components، Route Handlers و Middleware و انتخاب رویکرد مناسب برای هر بخش از اپلیکیشن.
          </>
        ),
      },
      {
        id: "۰۲",
        text: (
          <>
            طراحی{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              جریان‌های پایدار API و داده
            </strong>
            ، از اتصال به RESTful APIها و مدیریت عملیات غیرهمزمان تا کنترل Loading، خطا، Caching و ارتباط ساختاریافته میان کلاینت و سرور با ابزارهایی مانند Axios.
          </>
        ),
      },
      {
        id: "۰۳",
        text: (
          <>
            ساختاردهی{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              State و جریان داده در سطح اپلیکیشن
            </strong>
            {" "}با Redux و الگوهای مقیاس‌پذیر مدیریت State، برای حفظ ساختاری قابل پیش‌بینی، قابل نگهداری و قابل توسعه در پروژه‌های پیچیده.
          </>
        ),
      },
      {
        id: "۰۴",
        text: (
          <>
            ساخت تجربه‌های{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              بلادرنگ و تعاملی
            </strong>
            {" "}با WebSocket و ارتباط پایدار کلاینت و سرور، تا اپلیکیشن بتواند به داده‌های زنده، رویدادها و تعاملات کاربر به‌شکل کارآمد واکنش نشان دهد.
          </>
        ),
      },
      {
        id: "۰۵",
        text: (
          <>
            پیاده‌سازی{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              احراز هویت، سطح دسترسی و جریان‌های امن اپلیکیشن
            </strong>
            {" "}با الگوهای مناسب سمت کلاینت برای Protected Routes، Session، Permission و ارتباط احراز هویت‌شده با APIها.
          </>
        ),
      },
      {
        id: "۰۶",
        text: (
          <>
            تبدیل نیازهای پیچیده محصول به{" "}
            <strong className="font-semibold text-neutral-950 dark:text-white">
              سیستم‌های فرانت‌اند آماده تولید
            </strong>
            {" "}با کامپوننت‌های قابل استفاده مجدد، رابط‌های واکنش‌گرا، معماری تمیز و پیاده‌سازی متمرکز بر Performance.
          </>
        ),
      },
    ],
  },
};

const SkillsList = ({ activeIndex = 0, itemCount }) => {
  const { language } = useLanguage();
  const { title, description, listItems } = translations[language];
  const isFa = language === "fa";

  const total = itemCount ?? listItems.length;
  const activeItem = listItems[activeIndex];

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

      <div dir={isFa ? "rtl" : "ltr"} className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="flex items-start gap-5"
          >
            <span className="shrink-0 select-none pt-0.5 text-xl font-normal text-neutral-400 dark:text-neutral-500 md:text-2xl">
              {activeItem.id}
            </span>

            <p className="max-w-3xl text-[15.5px] font-normal leading-[1.9] tracking-wide text-neutral-700 dark:text-neutral-300 md:text-lg">
              {activeItem.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* نوار پیشرفت — نشون می‌ده چند جمله از کل باقی مونده */}
        <div className="mt-8 flex items-center gap-1.5 md:mt-10">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={[
                "h-1 flex-1 rounded-full transition-colors duration-500",
                i <= activeIndex
                  ? "bg-neutral-800 dark:bg-neutral-200"
                  : "bg-neutral-300/60 dark:bg-neutral-700/60",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsList;