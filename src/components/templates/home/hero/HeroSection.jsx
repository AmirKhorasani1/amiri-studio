import HeroIntro from "./components/HeroIntro";
import HeroStatsCard from "./components/HeroStatsCard";

const HeroSection = () => {
  return (
    <section className="relative z-10 mx-auto flex flex-col overflow-hidden min-h-screen pt-20 md:pt-35">
      <div className="relative z-10 flex w-full flex-1 items-center container">
        <div className="flex flex-col items-center w-full md:*:w-1/2 gap-10 md:gap-0 md:flex-row md:items-start md:justify-between">
          <HeroIntro />
          <HeroStatsCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;