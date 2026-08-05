import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript } from "react-icons/si";
import { TiThSmall } from "react-icons/ti";
import { HiGlobeAlt } from "react-icons/hi2";
import { FiMinus, FiSquare, FiX } from "react-icons/fi";
import HeroGlow from "./HeroGlow";
import CountUp from "./CountUp";
import { useLanguage } from "@context/LanguageContext";

const TECH_ITEMS = [
  {
    key: "react",
    icon: FaReact,
    value: 3,
    countDelay: 0.6,
    floatDelay: 0,
  },
  {
    key: "tools",
    icon: TiThSmall,
    value: 5,
    countDelay: 0.75,
    floatDelay: 0.3,
  },
  {
    key: "next",
    icon: SiNextdotjs,
    value: 1,
    countDelay: 0.9,
    floatDelay: 0.6,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.35 } },
};

const boxVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const translations = {
  en: {
    tab: { label: "amiri-studio.com", badge: "Portfolio" },
    labels: {
      react: "/ React.js Projects",
      tools: "/ Tools in project",
      next: "/ Next.js + Ts Projects",
    },
    items: {
      react: ["Fitsaz", "Sports Store", "Portfolio v2"],
      tools: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      next: ["Portfolio v2"],
    },
  },
  fa: {
    tab: { label: "amiri-studio.com", badge: "پرتفولیو" },
    labels: {
      react: "پروژه‌های ری‌اکت",
      tools: "ابزارهای پروژه",
      next: "پروژه‌های نکست‌ + تی‌اس",
    },
    items: {
      react: ["فیت‌ساز", "فروشگاه ورزشی", "پرتفولیو نسخه ۲"],
      tools: ["ری‌اکت", "نکست‌جی‌اس", "تایپ‌اسکریپت"],
      next: ["پرتفولیو نسخه ۲"],
    },
  },
};

/* ===================== باکس با افکت اسپاتلایت (سایه طوسی همراه موس) ===================== */

const SpotlightBox = ({ color = "163, 163, 163", className = "", children }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative isolate overflow-hidden rounded-md border-primary bg-neutral-100 dark:bg-[#101010] transition-colors duration-200 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, rgba(${color}, 0.16), transparent 75%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(${color}, 0.35), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/* ===================== نوار بالای صفحه: شبیه تب مرورگر ===================== */

const BrowserTopBar = ({ label, badge }) => (
  <div className="flex items-center justify-between gap-2 border-b-primary bg-primary px-2.5 py-2">
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        aria-label="close"
        className="flex size-6 items-center justify-center rounded-md text-neutral-500 duration-150 hover:bg-red-500/90 hover:text-white"
      >
        <FiX size={13} />
      </button>
      <button
        type="button"
        aria-label="maximize"
        className="flex size-6 items-center justify-center rounded-md text-neutral-500 duration-150 hover:bg-secondary"
      >
        <FiSquare size={10} />
      </button>
      <button
        type="button"
        aria-label="minimize"
        className="flex size-6 items-center justify-center rounded-md text-neutral-500 duration-150 hover:bg-secondary"
      >
        <FiMinus size={12} />
      </button>
    </div>

    <div className="flex min-w-0 items-center gap-2 rounded-full bg-secondary p-1.5 px-2">
      <span className="truncate text-[11.5px] text-neutral-400">{label}</span>
      <HiGlobeAlt size={13} className="shrink-0 text-neutral-500" />
    </div>

    <div className="w-18" />
  </div>
);

const HeroStatsCard = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="flex w-full flex-col items-center gap-4 md:items-end"
    >
      <div
        className="relative w-full max-w-full"
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <HeroGlow isHovered={isCardHovered} />

        <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-lg border-primary bg-primary md:h-110">
          <BrowserTopBar label={t.tab.label} badge={t.tab.badge} />

          <div className="p-2.5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-3"
            >
              {TECH_ITEMS.map(({ key, icon: Icon, value, countDelay, floatDelay }) => (
                <motion.div
                  key={key}
                  variants={boxVariants}
                  className="md:h-72 duration-300 hover:scale-99"
                >
                  <SpotlightBox className="group/box flex h-full flex-col p-4">
                    <div className="flex flex-col gap-0.5">
                      <CountUp value={value} delay={countDelay} />
                      <h3 className="text-secondary font-medium -mt-1 md:mt-0">{t.labels[key]}</h3>
                    </div>

                    <ul className="mt-2 hidden md:mt-2.5 md:grid grid-cols-3 md:grid-cols-1 gap-1.5">
                      {t.items[key].map((name) => (
                        <li key={name} className="flex items-center gap-2 text-[12.5px] text-primary">
                          <span className="size-1.5 shrink-0 rounded-full bg-black dark:bg-white" />
                          {name}
                        </li>
                      ))}
                    </ul>

                    <div className="absolute bottom-0 left-0 flex items-center justify-end text-neutral-300">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          y: {
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: floatDelay,
                          },
                        }}
                        className="rounded-full p-1 transition-[filter] duration-300 group-hover/box:drop-shadow-[0_0_10px_rgba(163,163,163,0.55)]"
                      >
                        <Icon   
                          aria-hidden="true"
                          focusable="false"
                          className="size-10 md:size-12 text-secondary"
                        />
                      </motion.div>
                    </div>
                  </SpotlightBox>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-22 md:-bottom-5 -mx-4 h-50 bg-gradient-to-t from-neutral-100 via-neutral-100/95 dark:from-black dark:via-black/95 to-transparent" />
      </div>
    </motion.div>
  );
};

export default HeroStatsCard;