import { useState, useRef, useCallback, useMemo } from "react";

/* ---------------------------------------------------------------------- */
/*  Draggable ruler — generic version of the one used in TypeScale.        */
/*  Always dir="ltr": a physical/numeric control shouldn't mirror in RTL.  */
/* ---------------------------------------------------------------------- */

export function DraggableRuler({ value, min, max, step = 1, onChange }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback(
    (clientX) => {
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const raw = min + pct * (max - min);
      onChange(Math.round(raw / step) * step);
    },
    [min, max, step, onChange]
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
    if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(Math.min(max, value + step));
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(Math.max(min, value - step));
  };

  const tickCount = 40;
  const ticks = useMemo(() => Array.from({ length: tickCount + 1 }, (_, i) => min + (i / tickCount) * (max - min)), [min, max]);
  const activeIndex = Math.round(((value - min) / (max - min)) * tickCount);

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
      className="relative flex h-9 items-end justify-between gap-px px-0.5 outline-none cursor-ew-resize select-none touch-none"
    >
      {ticks.map((_, i) => {
        const isMajor = i % 10 === 0;
        const isActive = i === activeIndex;
        return (
          <span
            key={i}
            className={
              isActive
                ? "relative w-1 bg-black dark:bg-white"
                : isMajor
                ? "w-px bg-neutral-300 dark:bg-neutral-700"
                : "w-px bg-neutral-200 dark:bg-neutral-800"
            }
            style={{ height: isActive ? 26 : isMajor ? 16 : 9 }}
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
/*  Mini range slider                                                      */
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
        className="al-range h-[2px] w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-800 accent-black dark:accent-white"
      />
    </label>
  );
}

/* ---------------------------------------------------------------------- */
/*  Pill / chip selector button                                            */
/* ---------------------------------------------------------------------- */

export function Chip({ active, onClick, children }) {
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
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/*  Bezier curve editor — drag the two control points                      */
/* ---------------------------------------------------------------------- */

const BEZIER_W = 220;
const BEZIER_H = 140;
const PAD = 16;

function toSvgX(x) {
  return PAD + x * (BEZIER_W - PAD * 2);
}
function toSvgY(y) {
  return BEZIER_H - PAD - y * (BEZIER_H - PAD * 2);
}
function fromSvg(clientX, clientY, rect) {
  const x = (clientX - rect.left - PAD) / (BEZIER_W - PAD * 2);
  const y = 1 - (clientY - rect.top - PAD) / (BEZIER_H - PAD * 2);
  return [x, y];
}

export function BezierEditor({ value, onChange }) {
  const svgRef = useRef(null);
  const [dragPoint, setDragPoint] = useState(null); // 0 | 1 | null

  const [x1, y1, x2, y2] = value;

  const handlePointerDown = (index) => (e) => {
    setDragPoint(index);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (dragPoint === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const [rawX, rawY] = fromSvg(e.clientX, e.clientY, rect);
    const x = Math.min(1, Math.max(0, rawX));
    const y = Math.min(1.6, Math.max(-0.6, rawY));
    const next = [...value];
    next[dragPoint * 2] = Math.round(x * 100) / 100;
    next[dragPoint * 2 + 1] = Math.round(y * 100) / 100;
    onChange(next);
  };
  const handlePointerUp = () => setDragPoint(null);

  const p0 = [toSvgX(0), toSvgY(0)];
  const p1 = [toSvgX(x1), toSvgY(y1)];
  const p2 = [toSvgX(x2), toSvgY(y2)];
  const p3 = [toSvgX(1), toSvgY(1)];

  return (
    <svg
      ref={svgRef}
      dir="ltr"
      viewBox={`0 0 ${BEZIER_W} ${BEZIER_H}`}
      width="100%"
      height={BEZIER_H}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="touch-none select-none overflow-visible"
    >
      <rect x={0} y={0} width={BEZIER_W} height={BEZIER_H} rx={10} className="fill-neutral-100 dark:fill-neutral-950" />
      <line x1={p0[0]} y1={p0[1]} x2={p3[0]} y2={p3[1]} className="stroke-neutral-300 dark:stroke-neutral-800" strokeDasharray="2 3" />
      <path
        d={`M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`}
        fill="none"
        className="stroke-black dark:stroke-white"
        strokeWidth={2}
      />
      <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth={1} />
      <line x1={p3[0]} y1={p3[1]} x2={p2[0]} y2={p2[1]} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth={1} />
      <circle cx={p0[0]} cy={p0[1]} r={3} className="fill-neutral-400 dark:fill-neutral-600" />
      <circle cx={p3[0]} cy={p3[1]} r={3} className="fill-neutral-400 dark:fill-neutral-600" />
      <circle
        cx={p1[0]}
        cy={p1[1]}
        r={6}
        className="cursor-grab fill-black dark:fill-white active:cursor-grabbing"
        onPointerDown={handlePointerDown(0)}
      />
      <circle
        cx={p2[0]}
        cy={p2[1]}
        r={6}
        className="cursor-grab fill-black dark:fill-white active:cursor-grabbing"
        onPointerDown={handlePointerDown(1)}
      />
    </svg>
  );
}