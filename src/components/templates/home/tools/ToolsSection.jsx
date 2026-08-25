import React from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";

import SectionTitle from "@ui/SectionTitle";
import StickyViewAllLink from "@ui/StickyViewAllLink";

import AnimationLab from "@/components/templates/tools/AnimationLab/AnimationLabCard";
import DevNotesCard from "@/components/templates/tools/DevNotes/DevNotesCard";
import SnippetVaultCard from "@/components/templates/tools/SnippetVault/SnippetVaultCard";
import TypeScaleCard from "@/components/templates/tools/TypeScale/TypeScaleCard";
import ColorCraftCard from "@/components/templates/tools/ColorCraft/ColorCraftCard";

const translations = {
  en: {
    title: "Custom Developer Toolkit",
    description:
      "Every tool here started as a real problem during development. I built them to remove repetitive work, improve consistency, and make building interfaces faster.",
    viewAll: "View All Tools",
  },
  fa: {
    title: "ابزارهای اختصاصی توسعه",
    description:
      "هر ابزار از یک مشکل واقعی در روند توسعه شروع شد؛ برای کاهش کارهای تکراری، افزایش یکپارچگی و سریع‌تر کردن ساخت رابط‌های کاربری ساخته شده است.",
    viewAll: "مشاهده همه ابزارها",
  },
};

const EASE = [0.22, 1, 0.36, 1];

const topCardVariants = {
  hidden: {
    opacity: 0,
    y: -15,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
};

const colorCraftVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.95,
      ease: EASE,
    },
  },
};

const typeScaleVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.95,
      ease: EASE,
    },
  },
};

const ToolsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const topRowRef = React.useRef(null);
  const bottomRowRef = React.useRef(null);
  const viewAllRef = React.useRef(null);

  const topRowInView = useInView(topRowRef, {
    amount: 0.2,
  });

  const bottomRowInView = useInView(bottomRowRef, {
    amount: 0.2,
  });

  const viewAllInView = useInView(viewAllRef, {
    amount: 0.4,
  });

  return (
    <section className="container relative flex flex-col gap-8 py-5 md:gap-10">
      <SectionTitle
        title={t.title}
        description={t.description}
      />

      <div className="grid grid-cols-1 gap-4">
        {/* Top row */}
        <motion.div
          ref={topRowRef}
          initial="hidden"
          animate={topRowInView ? "visible" : "hidden"}
          transition={{
            staggerChildren: 0.14,
            delayChildren: 0.08,
          }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 [&>*]:cursor-pointer"
        >
          <motion.div variants={topCardVariants}>
            <AnimationLab />
          </motion.div>

          <motion.div variants={topCardVariants}>
            <DevNotesCard />
          </motion.div>

          <motion.div variants={topCardVariants}>
            <SnippetVaultCard />
          </motion.div>
        </motion.div>

        {/* Bottom row */}
        <div
          ref={bottomRowRef}
          className="hidden w-full flex-col gap-4 md:flex md:flex-row [&>*]:cursor-pointer"
        >
          <motion.div
            variants={colorCraftVariants}
            initial="hidden"
            animate={bottomRowInView ? "visible" : "hidden"}
            className="w-full md:w-3/5"
          >
            <ColorCraftCard />
          </motion.div>

          <motion.div
            variants={typeScaleVariants}
            initial="hidden"
            animate={bottomRowInView ? "visible" : "hidden"}
            className="w-full md:w-2/5"
          >
            <TypeScaleCard />
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={viewAllRef}
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={
          viewAllInView
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 18,
              }
        }
        transition={{
          duration: 0.65,
          delay: 0.15,
          ease: EASE,
        }}
      >
        <StickyViewAllLink
          label={t.viewAll}
          to="/tools"
        />
      </motion.div>
    </section>
  );
};

export default ToolsSection;