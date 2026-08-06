import React from "react";

export default function Badge({ children, bg, text }) {
  return (
    <span
      className={`text-xs font-medium whitespace-nowrap ${text}`}
    >
      {children}
    </span>
  );
}