import React from "react";
import { STATUSES } from "../utils/constants";

export default function StatusDot({ status }) {
  const s = STATUSES[status] ?? STATUSES.todo;
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: s.dot }}
    />
  );
}