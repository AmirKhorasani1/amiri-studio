import React from "react";

export default function ProgressBar({ value }) {
  if (value === null) return null;
  return (
    <div className="w-full h-1 rounded-full bg-neutral-800 overflow-hidden">
      <div
        className="h-full rounded-full bg-[#5b8cff] transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}