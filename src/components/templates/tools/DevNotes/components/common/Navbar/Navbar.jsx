import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    home: "Home",
    notes: "Notes",
    tasks: "My Tasks",
    projects: "Projects",
    calendar: "Calendar",
    progress: "Progress",
    templates: "Templates",
    trash: "Trash",
  },
  fa: {
    home: "خانه",
    notes: "یادداشت‌ها",
    tasks: "وظایف من",
    projects: "پروژه‌ها",
    calendar: "تقویم",
    progress: "پیشرفت",
    templates: "قالب‌ها",
    trash: "سطل زباله",
  },
};

const ROUTE_KEYS = [
  "notes",
  "tasks",
  "projects",
  "calendar",
  "progress",
  "templates",
  "trash",
];

function usePageTitle(t) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];

  if (!last || last === "dev-notes") return t.home;
  if (ROUTE_KEYS.includes(last)) return t[last];
  return t.home;
}

const Navbar = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const title = usePageTitle(t);

  return (
    <div className="md:hidden fixed top-0 right-0 left-0 z-30 h-21 w-full bg-gradient-to-b from-neutral-100 dark:from-black via-neutral-100/80 dark:via-black/90 to-transparent">
      <h1 className="pt-8 text-center text-lg font-medium">{title}</h1>
    </div>
  );
};

export default Navbar;