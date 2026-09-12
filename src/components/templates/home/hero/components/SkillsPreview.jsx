import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const STAGE_COUNT = 8;

const STAGES = [
  { id: "html", filename: "index.html", activeLine: 2, duration: 3500, lines: ["<section>", "  <div>", "    <h1></h1>", "  </div>", "</section>"] },
  { id: "css", filename: "style.css", activeLine: 3, duration: 3500, lines: ["section {", "  display: flex;", "  gap: 12px;", "  padding: 16px;", "}"] },
  { id: "tailwind", filename: "index.html", activeLine: 1, duration: 3500, lines: ["<section", '  className="grid gap-3', '  rounded-2xl p-4"', ">", "  <h1 />"] },
  { id: "responsive", filename: "App.jsx", activeLine: 2, duration: 4000, lines: ["<div", '  className="grid grid-cols-3', "    md:grid-cols-2", '    sm:grid-cols-1"', ">"] },
  { id: "javascript", filename: "App.jsx", activeLine: 3, duration: 3500, lines: ["const [active, setActive]", "  = useState(0);", "<button", "  onClick={() => setActive(i)}", ">"] },
  { id: "typescript", filename: "Card.tsx", activeLine: 1, duration: 3500, lines: ["type CardProps = {", "  title: string;", "  active?: boolean;", "};"] },
  { id: "react", filename: "Card.tsx", activeLine: 3, duration: 3500, lines: ["function Card(props: CardProps) {", "  return <div>...</div>;", "}", "<Card />", "<Card />"] },
  { id: "next", filename: "Card.tsx", activeLine: 0, duration: 4000, lines: ["export default function Card() {", "  return (", "    <div>...</div>", "  );", "}"] },
];

const TOKEN_RE = /(<\/?[a-zA-Z0-9]+>|"[^"]*"|\bconst\b|\bfunction\b|\btype\b|\bexport\b|\bdefault\b|\breturn\b|\buseState\b|\bclassName\b)/g;
const TOKEN_TEST_RE = /^<\/?[a-zA-Z0-9]+>|^"[^"]*"|^(const|function|type|export|default|return|useState|className)$/;
const tokenize = (text) => text.split(TOKEN_RE);

const useStageCycle = (stageIndex, duration, paused, reduceMotion) => {
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setTimeout(() => {}, duration);
    return () => clearTimeout(timer);
  }, [stageIndex, duration, paused, reduceMotion]);
};

const useResponsivePreview = (isResponsive, reduceMotion) => {
  const [device, setDevice] = useState("desktop");
  useEffect(() => {
    if (!isResponsive) { setDevice("desktop"); return; }
    if (reduceMotion) { setDevice("mobile"); return; }
    const timers = [
      setTimeout(() => setDevice("tablet"), 900),
      setTimeout(() => setDevice("mobile"), 2000),
      setTimeout(() => setDevice("desktop"), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isResponsive, reduceMotion]);
  return device;
};

const useActiveItem = (enabled, reduceMotion, paused) => {
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    if (!enabled || reduceMotion || paused) return;
    const interval = setInterval(() => setActiveItem((c) => (c + 1) % 3), 1400);
    return () => clearInterval(interval);
  }, [enabled, reduceMotion, paused]);
  useEffect(() => { if (!enabled) setActiveItem(0); }, [enabled]);
  return activeItem;
};

function LiveIndicator({ paused, reduceMotion }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-neutral-900/[0.06] px-2 py-[3px] dark:bg-white/[0.08]">
      <span className="relative flex h-1.5 w-1.5">
        {!paused && !reduceMotion && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/70 dark:bg-emerald-400/70"
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${paused ? "bg-neutral-400 dark:bg-neutral-600" : "bg-emerald-500 dark:bg-emerald-400"}`} />
      </span>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
        {paused ? "Paused" : "Live"}
      </span>
    </span>
  );
}

function StageIndicator({ stageIndex, stageId }) {
  return (
    <div className="flex min-w-0 items-baseline gap-2">
      <span className="font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
        {String(stageIndex + 1).padStart(2, "0")}/{String(STAGE_COUNT).padStart(2, "0")}
      </span>
      <span className="hidden min-w-0 truncate text-[11px] font-medium capitalize text-neutral-700 dark:text-neutral-200 sm:inline">
        {stageId}
      </span>
    </div>
  );
}

function CodeLine({ text }) {
  const parts = useMemo(() => tokenize(text), [text]);
  return (
    <span className="min-w-0 truncate">
      {parts.map((part, index) =>
        part && TOKEN_TEST_RE.test(part) ? (
          <span key={`${part}-${index}`} className="text-neutral-800 dark:text-neutral-100">{part}</span>
        ) : (
          <span key={`${part}-${index}`} className="text-neutral-400 dark:text-neutral-500">{part}</span>
        )
      )}
    </span>
  );
}

function CodeEditor({ stage, reduceMotion }) {
  return (
    <div className="flex h-full min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-2.5 transition-colors duration-500 dark:border-neutral-700/50 dark:bg-neutral-900/40">
      <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2">
        <span className="min-w-0 truncate text-[9px] font-medium text-neutral-400 dark:text-neutral-500">
          {stage.filename}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden font-mono">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: EASE }}
            className="flex flex-col gap-[2px]"
          >
            {stage.lines.map((line, index) => (
              <motion.div
                key={`${stage.id}-${index}`}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE, delay: reduceMotion ? 0 : index * 0.05 }}
                className={`flex min-w-0 items-center gap-2 whitespace-pre rounded-md px-1.5 py-[1px] text-[9px] leading-[13px] transition-colors duration-300 ${
                  index === stage.activeLine ? "bg-neutral-100 dark:bg-neutral-800/60" : ""
                }`}
              >
                <span className="w-3 shrink-0 text-right text-neutral-300 dark:text-neutral-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CodeLine text={line} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PreviewCard({ index, stageId, isHtml, isCss, isJsBuilt, activeItem }) {
  const isTypeScript = stageId === "typescript";
  const isReact = stageId === "react";
  const isActive = isJsBuilt && activeItem === index;

  return (
    <motion.div
      layout
      transition={{ duration: 0.7, ease: EASE }}
      animate={{ scale: isActive ? 1.03 : 1 }}
      className={`relative flex min-w-0 flex-col overflow-hidden border p-2 transition-colors duration-500 ${
        isCss ? "rounded-xl" : "rounded-lg"
      } ${
        isActive
          ? "border-neutral-400 bg-neutral-900/[0.04] shadow-sm dark:border-neutral-500/60 dark:bg-white/[0.05]"
          : isHtml
          ? "border-dashed border-neutral-300 bg-transparent dark:border-neutral-700"
          : "border-neutral-200/70 bg-neutral-900/[0.02] dark:border-neutral-700/50 dark:bg-white/[0.02]"
      }`}
    >
      <div
        className={`mb-1.5 h-8 w-full transition-colors duration-500 ${isCss ? "rounded-lg" : "rounded-md"} ${
          isHtml ? "border border-dashed border-neutral-300 bg-transparent dark:border-neutral-700" : "bg-neutral-200/70 dark:bg-white/[0.06]"
        }`}
      />
      <span className={`h-1 w-3/4 rounded-full transition-colors duration-500 ${isHtml ? "bg-neutral-200 dark:bg-neutral-800" : "bg-neutral-300 dark:bg-neutral-500"}`} />
      <span className={`mt-1 h-1 w-1/2 rounded-full transition-colors duration-500 ${isHtml ? "bg-neutral-200 dark:bg-neutral-800" : "bg-neutral-200 dark:bg-neutral-700"}`} />

      <AnimatePresence>
        {isTypeScript && index === 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-950"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 rounded-lg border border-dashed border-neutral-300/80 dark:border-neutral-600/70"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PreviewArea({ stageId, stageIndex, device, activeItem }) {
  const isHtml = stageId === "html";
  const isCss = stageIndex >= 1;
  const isJsBuilt = stageIndex >= 4;
  const columns = { mobile: "grid-cols-1", tablet: "grid-cols-2", desktop: "grid-cols-3" }[device];

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center">
      <motion.div layout transition={{ duration: 0.7, ease: EASE }} className={`grid w-full min-w-0 ${columns} gap-2`}>
        {[0, 1, 2].map((index) => (
          <PreviewCard key={index} index={index} stageId={stageId} isHtml={isHtml} isCss={isCss} isJsBuilt={isJsBuilt} activeItem={activeItem} />
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsPreview() {
  const reduceMotion = useReducedMotion();
  const [stageIndex, setStageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const stage = STAGES[stageIndex];
  const stageId = stage.id;
  const isResponsive = stageId === "responsive";
  const isJsBuilt = stageIndex >= 4;

  const device = useResponsivePreview(isResponsive, reduceMotion);
  const activeItem = useActiveItem(isJsBuilt, reduceMotion, paused);
  useStageCycle(stageIndex, stage.duration, paused, reduceMotion);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setTimeout(() => setStageIndex((c) => (c + 1) % STAGES.length), stage.duration);
    return () => clearTimeout(timer);
  }, [stageIndex, stage.duration, paused, reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return;
    const timer = setTimeout(() => setStageIndex((c) => (c + 1) % STAGES.length), stage.duration);
    return () => clearTimeout(timer);
  }, [reduceMotion, stageIndex, stage.duration]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-4xl bg-neutral-50 transition-colors duration-500 dark:bg-neutral-800/80">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200/70 px-3.5 py-2.5 dark:border-neutral-700/60">
        <StageIndicator stageIndex={stageIndex} stageId={stageId} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-3">
        <div className="min-h-0 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-2.5 transition-colors duration-500 dark:border-neutral-700/50 dark:bg-neutral-900/40" style={{ flexBasis: "40%" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
              className="h-full w-full"
            >
              <PreviewArea stageId={stageId} stageIndex={stageIndex} device={device} activeItem={activeItem} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div dir="ltr" className="min-h-0 shrink-0 overflow-hidden" style={{ flexBasis: "60%" }}>
          <CodeEditor stage={stage} reduceMotion={reduceMotion} />
        </div>
      </div>
    </div>
  );
}