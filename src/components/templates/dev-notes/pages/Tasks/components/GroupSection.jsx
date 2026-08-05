import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function GroupSection({ title, count, collapsed, onToggle, children }) {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-1.5 px-1 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 hover:text-neutral-200"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
        {title}
        <span className="text-neutral-600 font-normal normal-case">
          {count}
        </span>
      </button>
      {!collapsed && <div className="flex flex-col gap-2 mt-1">{children}</div>}
    </div>
  );
}