import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@context/LanguageContext";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import SectionTitle from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const translations = {
  en: {
    back: "Tools",
    title: "Regex Lab",
    description: "Test and debug regular expressions, explore different patterns, and see matches in real time.",
    breadcrumbHome: 'Home',
    breadcrumbTools: 'Tools',
    breadcrumbCurrent: 'Regex Lab',
  },
  fa: {
    back: "ابزارها",
    title: "آزمایش Regex",
    description: "عبارت‌ها را تست و دیباگ کنید، الگوهای مختلف را بررسی کنید و تطابق‌ها را به‌صورت زنده مشاهده کنید.",
    breadcrumbHome: 'خانه',
    breadcrumbTools: 'ابزارها',
    breadcrumbCurrent: 'آزمایشگاه Regex',
  },
};

const RegexHeader = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="flex flex-col gap-5">
      <SectionTitle 
        title={t.title} 
        description={t.description} 
      />

      <Breadcrumb
        items={[
          { label: t.breadcrumbHome, to: '/' },
          { label: t.breadcrumbTools, to: '/tools' },
          { label: t.breadcrumbCurrent },
        ]}
      />
    </header>
  );
};

export default RegexHeader;