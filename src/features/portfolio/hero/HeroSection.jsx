import HeroIntro from "./components/HeroIntro";
import HeroStatsCard from "./components/HeroStatsCard";

const HeroSection = () => {
  return (
    <section className="relative z-10 mx-auto flex h-screen w-full max-w-[1800px] flex-col overflow-hidden">
      <div className="relative z-10 flex w-full flex-1 items-center px-4 md:pt-20 md:px-25">
        <div className="flex w-full md:*:w-1/2 flex-col items-center gap-10 md:gap-25 md:flex-row md:items-start md:justify-between">
          <HeroIntro />
          <HeroStatsCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;