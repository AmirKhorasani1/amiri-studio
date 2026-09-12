import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useLanguage } from "@context/LanguageContext";
import { containerVariants, itemVariants } from "@animation/heroIntro.animations";

const translations = {
  en: {
    previous: "Previous Project",
    next: "Next Project",
    view: "View project",
  },
  fa: {
    previous: "پروژه قبلی",
    next: "پروژه بعدی",
    view: "مشاهده پروژه",
  },
};

const NavCard = ({ project, type, language }) => {
  const isPrev = type === "prev";
  const t = translations[language];

  if (!project) return <div className="hidden sm:block" />;

  return (
    <motion.div
      variants={itemVariants}
      className={isPrev ? "" : "sm:text-end"}
    >
      <Link
        to={project.href}
        className="
          group flex min-h-[108px] flex-col justify-between
          rounded-4xl
          bg-neutral-200/70
          p-5
          transition-all duration-300
          hover:bg-neutral-200
          dark:bg-neutral-800/80
          dark:hover:bg-neutral-800
          md:min-h-[125px]
          md:p-7
        "
      >
        <div
          className={`flex items-center gap-1.5 text-xs text-secondary ${
            !isPrev ? "sm:flex-row-reverse" : ""
          }`}
        >
          {isPrev ? (
            <HiOutlineArrowSmLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          ) : null}

          <span>{isPrev ? t.previous : t.next}</span>

          {!isPrev ? (
            <HiOutlineArrowSmRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-medium text-black dark:text-white md:text-base">
            {project.title}
          </span>

          <span className="text-xs text-secondary transition-colors group-hover:text-black dark:group-hover:text-white">
            {t.view}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectNavigation = ({ prevProject, nextProject }) => {
  const { language } = useLanguage();
  const isRTL = language === "fa";

  if (!prevProject && !nextProject) return null;

  return (
    <motion.nav
      dir={isRTL ? "rtl" : "ltr"}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      aria-label={language === "fa" ? "ناوبری پروژه‌ها" : "Project navigation"}
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <NavCard
        project={prevProject}
        type="prev"
        language={language}
      />

      <NavCard
        project={nextProject}
        type="next"
        language={language}
      />
    </motion.nav>
  );
};

export default ProjectNavigation;