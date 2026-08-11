import { useState, useRef, useCallback, useMemo } from "react";

/* ---------------------------------------------------------------------- */
/*  Pixel ruler — draggable base-size control                              */
/*  Always kept dir="ltr": it's a physical/numeric control, so low value   */
/*  stays on the left and high value on the right regardless of language.  */
/* ---------------------------------------------------------------------- */

export function PixelRuler({ value, min = 8, max = 72, onChange }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback(
    (clientX) => {
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      onChange(Math.round(min + pct * (max - min)));
    },
    [min, max, onChange]
  );

  const onPointerDown = (e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => dragging && updateFromClientX(e.clientX);
  const onPointerUp = (e) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(Math.min(max, value + 1));
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(Math.max(min, value - 1));
  };

  const ticks = useMemo(() => {
    const arr = [];
    for (let v = min; v <= max; v++) arr.push(v);
    return arr;
  }, [min, max]);

  return (
    <div
      ref={trackRef}
      dir="ltr"
      role="slider"
      tabIndex={0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      className="relative flex h-10 items-end justify-between gap-px px-0.5 outline-none cursor-ew-resize select-none touch-none"
    >
      {ticks.map((v) => {
        const isMajor = v % 10 === 0;
        const isActive = v === value;
        return (
          <span
            key={v}
            className={
              isActive
                ? "relative w-1 bg-black dark:bg-white"
                : isMajor
                ? "w-px bg-neutral-300 dark:bg-neutral-700"
                : "w-px bg-neutral-200 dark:bg-neutral-800"
            }
            style={{ height: isActive ? 28 : isMajor ? 18 : 10 }}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black dark:bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.25)] dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.35)]" />
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Mini range slider (weight / leading / tracking)                        */
/* ---------------------------------------------------------------------- */

export function MiniSlider({ label, value, min, max, step, unit = "", onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-secondary">{label}</span>
        <span dir="ltr" className="text-xs tabular-nums text-black dark:text-neutral-200">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="ts-range h-[2px] w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-800 accent-black dark:accent-white"
      />
    </label>
  );
}

/* ---------------------------------------------------------------------- */
/*  Pill / chip selector button                                            */
/* ---------------------------------------------------------------------- */

export function Chip({ active, onClick, children, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-3.5 py-1.5 text-[13px] transition-colors cursor-pointer " +
        (active
          ? "bg-black dark:bg-neutral-100 font-medium text-white dark:text-black"
          : "border-primary text-secondary hover:text-black dark:hover:text-white")
      }
    >
      {children}
      {sub !== undefined && (
        <span dir="ltr" className="ml-1.5 tabular-nums opacity-60">
          {sub}
        </span>
      )}
    </button>
  );
}