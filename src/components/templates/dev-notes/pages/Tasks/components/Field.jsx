import React from "react";

export default function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] text-neutral-500">{label}</label>
      {children}
    </div>
  );
}