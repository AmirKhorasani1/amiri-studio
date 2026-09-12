import React from "react"
import { useLanguage } from "@context/LanguageContext"
import SectionTitle from "@/components/ui/SectionTitle"
import ProjectCard from "../../projects/components/ProjectCard"
import projects from "@/components/templates/projects/data/projects";
import StickyViewAllLink from "@/components/ui/StickyViewAllLink";

const translations = {
  en: {
    title: "Selected Web Projects",
    description:
      "A selection of products and interfaces I’ve designed and built, with a focus on thoughtful UX, clean engineering, and real-world problem solving.",
    viewAll: "View All Projects",
  },

  fa: {
    title: "پروژه‌های منتخب وب",
    description:
      "مجموعه‌ای از محصولات و رابط‌های وب که طراحی و توسعه داده‌ام؛ با تمرکز بر تجربه کاربری، مهندسی تمیز و حل مسائل واقعی.",
    viewAll: "مشاهده همه پروژه‌ها",
  },
};

const ProjectsSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="relative container">
      <div className="flex flex-col gap-4.5 md:gap-8">
        <SectionTitle
          title={t.title}
          description={t.description}
        />

      <section
        aria-label={t.title}
        className="grid grid-cols-1 gap-4.5 md:grid-cols-2"
      >
        {projects.slice(0, 2).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

        <StickyViewAllLink
          label={t.viewAll}
          to="/projects"
        />
      </div>
    </section>
  )
}

export default ProjectsSection