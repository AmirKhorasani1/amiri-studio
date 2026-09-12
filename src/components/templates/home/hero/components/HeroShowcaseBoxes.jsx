import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";

import { useLanguage } from "@context/LanguageContext";
import ToolsPreview from "./ToolsPreview";
import EcommercePreview from "./EcommercePreview";
import SkillsPreview from "./SkillsPreview";

const translations = {
  en: {
    tools: "Developer Tools",
    projects: "Projects",
    techStack: "Tech Stack",
    explore: "Explore",
  },
  fa: {
    tools: "ابزارهای توسعه",
    projects: "پروژه‌ها",
    techStack: "تکنولوژی‌ها",
    explore: "مشاهده",
  },
};

const SLIDE_DURATION = 15000;

const EASE_OUT = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0.9,
    },
  },
};

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.97,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: EASE_OUT,
    },
  },
};

const Shine = ({ animationKey }) => (
  <motion.span
    key={animationKey}
    initial={{ x: "-120%" }}
    animate={{ x: "520%" }}
    transition={{
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    }}
    className="pointer-events-none absolute -top-[120%] left-0 h-[340%] w-[35%] rotate-50 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent blur-[20px]"
    aria-hidden="true"
  />
);

const ShowcaseCard = ({
  children,
  title,
  explore,
  href,
  isRTL,
}) => {
  const [shineKey, setShineKey] = useState(0);

  const arrowClass = isRTL ? "rotate-180" : "";

  return (
    <motion.div
      variants={boxVariants}
      className="group relative h-[285px] w-full overflow-hidden rounded-4xl bg-neutral-200/80 transition-transform duration-500 hover:-translate-y-0.5 dark:bg-neutral-800/80 md:h-[300px] shadow-2xl shadow-black/5"
      onMouseEnter={() => setShineKey((prev) => prev + 1)}
    >
      {children}

      <Shine animationKey={shineKey} />

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[90px] items-end justify-between bg-gradient-to-t from-white via-white to-transparent px-4 pb-4 text-sm text-neutral-800 dark:from-neutral-900/80 dark:via-neutral-900/60 dark:text-neutral-200"
      >
        <h3 className="font-medium">{title}</h3>

        <Link
          to={href}
          aria-label={`${explore} ${title}`}
          className="pointer-events-auto flex items-center gap-0.5 font-medium transition-all duration-300 hover:gap-1.5 hover:text-black dark:hover:text-white"
        >
          <span>{explore}</span>

          <HiOutlineArrowSmRight
            size={19}
            className={`transition-transform duration-300 group-hover:translate-x-0.5 ${arrowClass}`}
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.div>
  );
};

const MobileShowcaseSlider = ({
  items,
  t,
  isRTL,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, SLIDE_DURATION);

    return () => clearInterval(id);
  }, [items.length]);

  const activeItem = items[activeIndex];

  const enterX = isRTL ? -48 : 48;
  const exitX = isRTL ? 48 : -48;

  return (
    <div className="w-full md:hidden">
      <div className="relative overflow-hidden">
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.div
            key={activeItem.key}
            initial={{
              opacity: 0,
              x: enterX,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: exitX,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ShowcaseCard
              title={activeItem.title}
              explore={t.explore}
              href={activeItem.href}
              isRTL={isRTL}
            >
              {activeItem.content}
            </ShowcaseCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-1.5"
        role="tablist"
        aria-label={isRTL ? "انتخاب بخش" : "Showcase sections"}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "true" : undefined}
              aria-label={`${item.title}`}
              onClick={() => setActiveIndex(index)}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isActive
                  ? "w-5 bg-neutral-800 dark:bg-neutral-200"
                  : "w-1.5 bg-neutral-400/40 hover:bg-neutral-400/70",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
};

const HeroShowcaseBoxes = () => {
  const { language } = useLanguage();

  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  const items = [
    {
      key: "tools",
      title: t.tools,
      href: "/tools",
      content: <ToolsPreview />,
    },
    {
      key: "projects",
      title: t.projects,
      href: "/projects",
      content: <EcommercePreview />,
    },
    {
      key: "tech-stack",
      title: t.techStack,
      href: "/#skills",
      content: <SkillsPreview />,
    },
  ];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full"
    >
      {/* Mobile */}
      <MobileShowcaseSlider
        items={items}
        t={t}
        isRTL={isRTL}
      />

      {/* Desktop */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden w-full gap-3.5 md:grid md:grid-cols-3"
      >
        {items.map((item) => (
          <ShowcaseCard
            key={item.key}
            title={item.title}
            explore={t.explore}
            href={item.href}
            isRTL={isRTL}
          >
            {item.content}
          </ShowcaseCard>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroShowcaseBoxes;