import React, { useMemo, useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import { getProjects, getPersonalTasks, getNotes } from "./datasources";
import {
  computeOverview,
  computeProjectProgress,
  computeTaskCompletion,
  computeActivity,
  computeInsights,
} from "./progressanalytics";
import RangeSelector from "./RangeSelector";
import ProgressOverview from "./ProgressOverview";
import ActivityHeatmap from "./ActivityHeatmap";
import ProjectProgressPanel from "./ProjectProgressPanel";
import TaskCompletionPanel from "./TaskCompletionPanel";
import InsightsPanel from "./InsightsPanel";

const translations = {
  en: {
    pageTitle: "Progress",
    rangeOptions: { "7d": "7 Days", "30d": "30 Days", "90d": "90 Days", all: "All Time" },
    tasksCompleted: "Tasks Completed",
    tasksWorkedOn: "Tasks Worked On",
    activeDays: "Active Days",
    projectsLabel: "Projects",
    personalTasksShort: "personal",
    projectTasksShort: "project",
    activityTitle: "Activity",
    tasksCompletedShort: "tasks completed",
    tasksCreatedShort: "tasks created",
    notesCreatedShort: "notes created",
    projectsUpdatedShort: "project updated",
    less: "Less",
    more: "More",
    projectProgressTitle: "Project Progress",
    noProjects: "No projects yet",
    taskCompletionTitle: "Task Completion",
    completionLabels: { completed: "Completed", inProgress: "In Progress", todo: "Todo" },
    insightsTitle: "Insights",
    mostActiveProject: "Most Active Project",
    mostActiveDay: "Most Active Day",
    tasksLabel: "tasks",
    ofActivity: "of your activity",
    completedTasksShort: "completed tasks",
    noData: "Not enough data yet",
  },
  fa: {
    pageTitle: "پیشرفت",
    rangeOptions: { "7d": "۷ روز", "30d": "۳۰ روز", "90d": "۹۰ روز", all: "کل زمان" },
    tasksCompleted: "تسک‌های تکمیل‌شده",
    tasksWorkedOn: "تسک‌های کار‌شده",
    activeDays: "روزهای فعال",
    projectsLabel: "پروژه",
    personalTasksShort: "شخصی",
    projectTasksShort: "پروژه‌ای",
    activityTitle: "فعالیت",
    tasksCompletedShort: "تسک تکمیل‌شده",
    tasksCreatedShort: "تسک ایجادشده",
    notesCreatedShort: "یادداشت ایجادشده",
    projectsUpdatedShort: "پروژه بروزرسانی‌شده",
    less: "کمتر",
    more: "بیشتر",
    projectProgressTitle: "پیشرفت پروژه‌ها",
    noProjects: "هنوز پروژه‌ای نیست",
    taskCompletionTitle: "وضعیت تسک‌ها",
    completionLabels: { completed: "تکمیل‌شده", inProgress: "در حال انجام", todo: "برنامه‌ریزی‌نشده" },
    insightsTitle: "بینش‌ها",
    mostActiveProject: "پرکارترین پروژه",
    mostActiveDay: "پرکارترین روز",
    tasksLabel: "تسک",
    ofActivity: "از کل فعالیتت",
    completedTasksShort: "تسک تکمیل‌شده",
    noData: "هنوز داده‌ی کافی نیست",
  },
};

export default function ProgressPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const dir = language === "fa" ? "rtl" : "ltr";

  const [range, setRange] = useState("30d");

  // هر بار که این صفحه mount می‌شه، آخرین وضعیت سه منبع رو می‌خونه — Progress چیزی رو خودش نمی‌نویسه
  const [projects] = useState(getProjects);
  const [personalTasks] = useState(getPersonalTasks);
  const [notes] = useState(getNotes);

  const overview = useMemo(
    () => computeOverview(projects, personalTasks, range),
    [projects, personalTasks, range]
  );

  const projectProgress = useMemo(() => computeProjectProgress(projects), [projects]);

  const taskCompletion = useMemo(
    () => computeTaskCompletion(projects, personalTasks),
    [projects, personalTasks]
  );

  const activityDays = useMemo(
    () => computeActivity(projects, personalTasks, notes, range),
    [projects, personalTasks, notes, range]
  );

  const insights = useMemo(
    () => computeInsights(projects, personalTasks, activityDays),
    [projects, personalTasks, activityDays]
  );

  return (
    <div dir={dir} className="min-h-screen w-full text-black dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-20 md:py-25">
        {/* Header */}
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="hidden md:block text-2xl font-medium tracking-tight sm:text-3xl">{t.pageTitle}</h1>
          <RangeSelector range={range} setRange={setRange} t={t} />
        </div>

        {/* 01 — Overview */}
        <ProgressOverview overview={overview} t={t} />

        {/* 02 — Activity */}
        <ActivityHeatmap days={activityDays} t={t} />

        {/* 03 — Projects / Task Completion */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <ProjectProgressPanel projects={projectProgress} t={t} />
          <TaskCompletionPanel completion={taskCompletion} t={t} />
        </div>

        {/* 04 — Insights */}
        <InsightsPanel insights={insights} t={t} />
      </div>
    </div>
  );
}