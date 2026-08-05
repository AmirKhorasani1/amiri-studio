import React, { useState } from "react";
import { X } from "lucide-react";

export default function ChecklistEditor({ checklist, onToggle, onAdd, onRemove }) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onAdd(text);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-1.5">
      {checklist.map((item) => (
        <div
          key={item.id}
          className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-neutral-800/60"
        >
          <button
            onClick={() => onToggle(item.id)}
            className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${
              item.checked
                ? "bg-[#5b8cff] border-[#5b8cff]"
                : "border-neutral-600"
            }`}
          >
            {item.checked && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <span
            className={`text-sm flex-1 ${
              item.checked ? "text-neutral-500 line-through" : "text-neutral-200"
            }`}
          >
            {item.text}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400"
          >
            <X size={13} />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-2 px-2 py-1.5">
        <div className="w-4 h-4 rounded border border-dashed border-neutral-700 shrink-0" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add checklist item…"
          className="bg-transparent outline-none text-sm placeholder:text-neutral-600 flex-1"
        />
      </div>
    </div>
  );
}