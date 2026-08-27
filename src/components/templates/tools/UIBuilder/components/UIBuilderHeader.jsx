import React from "react";
import { useLanguage } from "@context/LanguageContext";
import SectionTitle from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const translations = {
  en: {
    title: "UI Builder",
    description: "Design your own design system — colors, type, radius, shadow — and export it.",
    breadcrumbHome: "Home",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "UI Builder",
  },
  fa: {
    title: "سازنده رابط کاربری",
    description: "سیستم طراحی خودت را بساز — رنگ، تایپوگرافی، شعاع گوشه، سایه — و از آن خروجی بگیر.",
    breadcrumbHome: "خانه",
    breadcrumbTools: "ابزارها",
    breadcrumbCurrent: "سازنده رابط کاربری",
  },
};

const UIBuilderHeader = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="flex flex-col gap-3">
      <SectionTitle title={t.title} description={t.description} />

      <Breadcrumb
        items={[
          { label: t.breadcrumbHome, to: "/" },
          { label: t.breadcrumbTools, to: "/tools" },
          { label: t.breadcrumbCurrent },
        ]}
      />
    </header>
  );
};

export default UIBuilderHeader;