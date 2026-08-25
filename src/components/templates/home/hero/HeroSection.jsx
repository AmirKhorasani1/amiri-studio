import TechMarquee from "./components/TechMarquee";
import HeroIntro from "./components/HeroIntro/HeroIntro";
import HeroShowcaseBoxes from "./components/HeroShowcaseBoxes";

const HeroSection = () => {
  return (
    <section className="relative z-10 mx-auto flex items-center justify-center min-h-screen w-full flex-col overflow-hidden container">
      <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-10 md:gap-15 py-22 md:py-37">
        <HeroIntro />
        <HeroShowcaseBoxes />
        <TechMarquee />
      </div>
    </section>
  );
};

export default HeroSection;