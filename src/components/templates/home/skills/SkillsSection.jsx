import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import SkillsList from "./components/SkillsList";
import SkillsIconsBox from "./components/SkillsIconsBox";

const ITEM_COUNT = 6;
const VH_PER_ITEM = 50;

const SkillsSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const idx = Math.min(
        ITEM_COUNT - 1,
        Math.floor(progress * ITEM_COUNT)
      );
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="container relative"
      style={{ height: `${ITEM_COUNT * VH_PER_ITEM}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden py-10">
        <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:items-stretch md:gap-15">
          <div className="w-full md:w-1/2">
            <SkillsList activeIndex={activeIndex} itemCount={ITEM_COUNT} />
          </div>

          <SkillsIconsBox />
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;