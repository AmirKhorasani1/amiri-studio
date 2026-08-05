import React from "react";
import { CaseSensitive, CircleDashed, CalendarDays, Target, AlignLeft, MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";

function ListHeader() {
  return (
    <div className="grid grid-cols-[minmax(220px,2.2fr)_150px_140px_120px_1fr_170px] items-center gap-3 px-4 py-3.5 border-b border-[#303030] text-sm text-neutral-300 font-medium">
      <div className="flex items-center gap-1.5">
        <CaseSensitive size={19} className="text-neutral-300" />
        Task name
      </div>
      <div className="flex items-center gap-1.5">
        <CircleDashed size={19} className="text-neutral-300" />
        Status
      </div>
      <div className="flex items-center gap-1.5">
        <CalendarDays size={19} className="text-neutral-300" />
        Due date
      </div>
      <div className="flex items-center gap-1.5">
        <Target size={19} className="text-neutral-300" />
        Priority
      </div>
      <div className="flex items-center gap-1.5">
        <AlignLeft size={19} className="text-neutral-300" />
        Description
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <MoreHorizontal size={19} className="text-neutral-300" />
        Actions
      </div>
    </div>
  );
}

export default function ListView({ tasks, ...cardHandlers }) {
  return (
    <div className="overflow-hidden">
      <ListHeader />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} {...cardHandlers} />
      ))}
      {tasks.length === 0 && (
        <div className="text-sm text-neutral-600 py-16 text-center">
          No tasks match your filters.
        </div>
      )}
    </div>
  );
}