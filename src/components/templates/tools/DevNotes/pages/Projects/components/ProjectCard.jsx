import React from "react";
import { Trash2 } from "lucide-react";
import { PROJECT_COLORS, PROJECT_ICONS } from "../utils/projectConstants";

export default function ProjectCard({ project, onOpen, onDelete, t }) {
  const colorMeta = PROJECT_COLORS.find((c) => c.id === project.color);
  const iconMeta = PROJECT_ICONS.find((i) => i.id === project.icon) ?? PROJECT_ICONS[0];
  const Icon = iconMeta.Icon;
  const accent = colorMeta?.hex ?? "#6b7280";

  const total = project.tasks.length;
  const done = project.tasks.filter((task) => task.done).length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div
      onClick={() => onOpen(project)}
      className={`group relative flex cursor-pointer flex-col gap-3 rounded-lg p-5 duration-300 hover:scale-99 hover:translate-y-0.5 active:scale-99 ${
        colorMeta
          ? `dn-note-color-${colorMeta.id}`
          : "border border-neutral-300 bg-white hover:border-neutral-400 dark:border-[#303030] dark:bg-neutral-950 dark:hover:border-neutral-700"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project);
        }}
        className="dn-editor-btn absolute top-3 text-secondary opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100 ltr:right-3 rtl:left-3"
        title={t.delete}
      >
        <Trash2 size={15} />
      </button>

      <div className="flex min-w-0 items-center gap-2.5 pe-7">
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

      <p className="line-clamp-2 min-h-[2.6em] text-[13px] text-secondary">
        {project.description ? project.description : t.noDescription}
      </p>

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
    </div>
  );
}