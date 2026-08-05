import React from "react";
import { Copy, Trash2, X } from "lucide-react";
import { PRIORITIES, STATUSES, REMINDERS } from "../utils/constants";
import { uid, todayISO, addDays } from "../utils/helpers";
import StatusDot from "./StatusDot";
import ProgressBar from "./ProgressBar";
import ChecklistEditor from "./ChecklistEditor";
import Field from "./Field";
import AttachmentsEditor from "./AttachmentsEditor";

export default function SidePanel({ task, onClose, onChange, onDelete, onDuplicate }) {
  if (!task) return null;

  const total = task.checklist.length;
  const checked = task.checklist.filter((c) => c.checked).length;
  const progress = total > 0 ? Math.round((checked / total) * 100) : 0;

  const patch = (fields) => onChange(task.id, fields);

  const toggleChecklistItem = (itemId) => {
    const updated = task.checklist.map((c) =>
      c.id === itemId ? { ...c, checked: !c.checked } : c
    );
    const allChecked = updated.length > 0 && updated.every((c) => c.checked);
    patch({
      checklist: updated,
      status: allChecked ? "completed" : task.status,
    });
  };

  const addChecklistItem = (text) => {
    patch({ checklist: [...task.checklist, { id: uid(), text, checked: false }] });
  };

  const removeChecklistItem = (itemId) => {
    patch({ checklist: task.checklist.filter((c) => c.id !== itemId) });
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-neutral-950 border-l border-neutral-800 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <StatusDot status={task.status} />
            <span className="text-xs text-neutral-500">
              {STATUSES[task.status].label}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onDuplicate(task)}
              className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100"
              title="Duplicate"
            >
              <Copy size={15} />
            </button>
            <button
              onClick={() => onDelete(task)}
              className="p-1.5 rounded-md hover:bg-red-500/10 text-neutral-400 hover:text-red-400"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
          <input
            value={task.title}
            onChange={(e) => patch({ title: e.target.value })}
            className="bg-transparent outline-none text-xl font-semibold text-neutral-100 w-full"
          />

          <textarea
            value={task.description}
            onChange={(e) => patch({ description: e.target.value })}
            placeholder="Add a description…"
            rows={3}
            className="bg-transparent outline-none text-sm text-neutral-300 placeholder:text-neutral-600 resize-none w-full"
          />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <select
                value={task.status}
                onChange={(e) => patch({ status: e.target.value })}
                className="field-input"
              >
                {Object.entries(STATUSES).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Priority">
              <select
                value={task.priority}
                onChange={(e) => patch({ priority: e.target.value })}
                className="field-input"
              >
                {Object.entries(PRIORITIES).map(([key, p]) => (
                  <option key={key} value={key}>
                    {p.emoji} {p.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Due Date">
              <input
                type="date"
                value={task.dueDate ?? ""}
                onChange={(e) => patch({ dueDate: e.target.value || null })}
                className="field-input"
              />
            </Field>

            <Field label="Reminder">
              <select
                value={task.reminder}
                onChange={(e) => {
                  const reminder = e.target.value;
                  patch({
                    reminder,
                    reminderDate:
                      reminder === "today"
                        ? todayISO()
                        : reminder === "tomorrow"
                        ? addDays(1)
                        : reminder === "custom"
                        ? task.reminderDate ?? todayISO()
                        : null,
                  });
                }}
                className="field-input"
              >
                {Object.entries(REMINDERS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>

            {task.reminder === "custom" && (
              <Field label="Reminder Date">
                <input
                  type="date"
                  value={task.reminderDate ?? ""}
                  onChange={(e) => patch({ reminderDate: e.target.value })}
                  className="field-input"
                />
              </Field>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Checklist
              </p>
              {total > 0 && (
                <span className="text-xs text-neutral-500">{progress}%</span>
              )}
            </div>
            {total > 0 && (
              <div className="mb-2">
                <ProgressBar value={progress} />
              </div>
            )}
            <ChecklistEditor
              checklist={task.checklist}
              onToggle={toggleChecklistItem}
              onAdd={addChecklistItem}
              onRemove={removeChecklistItem}
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-2">
              Attachments
            </p>
            <AttachmentsEditor
              attachments={task.attachments}
              onAdd={(name) =>
                patch({ attachments: [...task.attachments, { id: uid(), name }] })
              }
              onRemove={(id) =>
                patch({ attachments: task.attachments.filter((a) => a.id !== id) })
              }
            />
          </div>

          <div className="text-[11px] text-neutral-600 flex flex-col gap-0.5 pt-2 border-t border-neutral-800">
            <span>Created {new Date(task.createdAt).toLocaleString()}</span>
            <span>Updated {new Date(task.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}