import { useCallback, useMemo, useRef, useState } from "react";

const RULER_TICKS = 40;
const BEZIER_W = 220;
const BEZIER_H = 140;
const PAD = 16;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const round = (value, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/* -------------------------------------------------------------------------- */
/* Draggable Ruler                                                            */
/* -------------------------------------------------------------------------- */

export function DraggableRuler({ value, min, max, step = 1, onChange }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const updateValue = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track || max <= min) return;

    const rect = track.getBoundingClientRect();
    if (!rect.width) return;

    const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = min + pct * (max - min);
    const next = Math.round(raw / step) * step;

    onChange(clamp(next, min, max));
  }, [min, max, step, onChange]);

  const handleDown = useCallback((e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateValue(e.clientX);
  }, [updateValue]);

  const handleMove = useCallback((e) => {
    if (dragging) updateValue(e.clientX);
  }, [dragging, updateValue]);

  const handleUp = useCallback((e) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (!["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();

    const direction = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : -1;
    onChange(clamp(value + direction * step, min, max));
  }, [value, min, max, step, onChange]);

  const ticks = useMemo(
    () => Array.from({ length: RULER_TICKS + 1 }, (_, i) => min + (i / RULER_TICKS) * (max - min)),
    [min, max]
  );

  const activeIndex = max > min
    ? Math.round(((value - min) / (max - min)) * RULER_TICKS)
    : 0;

  return (
    <div
      ref={trackRef}
      dir="ltr"
      role="slider"
      tabIndex={0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuestep={step}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      onKeyDown={handleKeyDown}
      className={`relative flex h-9 cursor-ew-resize select-none touch-none items-end justify-between gap-px px-0.5 outline-none ${dragging ? "cursor-grabbing" : ""}`}
    >
      {ticks.map((_, i) => {
        const major = i % 10 === 0;
        const active = i === activeIndex;

        return (
          <span
            key={i}
            className={
              active
                ? "relative w-1 bg-black dark:bg-white"
                : major
                  ? "w-px bg-neutral-300 dark:bg-neutral-700"
                  : "w-px bg-neutral-200 dark:bg-neutral-800"
            }
            style={{ height: active ? 26 : major ? 16 : 9 }}
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

/* -------------------------------------------------------------------------- */
/* Mini Slider                                                                */
/* -------------------------------------------------------------------------- */

export function MiniSlider({ label, value, min, max, step, unit = "", onChange }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-xs text-neutral-500 dark:text-neutral-400">{label}</span>
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
        className="al-range h-[2px] w-full cursor-pointer appearance-none rounded-full bg-neutral-300 accent-black dark:bg-neutral-700 dark:accent-white"
      />
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Chip                                                                       */
/* -------------------------------------------------------------------------- */

export function Chip({ active = false, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
        active
          ? "bg-black font-medium text-white dark:bg-white dark:text-black"
          : "border border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-black dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Bezier Editor                                                              */
/* -------------------------------------------------------------------------- */

const toSvgX = (x) => PAD + x * (BEZIER_W - PAD * 2);
const toSvgY = (y) => BEZIER_H - PAD - y * (BEZIER_H - PAD * 2);

const fromSvg = (clientX, clientY, rect) => {
  const width = BEZIER_W - PAD * 2;
  const height = BEZIER_H - PAD * 2;

  return [
    (clientX - rect.left - PAD) / width,
    1 - (clientY - rect.top - PAD) / height,
  ];
};

export function BezierEditor({ value, onChange }) {
  const svgRef = useRef(null);
  const [dragPoint, setDragPoint] = useState(null);
  const [x1, y1, x2, y2] = value;

  const handleDown = useCallback((index) => (e) => {
    e.stopPropagation();
    setDragPoint(index);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const handleMove = useCallback((e) => {
    if (dragPoint === null || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const [rawX, rawY] = fromSvg(e.clientX, e.clientY, rect);

    const next = [...value];
    next[dragPoint * 2] = round(clamp(rawX, 0, 1));
    next[dragPoint * 2 + 1] = round(clamp(rawY, -0.6, 1.6));

    onChange(next);
  }, [dragPoint, value, onChange]);

  const handleUp = useCallback((e) => {
    setDragPoint(null);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const p0 = [toSvgX(0), toSvgY(0)];
  const p1 = [toSvgX(x1), toSvgY(y1)];
  const p2 = [toSvgX(x2), toSvgY(y2)];
  const p3 = [toSvgX(1), toSvgY(1)];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <svg
        ref={svgRef}
        dir="ltr"
        viewBox={`0 0 ${BEZIER_W} ${BEZIER_H}`}
        width="100%"
        height={BEZIER_H}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        className="block h-auto min-h-[170px] w-full touch-none select-none"
      >
        <rect width={BEZIER_W} height={BEZIER_H} rx={16} className="fill-white dark:fill-neutral-950" />

        <line
          x1={p0[0]} y1={p0[1]}
          x2={p3[0]} y2={p3[1]}
          className="stroke-neutral-300 dark:stroke-neutral-800"
          strokeDasharray="2 3"
        />

        <path
          d={`M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`}
          fill="none"
          className="stroke-black dark:stroke-white"
          strokeWidth={2}
        />

        <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} className="stroke-neutral-400 dark:stroke-neutral-600" />
        <line x1={p3[0]} y1={p3[1]} x2={p2[0]} y2={p2[1]} className="stroke-neutral-400 dark:stroke-neutral-600" />

        <circle cx={p0[0]} cy={p0[1]} r={3} className="fill-neutral-400 dark:fill-neutral-600" />
        <circle cx={p3[0]} cy={p3[1]} r={3} className="fill-neutral-400 dark:fill-neutral-600" />

        <circle
          cx={p1[0]} cy={p1[1]} r={7}
          onPointerDown={handleDown(0)}
          className="cursor-grab fill-black dark:fill-white active:cursor-grabbing"
        />

        <circle
          cx={p2[0]} cy={p2[1]} r={7}
          onPointerDown={handleDown(1)}
          className="cursor-grab fill-black dark:fill-white active:cursor-grabbing"
        />
      </svg>
    </div>
  );
}