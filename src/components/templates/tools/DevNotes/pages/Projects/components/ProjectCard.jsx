import React from "react";
import { Trash2 } from "lucide-react";
import { PROJECT_COLORS, PROJECT_ICONS, PROJECT_STATUSES } from "../utils/projectConstants";
import { formatRelativeTime } from "../utils/projectStorage";

export default function ProjectCard({ project, onOpen, onDelete, t, lang }) {
  const colorMeta = PROJECT_COLORS.find((c) => c.id === project.color);
  const iconMeta = PROJECT_ICONS.find((i) => i.id === project.icon) ?? PROJECT_ICONS[0];
  const statusMeta =
    PROJECT_STATUSES.find((s) => s.id === project.status) ?? PROJECT_STATUSES[1];
  const Icon = iconMeta.Icon;
  const accent = colorMeta?.hex ?? "#6b7280";

  const total = project.tasks.length;
  const done = project.tasks.filter((task) => task.done).length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;
  const techStack = project.techStack ?? [];

  return (
    <div
      onClick={() => onOpen(project)}
      className="group relative flex cursor-pointer flex-col gap-3 rounded-3xl p-5 duration-300 hover:scale-99 hover:translate-y-0.5 active:scale-99 border border-white/0 bg-white hover:border-neutral-400 dark:border-[#303030] dark:bg-black dark:hover:border-neutral-700"
    >
      {/* Title + status */}
      <div className="flex min-w-0 items-center justify-between gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: `${accent}22`, color: accent }}
          >
            <Icon size={18} />
          </span>
          <p className="min-w-0 truncate text-sm md:text-[15.5px] font-semibold text-neutral-950 dark:text-neutral-100">
            {project.name}
          </p>
        </div>

        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium"
          style={{ backgroundColor: `${statusMeta.hex}1f`, color: statusMeta.hex }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: statusMeta.hex }}
          />
          {t.statusLabels[project.status] ?? project.status}
        </span>
      </div>

      <p className="line-clamp-2 min-h-[2.6em] text-[13px] text-secondary">
        {project.description ? project.description : t.noDescription}
      </p>

      {techStack.length > 0 && (
        <p className="truncate text-[12px] text-secondary">{techStack.join(" · ")}</p>
      )}

      <div className="mt-1 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full rounded-full duration-300"
            style={{ width: `${progress}%`, backgroundColor: accent }}
          />
        </div>
        <span className="shrink-0 text-[11px] font-medium text-secondary">
          {done}/{total}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-secondary">
        <span>
          {total} {t.tasksLabel}
        </span>
        <span>
          {t.updated} {formatRelativeTime(project.updatedAt, lang)}
        </span>
      </div>
    </div>
  );
}