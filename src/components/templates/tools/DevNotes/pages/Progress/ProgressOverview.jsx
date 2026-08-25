import React from "react";

function Stat({ value, label, sub }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-100 sm:text-3xl">
        {value}
      </span>
      <span className="text-xs text-secondary sm:text-sm">{label}</span>
      {sub && <span className="text-[11px] text-secondary/70">{sub}</span>}
    </div>
  );
}

export default function ProgressOverview({ overview, t }) {
  return (
    <div className="rounded-lg border-primary px-5 py-5">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <Stat
          value={overview.tasksCompleted}
          label={t.tasksCompleted}
          sub={`${overview.personalCompleted} ${t.personalTasksShort} · ${overview.projectCompleted} ${t.projectTasksShort}`}
        />
        <Stat value={overview.tasksWorkedOn} label={t.tasksWorkedOn} />
        <Stat value={overview.activeDays} label={t.activeDays} />
        <Stat value={overview.projectsTouched} label={t.projectsLabel} />
      </div>
    </div>
  );
}