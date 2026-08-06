import React, { useState } from "react";
import { X } from "lucide-react";
import { PRIORITIES, STATUSES, REMINDERS } from "../utils/constants";
import { uid, todayISO, addDays } from "../utils/helpers";
import StatusDot from "./StatusDot";
import Field from "./Field";

export default function NewTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("none");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("none");
  const [reminderDate, setReminderDate] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [checklistDraft, setChecklistDraft] = useState("");

  const addChecklistItem = () => {
    const text = checklistDraft.trim();
    if (!text) return;
    setChecklist((c) => [...c, { id: uid(), text, checked: false }]);
    setChecklistDraft("");
  };

  const submit = () => {
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate || null,
      reminder,
      reminderDate:
        reminder === "today"
          ? todayISO()
          : reminder === "tomorrow"
          ? addDays(1)
          : reminder === "custom"
          ? reminderDate || todayISO()
          : null,
      checklist,
      attachments: [],
    });
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl mt-10 sm:mt-0 shadow-2xl"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
            <p className="text-sm font-semibold text-neutral-100">New Task</p>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="bg-transparent outline-none text-base font-medium placeholder:text-neutral-600 border-b border-neutral-800 pb-2"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="bg-transparent outline-none text-sm placeholder:text-neutral-600 resize-none"
            />

            <div>
              <p className="text-[11px] text-neutral-500 mb-1.5">Priority</p>
              <div className="flex items-center gap-1.5">
                {Object.entries(PRIORITIES).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => setPriority(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border ${
                      priority === key
                        ? "border-neutral-600 bg-neutral-800 text-neutral-100"
                        : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
                    }`}
                  >
                    <span>{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] text-neutral-500 mb-1.5">Status</p>
              <div className="flex items-center gap-1.5">
                {Object.entries(STATUSES).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() => setStatus(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border ${
                      status === key
                        ? "border-neutral-600 bg-neutral-800 text-neutral-100"
                        : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
                    }`}
                  >
                    <StatusDot status={key} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Due Date">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Reminder">
                <select
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="field-input"
                >
                  {Object.entries(REMINDERS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              {reminder === "custom" && (
                <Field label="Reminder Date">
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="field-input"
                  />
                </Field>
              )}
            </div>

            <div>
              <p className="text-[11px] text-neutral-500 mb-1.5">Checklist</p>
              <div className="flex flex-col gap-1">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 text-sm text-neutral-300 px-1 py-1"
                  >
                    <div className="w-3.5 h-3.5 rounded border border-neutral-600 shrink-0" />
                    {item.text}
                    <button
                      onClick={() =>
                        setChecklist((c) => c.filter((i) => i.id !== item.id))
                      }
                      className="ml-auto text-neutral-600 hover:text-red-400"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-1 py-1">
                  <div className="w-3.5 h-3.5 rounded border border-dashed border-neutral-700 shrink-0" />
                  <input
                    value={checklistDraft}
                    onChange={(e) => setChecklistDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                    placeholder="Add checklist item and press Enter"
                    className="bg-transparent outline-none text-sm placeholder:text-neutral-600 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-neutral-800">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-900"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={!title.trim()}
              className="px-3.5 py-2 rounded-lg text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}