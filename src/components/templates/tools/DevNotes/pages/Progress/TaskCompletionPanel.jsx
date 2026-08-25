import React from "react";

const ROWS = [
  { key: "completed", hex: "#22c55e" },
  { key: "inProgress", hex: "#3b82f6" },
  { key: "todo", hex: "#a3a3a3" },
];

export default function TaskCompletionPanel({ completion, t }) {
  const max = Math.max(completion.completed, completion.inProgress, completion.todo, 1);

  return (
    <div className="flex-1 rounded-lg border-primary px-5 py-5">
      <p className="mb-4 text-sm font-medium text-neutral-950 dark:text-neutral-100">
        {t.taskCompletionTitle}
      </p>

      <div className="flex flex-col gap-3">
        {ROWS.map((row) => (
          <div key={row.key}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-secondary">{t.completionLabels[row.key]}</span>
              <span className="font-medium text-neutral-950 dark:text-neutral-100">
                {completion[row.key]}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div
                className="h-full rounded-full duration-300"
                style={{
                  width: `${(completion[row.key] / max) * 100}%`,
                  backgroundColor: row.hex,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}