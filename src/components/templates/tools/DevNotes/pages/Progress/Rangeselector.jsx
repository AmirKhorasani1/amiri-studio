import React from "react";

export default function RangeSelector({ range, setRange, t }) {
  const options = ["7d", "30d", "90d", "all"];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setRange(opt)}
          className={`dn-tab ${range === opt ? "dn-tab-active" : "dn-tab-inactive"}`}
        >
          {t.rangeOptions[opt]}
        </button>
      ))}
    </div>
  );
}