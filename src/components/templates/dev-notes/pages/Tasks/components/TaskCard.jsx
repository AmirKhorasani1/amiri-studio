import React from "react";
import { Pencil, Copy, Trash2 } from "lucide-react";
import { relativeDayLabel } from "../utils/helpers";
import { STATUS_STYLES, PRIORITY_STYLES } from "../utils/badgeStyles";
import Badge from "./Badge";

export default function TaskCard({
  task,
  onOpen,
  onEdit,
  onDuplicate,
  onDelete,
  onCycleStatus,
}) {
  const status = STATUS_STYLES[task.status] ?? STATUS_STYLES.todo;
  const priority = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.none;

  return (
    <div
      onClick={() => onOpen(task)}
      className="group grid grid-cols-[minmax(220px,2.2fr)_150px_140px_120px_1fr_170px] items-center gap-3 px-4 py-3 border-b border-[#303030] hover:bg-neutral-900/60 cursor-pointer transition-colors"
    >
      {/* Task name */}
      <div className="min-w-0 flex items-center gap-2">
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

      {/* Status */}
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCycleStatus(task);
          }}
        >
          <Badge bg={status.bg} text={status.text}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: status.dot }}
            />
            {status.label}
          </Badge>
        </button>
      </div>

      {/* Due date */}
      <div className="text-xs text-neutral-300">
        {task.dueDate ? relativeDayLabel(task.dueDate) : (
          <span className="text-neutral-700">—</span>
        )}
      </div>

      {/* Priority */}
      <div>
        <Badge bg={priority.bg} text={priority.text}>
          {priority.label}
        </Badge>
      </div>

      {/* Description */}
      <div className="min-w-0">
        <p className="text-xs text-neutral-500 truncate">
          {task.description || <span className="text-neutral-700">—</span>}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1">
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
  );
}