import { useState } from "react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { TiThSmall } from "react-icons/ti";
import StatusBar from "./StatusBar";
import HeroGlow from "./HeroGlow";
import CountUp from "./CountUp";

const TECH_ITEMS = [
  {
    key: "react",
    icon: FaReact,
    value: 3,
    label: "/ React.js",
    countDelay: 0.6,
    floatDelay: 0,
    glowColor: "97, 218, 251",
  },
  {
    key: "tools",
    icon: TiThSmall,
    value: 5,
    label: "/ Tools in project",
    countDelay: 0.75,
    floatDelay: 0.3,
    glowColor: "249, 115, 22",
  },
  {
    key: "next",
    icon: SiNextdotjs,
    value: 1,
    label: "/ Next.js + Ts",
    countDelay: 0.9,
    floatDelay: 0.6,
    glowColor: "129, 140, 248",
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

const HeroStatsCard = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const toggleIcon = (key) =>
    setActiveIcon((prev) => (prev === key ? null : key));

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

        <div className="relative h-auto w-full rounded-xl border border-neutral-700 bg-black p-2 md:p-3 md:h-110">
          <StatusBar />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-2 md:gap-3 *:rounded-lg *:bg-[#121212] *:p-4 *:hover:bg-[#151515] sm:grid-cols-3"
          >
            {TECH_ITEMS.map(
              ({ key, icon: Icon, value, label, countDelay, floatDelay, glowColor }) => (
                <motion.div
                  key={key}
                  variants={boxVariants}
                  className="group/box duration-300 hover:scale-99"
                >
                  <div className="flex flex-col gap-1 md:gap-2">
                    <CountUp value={value} delay={countDelay} />
                    <h3 className="text-neutral-400">{label}</h3>
                  </div>

                  <div className="flex items-center justify-end text-neutral-300 -mt-12 md:my-20">
                    <motion.div
                      onClick={() => toggleIcon(key)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: floatDelay,
                        },
                      }}
                      className="cursor-pointer rounded-full p-1 transition-[filter] duration-300 group-hover/box:drop-shadow-[0_0_10px_rgba(163,163,163,0.55)]"
                      style={
                        activeIcon === key
                          ? {
                              filter: `drop-shadow(0 0 14px rgba(${glowColor}, 0.85)) drop-shadow(0 0 30px rgba(${glowColor}, 0.45))`,
                            }
                          : undefined
                      }
                    >
                      <Icon className="size-10 md:size-12" />
                    </motion.div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-22 md:-bottom-5 -mx-4 h-50 bg-gradient-to-t from-black via-black/95 to-transparent" />
      </div>
    </motion.div>
  );
};

export default HeroStatsCard;