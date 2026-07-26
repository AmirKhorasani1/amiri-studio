import { motion } from "framer-motion";

const HeroIntro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center gap-7 md:gap-10 text-center md:items-start md:text-left"
    >
      <h1
        className="font-medium leading-12 md:leading-[1.2] tracking-tighter text-white text-[38px] md:text-[56px] lg:text-6xl"
        style={{ letterSpacing: "-0.04em" }}
      >
        Frontend Developer
        <br />
        by Amir Khorasani
      </h1>

      <h3 className="max-w-xl text-[17px] text-neutral-400">
        From complex state management and API workflows
        to custom components and smooth animations — 
        what seems frustrating to most, I solve with ease.
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <button className="btn-primary">Download Resume</button>
        <button className="btn-secondary">View My Projects</button>
      </div>
    </motion.div>
  );
};

export default HeroIntro;