import React from "react";

export default function InsightsPanel({ insights, t }) {
  return (
    <div className="rounded-lg border-primary px-5 py-5">
      <p className="mb-4 text-sm font-medium text-neutral-950 dark:text-neutral-100">
        {t.insightsTitle}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs text-secondary">{t.mostActiveProject}</p>
          {insights.topProject ? (
            <p className="text-sm text-neutral-950 dark:text-neutral-100">
              <span className="font-semibold">{insights.topProject.name}</span>
              <span className="text-secondary">
                {" — "}
                {insights.topProject.count} {t.tasksLabel} · {insights.topProject.percent}%{" "}
                {t.ofActivity}
              </span>
            </p>
          ) : (
            <p className="text-sm text-secondary">{t.noData}</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-xs text-secondary">{t.mostActiveDay}</p>
          {insights.topDay ? (
            <p className="text-sm text-neutral-950 dark:text-neutral-100">
              <span className="font-semibold">{insights.topDay.weekday}</span>
              <span className="text-secondary">
                {" — "}
                {insights.topDay.completed} {t.completedTasksShort}
              </span>
            </p>
          ) : (
            <p className="text-sm text-secondary">{t.noData}</p>
          )}
        </div>
      </div>
    </div>
  );
}