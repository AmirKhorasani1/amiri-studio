import React from "react";
import SectionTitle from "@ui/SectionTitle";
import AnimationLab from "@/components/templates/tools/AnimationLab/AnimationLabCard";
import DevNotesCard from "@tools/DevNotes/DevNotesCard";
import SnippetVaultCard from "@tools/SnippetVault/SnippetVaultCard";
import TypeScaleCard from "@tools/TypeScale/TypeScaleCard";
import ColorCraftCard from "@tools/ColorCraft/ColorCraftCard";
import { useLanguage } from "@context/LanguageContext";
import RegexLabCard from "@tools/RegexLab/RegexLabCard";
import UiBuilderCard from "@/components/templates/tools/UIBuilder/UiBuilderCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const translations = {
  en: {
    title: "Custom Developer Toolkit",
    description:
      "A collection of tools I built to make frontend development faster, more consistent, and easier to iterate on.",
    breadcrumbHome: "Home",
    breadcrumbTools: "Tools",
  },

  fa: {
    title: "ابزارهای اختصاصی توسعه",
    description:
      "مجموعه‌ای از ابزارهایی که برای سریع‌تر شدن توسعه فرانت‌اند، حفظ یکدستی و ساده‌تر شدن فرایند ساخت رابط‌های کاربری ساخته‌ام.",
    breadcrumbHome: "خانه",
    breadcrumbTools: "ابزارها",
  },
};

const ToolsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      lang={language}
      className="container relative flex flex-col gap-8 py-37 md:gap-10"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <SectionTitle
            title={t.title}
            description={t.description}
          />
        </div>

        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: "/" },
            { label: t.breadcrumbTools, to: "/tools" },
          ]}
        />
      </div>

      {/* Toolkit */}
      <div className="grid grid-cols-1 gap-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 [&>*]:cursor-pointer">
          <div className="min-w-0">
            <AnimationLab />
          </div>

          <div className="min-w-0">
            <DevNotesCard />
          </div>

          <div className="min-w-0">
            <SnippetVaultCard />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-full flex-col gap-4 md:flex-row [&>*]:cursor-pointer">
          <div className="w-full min-w-0 md:w-3/5">
            <ColorCraftCard />
          </div>

          <div className="w-full min-w-0 md:w-2/5">
            <TypeScaleCard />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex w-full flex-col gap-4 md:flex-row [&>*]:cursor-pointer">
          <div className="w-full min-w-0 md:w-2/5">
            <UiBuilderCard />
          </div>

          <div className="w-full min-w-0 md:w-3/5">
            <RegexLabCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ToolsPage;