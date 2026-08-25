import React from "react";

function levelFor(total, max) {
  if (total === 0 || max === 0) return 0;
  const ratio = total / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

const LEVEL_ALPHA = ["10", "35", "60", "85", "ff"];

export default function ActivityHeatmap({ days, accent = "#22c55e", t }) {
  const max = Math.max(...days.map((d) => d.total), 0);

  const tooltip = (d) => {
    const date = new Date(`${d.date}T00:00:00`).toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    return [
      date,
      `${d.tasksCompleted} ${t.tasksCompletedShort}`,
      `${d.tasksCreated} ${t.tasksCreatedShort}`,
      `${d.notesCreated} ${t.notesCreatedShort}`,
      `${d.projectsUpdated} ${t.projectsUpdatedShort}`,
    ].join("\n");
  };

  return (
    <div className="rounded-lg border-primary px-5 py-5">
      <p className="mb-4 text-sm font-medium text-neutral-950 dark:text-neutral-100">
        {t.activityTitle}
      </p>

      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {days.map((d) => {
          const level = levelFor(d.total, max);
          return (
            <span
              key={d.date}
              title={tooltip(d)}
              className="h-3.5 w-3.5 shrink-0 rounded-[3px] duration-150 hover:scale-125"
              style={{
                backgroundColor:
                  level === 0 ? "var(--dn-heatmap-empty, rgba(120,120,120,0.12))" : `${accent}${LEVEL_ALPHA[level]}`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-secondary">
        <span>{t.less}</span>
        {LEVEL_ALPHA.map((alpha, i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-[3px]"
            style={{
              backgroundColor:
                i === 0 ? "var(--dn-heatmap-empty, rgba(120,120,120,0.12))" : `${accent}${alpha}`,
            }}
          />
        ))}
        <span>{t.more}</span>
      </div>
    </div>
  );
}