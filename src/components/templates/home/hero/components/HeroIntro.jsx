import { motion } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    titleLine1: "Modern Frontend Development",
    titleLine2: "Focused on Quality and Performance",
    description:
      "I'm Amir Khorasani. I enjoy solving the frontend challenges that many developers avoid—from complex state management and API workflows to reusable component systems and polished animations.",
    resumeBtn: "Download Resume",
    projectsBtn: "View My Projects",
  },
  fa: {
    titleLine1: "توسعه مدرن فرانت‌اند",
    titleLine2: "با تمرکز بر کیفیت و عملکرد",
    description:
      "من امیر خراسانی هستم. از حل چالش‌های فرانت‌اندی که معمولاً پیچیده و زمان‌بر هستند لذت می‌برم؛ از مدیریت state و ارتباط با API گرفته تا طراحی کامپوننت‌های قابل‌استفاده‌مجدد و ساخت انیمیشن‌های روان و حرفه‌ای.",
    resumeBtn: "دانلود رزومه",
    projectsBtn: "مشاهده پروژه‌ها",
  },
};

const HeroIntro = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        flex flex-col gap-8 md:gap-9
        items-start text-left
        rtl:items-start rtl:text-right
      "
    >
      <h1
        className="leading-12.5 md:leading-[1.3] tracking-tighter text-[37px] md:text-[55px] text-left rtl:text-right"
        style={{
          letterSpacing: language === "fa" ? "normal" : "-0.04em",
          fontWeight: language === "fa" ? 600 : 500,
        }}
      >
        {t.titleLine1}
        <br />
        {t.titleLine2}
      </h1>

      <h2 className="max-w-xl text-base md:text-lg text-secondary font-normal text-left rtl:text-right">
        {t.description}
      </h2>

      <div className="flex flex-wrap items-center gap-4 justify-start rtl:justify-end">
        <button className="btn-primary">
          {t.resumeBtn}
        </button>

        <button className="btn-secondary">
          {t.projectsBtn}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroIntro;