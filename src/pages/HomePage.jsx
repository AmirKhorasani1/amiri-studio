import HeroSection from "@home/hero/HeroSection"
import ToolsSection from "@home/tools/ToolsSection"
import SkillsSection from "@home/skills/SkillsSection"
import ProjectsSection from "@home/projects/ProjectsSection"
import PortfolioAssistant from "@home/portfolio-assistant/PortfolioAssistant"
import ContactMeSection from "@home/contact/ContactMeSection"
import BlogSection from "@home/Blog/BlogSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactMeSection />
      <PortfolioAssistant />
      <BlogSection />
    </>
  );
}