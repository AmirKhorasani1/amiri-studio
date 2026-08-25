import React from "react";
import { PROJECT_COLORS } from "../Projects/utils/projectConstants";

export default function ProjectProgressPanel({ projects, t }) {
  const top = projects.slice(0, 5);

  return (
    <div className="flex-1 rounded-lg border-primary px-5 py-5">
      <p className="mb-4 text-sm font-medium text-neutral-950 dark:text-neutral-100">
        {t.projectProgressTitle}
      </p>

      {top.length === 0 ? (
        <p className="py-6 text-center text-sm text-secondary">{t.noProjects}</p>
      ) : (
        <div className="flex flex-col gap-3.5">
          {top.map((p) => {
            const accent = PROJECT_COLORS.find((c) => c.id === p.color)?.hex ?? "#6b7280";
            return (
              <div key={p.id}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="truncate font-medium text-neutral-950 dark:text-neutral-100">
                    {p.name}
                  </span>
                  <span className="shrink-0 text-secondary">{p.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <div
                    className="h-full rounded-full duration-300"
                    style={{ width: `${p.progress}%`, backgroundColor: accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}