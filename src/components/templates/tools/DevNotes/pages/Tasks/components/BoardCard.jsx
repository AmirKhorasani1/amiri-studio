import React from "react";
import {
  Pencil,
  Copy,
  Trash2,
  CalendarDays,
  ListChecks,
  Target,
} from "lucide-react";
import { relativeDayLabel } from "../utils/helpers";
import { PRIORITY_STYLES, TYPE_ICONS, DEFAULT_TYPE_ICON } from "../utils/badgeStyles";

export default function BoardCard({
  task,
  onOpen,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  const priority = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.none;
  const Icon = TYPE_ICONS[task.type] ?? DEFAULT_TYPE_ICON;

  const total = task.checklist?.length ?? 0;
  const checked = task.checklist?.filter((c) => c.checked).length ?? 0;

  const hasMeta = task.dueDate || total > 0 || task.priority;

  return (
    <div
      onClick={() => onOpen(task)}
      className="group rounded-lg border border-[#303030] bg-neutral-950/40 hover:border-neutral-700 transition-colors p-4 cursor-pointer flex flex-col gap-3"
    >
      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon size={17} className="text-neutral-400 shrink-0" />
          <span
            className={`text-sm font-semibold truncate ${
              task.status === "completed"
                ? "text-neutral-500 line-through"
                : "text-neutral-100"
            }`}
          >
            {task.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 invisible group-hover:visible">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(task);
            }}
            className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100"
            title="Duplicate"
          >
            <Copy size={15} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            className="p-1.5 rounded-md hover:bg-red-500/10 text-neutral-400 hover:text-red-400"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Meta grid: due date / checklist / priority */}
      {hasMeta ? (
        <div className="grid grid-cols-3 gap-3 pt-4 mt-1 border-t border-[#303030] -mx-4 px-4">
          <div
            className={`flex items-center gap-1.5 text-sm rounded-md transition-colors ${
              task.dueDate
                ? "text-neutral-400 hover:text-neutral-100"
                : "text-neutral-700"
            }`}
          >
            <CalendarDays size={15} className="shrink-0" />
            <span className="truncate">
              {task.dueDate ? relativeDayLabel(task.dueDate) : "—"}
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 text-sm rounded-md transition-colors justify-center ${
              total > 0
                ? "text-neutral-400 hover:text-neutral-100"
                : "text-neutral-700"
            }`}
          >
            <ListChecks size={15} className="shrink-0" />
            <span className="truncate">
              {total > 0 ? `${checked}/${total}` : "—"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm rounded-md transition-colors justify-end text-neutral-400 hover:text-neutral-100">
            <Target size={15} className="shrink-0" />
            <span className="truncate">{priority.label}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}