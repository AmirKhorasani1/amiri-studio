import React from "react";
import { useLanguage } from "@context/LanguageContext";
import SectionTitle from "@ui/SectionTitle";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ProjectCard from "@/components/templates/projects/components/ProjectCard";
import projects from "@/components/templates/projects/data/projects";

const translations = {
  en: {
    title: "Selected Projects",
    description:
      "A selection of product-focused interfaces and frontend experiences, built with attention to clarity, craft, and interaction.",
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
  },
  fa: {
    title: "پروژه‌های منتخب",
    description:
      "مجموعه‌ای از رابط‌های محصول‌محور و تجربه‌های فرانت‌اند که با توجه به وضوح، جزئیات و تعامل ساخته شده‌اند.",
    breadcrumbHome: "خانه",
    breadcrumbProjects: "پروژه‌ها",
  },
};

const ProjectsPage = () => {
  const { language } = useLanguage();
  const locale = language === "fa" ? "fa" : "en";
  const t = translations[locale];

  return (
    <main
      dir={locale === "fa" ? "rtl" : "ltr"}
      lang={locale}
      className="container relative flex flex-col gap-8 py-35"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <SectionTitle title={t.title} description={t.description} />
        </div>

        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: "/" },
            { label: t.breadcrumbProjects, to: "/projects" },
          ]}
        />
      </div>

      <section
        aria-label={t.title}
        className="grid grid-cols-1 gap-4.5 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
};

export default ProjectsPage;