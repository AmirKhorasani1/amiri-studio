import { motion } from "framer-motion";

const COLOR_GRADIENT =
  "linear-gradient(120deg, #303030, #353535, #404040, #555555, #656565, #555555, #404040, #303030)";

const GLOW_OFFSET_Y_MOBILE = -80;
const GLOW_OFFSET_Y_DESKTOP = -140;

const getGlowPositionStyle = (offsetY) => ({
  top: `calc(50% + ${offsetY}px)`,
  height: "22rem",
});

const HeroGlow = ({ isHovered }) => {
  const mobileGlowStyle = getGlowPositionStyle(GLOW_OFFSET_Y_MOBILE);
  const desktopGlowStyle = getGlowPositionStyle(GLOW_OFFSET_Y_DESKTOP);

  return (
    <>
      {/* لایه پایه خاکستری: موبایل */}
      <div
        className="absolute left-1/2 -z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900/70 blur-[40px] md:hidden"
        style={mobileGlowStyle}
      />
      {/* لایه پایه خاکستری: دسکتاپ */}
      <div
        className="absolute left-1/2 -z-10 hidden w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900/70 blur-[40px] md:block"
        style={desktopGlowStyle}
      />

      {/* موبایل */}
      <motion.div
        className="absolute left-1/2 -z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px] md:hidden"
        style={{
          ...mobileGlowStyle,
          backgroundImage: COLOR_GRADIENT,
          backgroundSize: "220% 220%",
        }}
        initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
        animate={{
          opacity: 0.6,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          opacity: { duration: 1, delay: 2, ease: "easeInOut" },
          backgroundPosition: { duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* دسکتاپ */}
      <motion.div
        className="absolute left-1/2 -z-10 hidden w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px] md:block"
        style={{
          ...desktopGlowStyle,
          backgroundImage: COLOR_GRADIENT,
          backgroundSize: "220% 220%",
        }}
        initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
          backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeInOut" },
          backgroundPosition: isHovered
            ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6, ease: "easeInOut" },
        }}
      />
    </>
  );
};

export default HeroGlow;