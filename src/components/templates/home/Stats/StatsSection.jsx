import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";

const STATS = [
  { id: "experience", value: 1, suffix: "+" },
  { id: "projects", value: 7, suffix: "+" },
  { id: "tools", value: 5, suffix: "+" },
];

const translations = {
  en: {
    stats: {
      experience: {
        label: "Year of Experience",
        description: "Building modern web interfaces.",
      },
      projects: {
        label: "Projects & Builds",
        description: "Creating products from idea to interface.",
      },
      tools: {
        label: "Developer Tools",
        description: "Solving real problems through useful tools.",
      },
    },
  },

  fa: {
    stats: {
      experience: {
        label: "سال تجربه",
        description: "ساخت رابط‌های وب مدرن.",
      },
      projects: {
        label: "پروژه و ساخت‌ها",
        description: "ساخت محصولات از ایده تا رابط کاربری.",
      },
      tools: {
        label: "ابزارهای توسعه",
        description: "حل مشکلات واقعی با ابزارهای کاربردی.",
      },
    },
  },
};

const GRID_SIZE = 72;

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReduced(mq.matches);

    const handler = (e) => setReduced(e.matches);

    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
};

const GridBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
      backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      WebkitMaskImage:
        "radial-gradient(ellipse 75% 65% at 50% 50%, black 0%, black 25%, transparent 78%)",
      maskImage:
        "radial-gradient(ellipse 75% 65% at 50% 50%, black 0%, black 25%, transparent 78%)",
    }}
  />
);

const ACTIVE_ROWS = 10;

const SPECTRUMS = [
  "linear-gradient(90deg, transparent, rgba(59,130,246,0.9), rgba(236,72,153,0.9), transparent)",
  "linear-gradient(90deg, transparent, rgba(34,197,94,0.9), rgba(250,204,21,0.9), transparent)",
  "linear-gradient(90deg, transparent, rgba(139,92,246,0.9), rgba(59,130,246,0.9), transparent)",
  "linear-gradient(90deg, transparent, rgba(249,115,22,0.9), rgba(236,72,153,0.9), transparent)",
  "linear-gradient(90deg, transparent, rgba(6,182,212,0.9), rgba(168,85,247,0.9), transparent)",
  "linear-gradient(90deg, transparent, rgba(244,63,94,0.9), rgba(250,204,21,0.9), transparent)",
  "linear-gradient(90deg, transparent, rgba(16,185,129,0.9), rgba(59,130,246,0.9), transparent)",
];

const randomRowStreak = (rowCount) => ({
  key: `${Date.now()}-${Math.random()}`,
  rowIndex: Math.floor(
    Math.random() * Math.max(rowCount, 1)
  ),
  direction: Math.random() > 0.5 ? "ltr" : "rtl",
  duration: 1 + Math.random() * 1.4,
  holdDelay: Math.random() * 2.5,
  gradient:
    SPECTRUMS[
      Math.floor(Math.random() * SPECTRUMS.length)
    ],
});

const StreakRow = ({ streak, onDone }) => {
  const isLtr = streak.direction === "ltr";

  return (
    <div
      aria-hidden
      className="absolute left-0 right-0 h-px overflow-hidden"
      style={{
        top: streak.rowIndex * GRID_SIZE,
      }}
    >
      <motion.div
        className="absolute top-0 h-full w-1/2 md:w-1/3"
        style={{
          background: streak.gradient,
          filter: "blur(0.5px)",
        }}
        initial={{
          left: isLtr ? "-40%" : "110%",
          opacity: 0,
        }}
        animate={{
          left: isLtr ? "110%" : "-40%",
          opacity: [0, 0.9, 0.9, 0],
        }}
        transition={{
          left: {
            duration: streak.duration,
            ease: "easeInOut",
          },
          opacity: {
            duration: streak.duration,
            times: [0, 0.15, 0.85, 1],
            ease: "easeInOut",
          },
        }}
        onAnimationComplete={onDone}
      />
    </div>
  );
};

const LightStreaks = () => {
  const containerRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const [rowCount, setRowCount] = useState(6);

  const [streaks, setStreaks] = useState(() =>
    Array.from(
      { length: ACTIVE_ROWS },
      () => randomRowStreak(6)
    )
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    const measure = () =>
      setRowCount(
        Math.max(
          Math.ceil(el.clientHeight / GRID_SIZE),
          1
        )
      );

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
      }}
    >
      {streaks.map((streak, index) => (
        <StreakRow
          key={streak.key}
          streak={streak}
          onDone={() => {
            const respawn = () =>
              setStreaks((prev) => {
                const next = [...prev];

                next[index] = randomRowStreak(rowCount);

                return next;
              });

            setTimeout(
              respawn,
              streak.holdDelay * 1000
            );
          }}
        />
      ))}
    </div>
  );
};

const CountUpNumber = ({
  value,
  suffix,
  delay = 0,
}) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px",
  });

  const reducedMotion = usePrefersReducedMotion();

  const [display, setDisplay] = useState(
    reducedMotion ? value : 0
  );

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [
    isInView,
    value,
    delay,
    reducedMotion,
  ]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{
        textShadow:
          "-1px 0 rgba(103,232,249,0.45), 1px 0 rgba(244,114,182,0.35)",
      }}
    >
      {display}
      {suffix}
    </span>
  );
};

const StatItem = ({
  stat,
  copy,
  index,
}) => {
  return (
    <div className="relative flex flex-col items-center gap-3 px-6 py-10 text-center">
      <span className="text-[44px] font-[450] leading-none tracking-tight text-white md:text-7xl">
        <CountUpNumber
          value={stat.value}
          suffix={stat.suffix}
          delay={index * 0.1}
        />
      </span>

      <div className="flex flex-col md:gap-1">
        <span className="text-base text-neutral-300">
          {copy.label}
        </span>

        <span className="max-w-[220px] text-sm text-neutral-500">
          {copy.description}
        </span>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section
      dir={language === "fa" ? "rtl" : "ltr"}
      className="relative container my-5 flex w-full items-center justify-center overflow-hidden py-20 md:py-35"
    >
      <GridBackground />

      <LightStreaks />

      <div className="relative z-10">
        <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-3 md:gap-40">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.id}
              stat={stat}
              copy={t.stats[stat.id]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;