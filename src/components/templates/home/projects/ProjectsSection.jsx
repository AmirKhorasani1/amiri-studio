import React from "react"
import ProjectCardOne from "./components/ProjectCardOne"
import ProjectCardTwo from "./components/ProjectCardTwo"
import StickyViewAllLink from "@ui/StickyViewAllLink"
import { useLanguage } from "@context/LanguageContext"
import SectionTitle from "@/components/ui/SectionTitle"
import ProjectCardThree from "./components/ProjectCardThree"

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

const STICKY_TOP_BASE = 150;
const STICKY_TOP_STEP = 20;

const ProjectsSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const projectCards = [ProjectCardOne, ProjectCardTwo, ProjectCardThree]

  return (
    <section className="relative container">
      <div className="flex flex-col gap-4.5 md:gap-8">
        <SectionTitle
          title={t.title}
          description={t.description}
        />

        <div className="relative">
          {projectCards.map((Card, index) => (
            <div
              key={index}
              className={`sticky pb-4.5 ${index === projectCards.length - 1 ? "pb-0 md:pb-0" : ""}`}
              style={{
                top: `${STICKY_TOP_BASE + index * STICKY_TOP_STEP}px`,
                zIndex: index + 1,
              }}
            >
              <Card />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection