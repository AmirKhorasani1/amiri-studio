import { useState, useRef, useCallback, useMemo } from "react";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export function PixelRuler({ value, min = 8, max = 72, onChange }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const update = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (!rect.width) return;
    const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
    onChange(Math.round(min + pct * (max - min)));
  }, [min, max, onChange]);

  const handleDown = useCallback((e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    update(e.clientX);
  }, [update]);

  const handleMove = useCallback((e) => {
    if (dragging) update(e.clientX);
  }, [dragging, update]);

  const handleUp = useCallback((e) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (!["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : -1;
    onChange(clamp(value + dir, min, max));
  }, [value, min, max, onChange]);

  const ticks = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max]
  );

  return (
    <div
      ref={trackRef}
      dir="ltr"
      role="slider"
      tabIndex={0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      onKeyDown={handleKeyDown}
      className={`relative flex h-10 cursor-ew-resize select-none touch-none items-end justify-between gap-px px-0.5 outline-none ${dragging ? "cursor-grabbing" : ""}`}
    >
      {ticks.map((v) => {
        const major = v % 10 === 0;
        const active = v === value;

        return (
          <span
            key={v}
            className={
              active
                ? "relative w-1 bg-black dark:bg-white"
                : major
                  ? "w-px bg-neutral-300 dark:bg-neutral-700"
                  : "w-px bg-neutral-200 dark:bg-neutral-800"
            }
            style={{ height: active ? 28 : major ? 18 : 10 }}
          >
            {active && (
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black shadow-[0_0_8px_2px_rgba(0,0,0,0.25)] dark:bg-white dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.35)]" />
            )}
          </span>
        );
      })}
    </div>
  );
}

export function MiniSlider({ label, value, min, max, step, unit = "", onChange }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-xs text-secondary">{label}</span>
        <span dir="ltr" className="shrink-0 text-xs tabular-nums text-black dark:text-neutral-200">
          {value}{unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ts-range h-[2px] w-full cursor-pointer appearance-none rounded-full bg-neutral-300 accent-black dark:bg-neutral-800 dark:accent-white"
      />
    </label>
  );
}

export function Chip({ active, onClick, children, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
        active
          ? "bg-black font-medium text-white dark:bg-neutral-100 dark:text-black"
          : "border-primary text-secondary hover:text-black dark:hover:text-white"
      }`}
    >
      {children}
      {sub !== undefined && (
        <span dir="ltr" className="ml-1.5 tabular-nums opacity-60">{sub}</span>
      )}
    </button>
  );
}