import React from "react";
import { Plus } from "lucide-react";
import { STATUSES } from "../utils/constants";
import { STATUS_STYLES } from "../utils/badgeStyles";
import BoardCard from "./BoardCard";

const COLUMN_THEME = {
  todo: {
    colBg: "bg-neutral-900/30",
    colBorder: "border-neutral-800",
    newTaskText: "text-neutral-300",
  },
  "in-progress": {
    colBg: "bg-sky-950/20",
    colBorder: "border-sky-900/40",
    newTaskText: "text-sky-400",
  },
  completed: {
    colBg: "bg-emerald-950/20",
    colBorder: "border-emerald-900/40",
    newTaskText: "text-emerald-400",
  },
};

export default function BoardView({ tasks, onNewTask, ...cardHandlers }) {
  const columns = ["todo", "in-progress", "completed"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      {columns.map((key) => {
        const items = tasks.filter((t) => t.status === key);
        const status = STATUS_STYLES[key] ?? STATUS_STYLES.todo;
        const theme = COLUMN_THEME[key];

        return (
          <div
            key={key}
            className={`flex flex-col gap-3`}
          >
            {/* Column header */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: status.dot }}
                />
                {STATUSES[key].label}
              </span>
              <span className={`text-xs font-medium ${theme.newTaskText}`}>
                ({items.length})
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5 min-h-[60px]">
              {items.map((task) => (
                <BoardCard key={task.id} task={task} {...cardHandlers} />
              ))}
              {items.length === 0 && (
                <div className="text-xs text-neutral-700 border border-dashed border-neutral-800 rounded-xl py-6 text-center">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}