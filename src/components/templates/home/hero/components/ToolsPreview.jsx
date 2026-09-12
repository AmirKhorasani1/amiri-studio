import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * <ToolsPreview />
 * -------------------------------------------------------------------
 * Live preview for the "Tools" card — Animation Lab / ColorCraft /
 * Type Scale, three mini developer-tool stages that rotate on their
 * own, each dressed up as a tiny running application rather than a
 * few lines of text fading in and out.
 * -------------------------------------------------------------------
 */

const STAGES = ["animation", "color", "type"];
const STAGE_LABELS = {
  animation: "Animation Lab",
  color: "ColorCraft",
  type: "Type Scale",
};
const STAGE_MS = 5000;
const EASE = [0.4, 0, 0.2, 1];

/* ---------------------------- data ------------------------------ */

const EASINGS = [
  { name: "linear", token: "linear", duration: 1.6, ease: "linear" },
  { name: "ease-out", token: "easeOut", duration: 1.7, ease: "easeOut" },
  { name: "ease-in-out", token: "easeInOut", duration: 1.8, ease: "easeInOut" },
  { name: "spring", token: "spring(55, 11)", duration: null, ease: "spring" },
];

const PALETTES = [
  {
    name: "Neutral",
    colors: [
      { step: "100", hex: "#FAFAFA" },
      { step: "300", hex: "#D4D4D4" },
      { step: "500", hex: "#737373" },
      { step: "700", hex: "#404040" },
      { step: "900", hex: "#171717" },
    ],
  },
  {
    name: "Zinc",
    colors: [
      { step: "100", hex: "#F4F4F5" },
      { step: "300", hex: "#D4D4D8" },
      { step: "500", hex: "#71717A" },
      { step: "700", hex: "#3F3F46" },
      { step: "900", hex: "#18181B" },
    ],
  },
  {
    name: "Slate",
    colors: [
      { step: "100", hex: "#F1F5F9" },
      { step: "300", hex: "#CBD5E1" },
      { step: "500", hex: "#64748B" },
      { step: "700", hex: "#334155" },
      { step: "900", hex: "#0F172A" },
    ],
  },
  {
    name: "Stone",
    colors: [
      { step: "100", hex: "#F5F5F4" },
      { step: "300", hex: "#D6D3D1" },
      { step: "500", hex: "#78716C" },
      { step: "700", hex: "#44403C" },
      { step: "900", hex: "#1C1917" },
    ],
  },
];

const SCALES = [
  { ratio: 1.125, name: "Minor Second" },
  { ratio: 1.25, name: "Major Third" },
  { ratio: 1.333, name: "Perfect Fourth" },
];

/* ------------------------ shared chrome -------------------------- */

function PreviewHeader({ stage, stageIndex, reduceMotion }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-neutral-200/70 px-3 py-2.5 dark:border-neutral-700/60">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1 opacity-60">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-[11px] font-medium tracking-tight text-neutral-700 dark:text-neutral-200"
          >
            {STAGE_LABELS[stage]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] tabular-nums text-neutral-400 dark:text-neutral-500">
          0{stageIndex + 1}/0{STAGES.length}
        </span>
      </div>
    </div>
  );
}

function StageIndicator({ activeStage }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-1 border-t border-neutral-200/70 px-3 py-2 dark:border-neutral-700/60">
      {STAGES.map((s) => {
        const isActive = s === activeStage;
        return (
          <div
            key={s}
            className="relative flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors duration-300"
          >
            {isActive && (
              <motion.span
                layoutId="stage-pill"
                className="absolute inset-0 rounded-full bg-neutral-900/[0.05] dark:bg-white/[0.06]"
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}
            <span
              className={`relative h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                isActive
                  ? "bg-neutral-900 dark:bg-white"
                  : "bg-neutral-300 dark:bg-neutral-700"
              }`}
            />
            <span
              className={`relative text-[9px] font-medium capitalize transition-colors duration-300 ${
                isActive
                  ? "text-neutral-700 dark:text-neutral-200"
                  : "text-neutral-400 dark:text-neutral-600"
              }`}
            >
              {s}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------- main ------------------------------- */

export default function ToolsPreview() {
  const [stageIndex, setStageIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const stage = STAGES[stageIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, STAGE_MS);
    return () => clearInterval(id);
  }, []);

  const variants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 6, filter: "blur(3px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -6, filter: "blur(3px)" },
      };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-4xl border border-neutral-200/80 bg-neutral-50 transition-colors duration-500 dark:border-neutral-700/60 dark:bg-neutral-800/80">
      <PreviewHeader stage={stage} stageIndex={stageIndex} reduceMotion={reduceMotion} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3.5 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            className="flex min-h-0 w-full flex-1 flex-col"
          >
            {stage === "animation" && <AnimationLab reduceMotion={reduceMotion} />}
            {stage === "color" && <ColorCraft reduceMotion={reduceMotion} />}
            {stage === "type" && <TypeScale reduceMotion={reduceMotion} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <StageIndicator activeStage={stage} />
    </div>
  );
}

/* ----------------------------------------------------------------
   1. Animation Lab — a small easing playground: a live-moving dot
   with a ghost trail runs the currently active curve on a track,
   while the other easings sit dimmed in a compact list underneath.
----------------------------------------------------------------- */

function AnimationLab({ reduceMotion }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setActive((p) => (p + 1) % EASINGS.length), 2200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const current = EASINGS[active];
  const trackTransition =
    reduceMotion
      ? { duration: 0.3 }
      : current.ease === "spring"
      ? { type: "spring", stiffness: 55, damping: 11, repeat: Infinity, repeatType: "reverse" }
      : { duration: current.duration, ease: current.ease, repeat: Infinity, repeatType: "reverse" };

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2.5">
      {/* live track */}
      <div className="relative shrink-0 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-3 pb-4 pt-3 dark:border-neutral-700/50 dark:bg-neutral-900/50">
        <div className="mb-3 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.name}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.25 }}
              className="text-[12px] font-semibold text-neutral-800 dark:text-neutral-100"
            >
              {current.name}
            </motion.span>
          </AnimatePresence>
          <span className="rounded-full bg-neutral-900/[0.06] px-1.5 py-[2px] text-[8px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
            live
          </span>
        </div>

        <div className="relative h-1 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
          {!reduceMotion && (
            <motion.span
              className="absolute top-1/2 h-3 w-8 -translate-y-1/2 rounded-full bg-neutral-900/10 blur-[3px] dark:bg-white/10"
              animate={{ left: ["0%", "100%"] }}
              transition={trackTransition}
              style={{ marginLeft: -16 }}
            />
          )}
          <motion.span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-neutral-900 shadow-[0_0_0_3px_rgba(0,0,0,0.06)] dark:bg-white dark:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]"
            animate={{ left: reduceMotion ? "50%" : ["0%", "100%"] }}
            transition={trackTransition}
            style={{ marginLeft: -5 }}
          />
        </div>

        <div className="mt-2.5 flex items-center gap-3 font-mono text-[9px] text-neutral-400 dark:text-neutral-500">
          <span>ease: {current.token}</span>
          {current.duration && <span>duration: {current.duration}s</span>}
        </div>
      </div>

      {/* compact easing list */}
      <div className="flex min-h-0 flex-1 flex-col divide-y divide-neutral-200/70 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white dark:divide-neutral-800/60 dark:border-neutral-700/50 dark:bg-neutral-900/50">
        {EASINGS.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.name}
              className={`flex flex-1 items-center justify-between px-3 transition-colors duration-300 ${
                isActive ? "bg-neutral-900/[0.03] dark:bg-white/[0.04]" : ""
              }`}
            >
              <span
                className={`text-[10.5px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-neutral-800 dark:text-neutral-100"
                    : "text-neutral-400 dark:text-neutral-600"
                }`}
              >
                {item.name}
              </span>
              <motion.span
                className={`h-1 w-1 rounded-full ${
                  isActive ? "bg-emerald-500 dark:bg-emerald-400" : "bg-neutral-300 dark:bg-neutral-700"
                }`}
                animate={isActive && !reduceMotion ? { scale: [1, 1.6, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   2. ColorCraft — a palette header, a live spectrum, five swatches
   with animated hex values, and a mini UI strip that the palette is
   actually applied to (button, outline, status dot).
----------------------------------------------------------------- */

function ColorCraft({ reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % PALETTES.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const palette = PALETTES[index];
  const hex = (i) => palette.colors[i].hex;
  const colorTransition = "background-color 700ms cubic-bezier(0.4,0,0.2,1), border-color 700ms cubic-bezier(0.4,0,0.2,1)";

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2.5">
      {/* header + spectrum */}
      <div className="shrink-0 rounded-3xl border border-neutral-200/70 bg-white px-3 pb-3 pt-2.5 dark:border-neutral-700/50 dark:bg-neutral-900/50">
        <div className="mb-2 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.span
              key={palette.name}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.25 }}
              className="text-[12px] font-semibold text-neutral-800 dark:text-neutral-100"
            >
              {palette.name}
            </motion.span>
          </AnimatePresence>
          <span className="rounded-full bg-neutral-900/[0.06] px-1.5 py-[2px] text-[8px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
            live
          </span>
        </div>

        <div
          className="mb-2.5 h-1.5 w-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${palette.colors.map((c) => c.hex).join(",")})`,
            transition: "background 700ms cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        <div className="grid grid-cols-5 gap-1.5">
          {palette.colors.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="h-6 w-full rounded-3xl"
                style={{ backgroundColor: color.hex, transition: colorTransition }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={color.hex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[7.5px] text-neutral-400 dark:text-neutral-500"
                >
                  {color.hex}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* applied UI preview */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 rounded-3xl border border-neutral-200/70 bg-white px-3 py-3 dark:border-neutral-700/50 dark:bg-neutral-900/50">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">Sample Card</span>
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: hex(4), transition: colorTransition }}
            />
            <span className="text-[8.5px] text-neutral-400 dark:text-neutral-500">Status</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="rounded-3xl px-2.5 py-1 text-[9.5px] font-medium text-white"
            style={{ backgroundColor: hex(3), transition: colorTransition }}
          >
            Primary
          </span>
          <span
            className="rounded-3xl border px-2.5 py-1 text-[9.5px] font-medium"
            style={{ borderColor: hex(2), color: hex(2), transition: colorTransition }}
          >
            Outline
          </span>
          <span className="ml-auto font-mono text-[8px] text-neutral-400 dark:text-neutral-600">
            --accent-{palette.name.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   3. Type Scale — heading / body / caption samples that resize live
   as the ratio changes, each carrying its own pixel value.
----------------------------------------------------------------- */

function TypeScale({ reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % SCALES.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const { ratio, name } = SCALES[index];
  const headingPx = Math.round(14 * ratio * ratio);
  const bodyPx = 13;
  const captionPx = Math.max(9, Math.round(13 / ratio));
  const sizeTransition = "font-size 600ms cubic-bezier(0.4,0,0.2,1)";

  const rows = [
    { label: "Heading", token: "text-xl", size: headingPx, sample: "Aa Bb Cc" },
    { label: "Body", token: "text-sm", size: bodyPx, sample: "The quick brown fox jumps." },
    { label: "Caption", token: "text-xs", size: captionPx, sample: "12px · muted" },
  ];

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2.5">
      <div className="flex shrink-0 items-center justify-between rounded-3xl border border-neutral-200/70 bg-white px-3 py-2 dark:border-neutral-700/50 dark:bg-neutral-900/50">
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={ratio}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[12px] font-semibold text-neutral-800 dark:text-neutral-100"
            >
              {ratio.toFixed(3)}×
            </motion.span>
          </AnimatePresence>
          <span className="text-[9px] text-neutral-400 dark:text-neutral-500">{name}</span>
        </div>
        <span className="rounded-full bg-neutral-900/[0.06] px-1.5 py-[2px] text-[8px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
          live
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col divide-y divide-neutral-200/70 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white dark:divide-neutral-800/60 dark:border-neutral-700/50 dark:bg-neutral-900/50">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-1 items-center gap-3 overflow-hidden px-3">
            <span className="w-14 shrink-0 font-mono text-[9px] text-neutral-400 dark:text-neutral-600">
              {row.token}
            </span>
            <span
              className="min-w-0 flex-1 truncate leading-none text-neutral-800 dark:text-neutral-100"
              style={{ fontSize: `${row.size}px`, transition: sizeTransition }}
            >
              {row.sample}
            </span>
            <span className="shrink-0 font-mono text-[9px] tabular-nums text-neutral-400 dark:text-neutral-600">
              {row.size}px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}