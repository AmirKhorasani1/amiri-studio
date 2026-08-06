import React from "react";
import { PRIORITIES } from "../utils/constants";

export default function PriorityDot({ priority }) {
  const p = PRIORITIES[priority] ?? PRIORITIES.none;
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: p.dot }}
      title={p.label}
    />
  );
}