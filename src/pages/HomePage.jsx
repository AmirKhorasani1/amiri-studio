import BlogSection from "../features/portfolio/blog/BlogSection";
import ContactMeSection from "../features/portfolio/contact-me/ContactMeSection";
import HeroSection from "../features/portfolio/hero/HeroSection";
import ProjectsSection from "../features/portfolio/projects/ProjectsSection";
import SkillsSection from "../features/portfolio/skills/SkillsSection";
import ToolsSection from "../features/portfolio/tools/ToolsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactMeSection />
      <BlogSection />
    </>
  );
}