import React, { useState } from "react";
import { Paperclip, X } from "lucide-react";

export default function AttachmentsEditor({ attachments, onAdd, onRemove }) {
  const [draft, setDraft] = useState("");
  const submit = () => {
    const name = draft.trim();
    if (!name) return;
    onAdd(name);
    setDraft("");
  };
  return (
    <div className="flex flex-col gap-1.5">
      {attachments.map((a) => (
        <div
          key={a.id}
          className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-neutral-800/60"
        >
          <Paperclip size={13} className="text-neutral-500 shrink-0" />
          <span className="text-sm text-neutral-300 flex-1 truncate">{a.name}</span>
          <button
            onClick={() => onRemove(a.id)}
            className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400"
          >
            <X size={13} />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Paperclip size={13} className="text-neutral-700 shrink-0" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add attachment name…"
          className="bg-transparent outline-none text-sm placeholder:text-neutral-600 flex-1"
        />
      </div>
    </div>
  );
}