import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * <ToolsPreview />
 * -------------------------------------------------------------------
 * Live preview for the "Tools" card — Animation Lab / ColorCraft /
 * Type Scale, three stages that rotate automatically.
 *
 * Every stage now fills the full available height on purpose:
 * - No centered block sitting in a tall empty container.
 * - Rows use flex-1 + divide-y so they distribute across whatever
 *   height the card actually gives them.
 * - Each stage carries a bit more real information (a token name, a
 *   transition value, an applied-UI strip) so it reads as dense and
 *   finished, matching the Skills card next to it.
 * -------------------------------------------------------------------
 */

const STAGES = ["animation", "color", "type"];
const STAGE_MS = 4500;
const EASE = [0.4, 0, 0.2, 1];

function StageHeader({ label, value }) {
  return (
    <div className="mb-3 flex shrink-0 items-center justify-between">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="font-mono text-[11px] text-neutral-400"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function ToolsPreview() {
  const [stageIndex, setStageIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, STAGE_MS);
    return () => clearInterval(id);
  }, []);

  const stage = STAGES[stageIndex];

  const variants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 8, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -8, filter: "blur(4px)" },
      };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-4 pb-16 pt-4">
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
  );
}

/* ----------------------------------------------------------------
   1. Animation Lab — full-height rows, each with a name, its actual
   transition value, and a track that only the active row animates on.
----------------------------------------------------------------- */

const EASINGS = [
  { name: "linear", detail: 'ease: "linear"', ease: "linear" },
  { name: "ease-out", detail: 'ease: "easeOut"', ease: "easeOut" },
  { name: "ease-in-out", detail: 'ease: "easeInOut"', ease: "easeInOut" },
  { name: "spring", detail: "type: spring", ease: "spring" },
];

function AnimationLab({ reduceMotion }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setActive((p) => (p + 1) % EASINGS.length), 2000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="flex h-full w-full flex-col">
      <StageHeader label="Animation Lab" value={EASINGS[active].name} />

      <div className="flex min-h-0 flex-1 flex-col divide-y divide-neutral-800/60">
        {EASINGS.map((item, i) => {
          const isActive = i === active;
          return (
            <div key={item.name} className="flex flex-1 items-center gap-3">
              <div className="flex w-24 shrink-0 flex-col">
                <span
                  className={`text-[13px] font-medium transition-colors duration-500 ${
                    isActive ? "text-neutral-100" : "text-neutral-600"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`font-mono text-[9px] transition-opacity duration-500 ${
                    isActive ? "text-neutral-500 opacity-100" : "opacity-0"
                  }`}
                >
                  {item.detail}
                </span>
              </div>

              <div className="relative h-[3px] flex-1 rounded-full bg-neutral-800">
                <motion.span
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                  style={{ marginLeft: -6 }}
                  animate={{ left: isActive && !reduceMotion ? "100%" : "0%" }}
                  transition={
                    isActive && !reduceMotion
                      ? item.ease === "spring"
                        ? { type: "spring", stiffness: 55, damping: 11, repeat: Infinity, repeatType: "reverse" }
                        : { duration: 1.7, ease: item.ease, repeat: Infinity, repeatType: "reverse" }
                      : { duration: 0.3 }
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   2. ColorCraft — swatches stretch to fill the row, each carries a
   step name + hex, and an "applied UI" strip underneath shows the
   palette actually being used, not just displayed.
----------------------------------------------------------------- */

const PALETTES = [
  {
    name: "neutral",
    colors: [
      { step: "100", hex: "#FAFAFA" },
      { step: "300", hex: "#D4D4D4" },
      { step: "500", hex: "#737373" },
      { step: "700", hex: "#404040" },
      { step: "900", hex: "#171717" },
    ],
  },
  {
    name: "zinc",
    colors: [
      { step: "100", hex: "#F4F4F5" },
      { step: "300", hex: "#D4D4D8" },
      { step: "500", hex: "#71717A" },
      { step: "700", hex: "#3F3F46" },
      { step: "900", hex: "#18181B" },
    ],
  },
  {
    name: "gray",
    colors: [
      { step: "100", hex: "#F3F4F6" },
      { step: "300", hex: "#D1D5DB" },
      { step: "500", hex: "#6B7280" },
      { step: "700", hex: "#374151" },
      { step: "900", hex: "#111827" },
    ],
  },
  {
    name: "slate",
    colors: [
      { step: "100", hex: "#F1F5F9" },
      { step: "300", hex: "#CBD5E1" },
      { step: "500", hex: "#64748B" },
      { step: "700", hex: "#334155" },
      { step: "900", hex: "#0F172A" },
    ],
  },
];

const COLOR_TRANSITION = "background-color 700ms cubic-bezier(0.4,0,0.2,1)";

function ColorCraft({ reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % PALETTES.length), 2400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const palette = PALETTES[index];
  const swatchHex = (i) => palette.colors[i].hex;

  return (
    <div className="flex h-full w-full flex-col">
      <StageHeader label="ColorCraft" value={palette.name} />

      <div
        className="mb-3 h-1 w-full shrink-0 rounded-full"
        style={{
          background: `linear-gradient(to right, ${palette.colors.map((c) => c.hex).join(",")})`,
          transition: "background 700ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      <div className="grid min-h-0 flex-1 grid-cols-5 gap-2">
        {palette.colors.map((color, i) => (
          <div key={i} className="flex h-full min-h-0 flex-col">
            <div
              className="min-h-0 flex-1 rounded-lg shadow-inner"
              style={{ backgroundColor: color.hex, transition: COLOR_TRANSITION }}
            />
            <div className="mt-1.5 flex shrink-0 flex-col items-center">
              <span className="text-[9px] font-medium text-neutral-500">{color.step}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={color.hex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[8.5px] text-neutral-600"
                >
                  {color.hex}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex shrink-0 items-center gap-2 border-t border-neutral-800/60 pt-3">
        <span
          className="rounded-full px-3 py-1 text-[10px] font-medium text-white transition-colors duration-500"
          style={{ backgroundColor: swatchHex(3) }}
        >
          Button
        </span>
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-medium transition-colors duration-500"
          style={{ borderColor: swatchHex(2), color: swatchHex(2) }}
        >
          Outline
        </span>
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-500"
          style={{ backgroundColor: swatchHex(4) }}
        />
        <span className="ml-auto font-mono text-[9px] text-neutral-600">--accent-{palette.name}</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   3. Type Scale — full-height rows: a Tailwind-style token name, the
   live sample, and the computed pixel value, so each row carries
   three real pieces of information instead of one centered line.
----------------------------------------------------------------- */

const SCALES = [1.125, 1.25, 1.333];
const TOKENS = ["text-xs", "text-sm", "text-base", "text-lg", "text-2xl"];
const BASE_PX = 12;
const MAX_PX = 34;

function TypeScale({ reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % SCALES.length), 2400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const ratio = SCALES[index];

  return (
    <div className="flex h-full w-full flex-col">
      <StageHeader label="Type Scale" value={`${ratio.toFixed(3)}×`} />

      <div className="flex min-h-0 flex-1 flex-col divide-y divide-neutral-800/60">
        {TOKENS.map((token, step) => {
          const size = Math.min(BASE_PX * Math.pow(ratio, step), MAX_PX);
          return (
            <div key={token} className="flex flex-1 items-center justify-between gap-3">
              <span className="w-16 shrink-0 font-mono text-[10px] text-neutral-600">{token}</span>
              <span
                className="flex-1 truncate leading-none text-neutral-100"
                style={{ fontSize: `${size}px`, transition: "font-size 600ms cubic-bezier(0.4,0,0.2,1)" }}
              >
                Aa Bb Cc
              </span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-neutral-600">
                {Math.round(size)}px
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}