import HeroSection from "@home/hero/HeroSection"
import ToolsSection from "@home/tools/ToolsSection"
import SkillsSection from "@home/skills/SkillsSection"
import ProjectsSection from "@home/projects/ProjectsSection"
import ContactMeSection from "@home/contact/ContactMeSection"
import BlogSection from "@/components/templates/home/articles/ArticlesSection"
import StatsSection from "@home/Stats/StatsSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactMeSection />
      <BlogSection />
    </>
  );
}