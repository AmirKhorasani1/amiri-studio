import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Pause, Play, RotateCcw } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import {
  DraggableRuler,
  MiniSlider,
  Chip,
  BezierEditor,
} from "./AnimationAlabControls";

import {
  TYPES,
  TYPE_CONTROLS,
  EASINGS,
  DURATIONS,
  ITERATIONS,
  DIRECTIONS,
  QUICK_PRESETS,
  translations,
  buildSteps,
  easingToCss,
  iterationToCss,
  buildCss,
} from "../utils/AnimationLab.data";

const DEFAULTS = {
  type: "slide",
  bezier: [0.25, 0.1, 0.25, 1],
  duration: 400,
  delay: 0,
  iteration: 1,
  direction: "normal",
  tx: 0,
  ty: 40,
  scaleVal: 0.5,
  rotateVal: 45,
  blurFrom: 8,
  blurTo: 0,
  opacityFrom: 0,
  opacityTo: 1,
};

const PANEL =
  "rounded-4xl bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300";

const INNER_PANEL =
  "border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800";

const BUTTON =
  "inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-[13px] text-neutral-500 transition-colors duration-200 hover:border-neutral-400 hover:text-black dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white";

const STYLES = `
  .al-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 9999px;
    background: #000;
    cursor: pointer;
    box-shadow: 0 0 0 3px #fff, 0 0 0 4px #d4d4d4;
  }

  .dark .al-range::-webkit-slider-thumb {
    background: #fff;
    box-shadow: 0 0 0 3px #0a0a0a, 0 0 0 4px #404040;
  }

  .al-range::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 9999px;
    background: #000;
    cursor: pointer;
  }

  .dark .al-range::-moz-range-thumb {
    background: #fff;
  }

  .al-scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .al-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .al-scroll::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background: #d4d4d4;
  }

  .dark .al-scroll::-webkit-scrollbar-thumb {
    background: #404040;
  }

  @keyframes alDot {
    from { left: 0%; }
    to { left: 100%; }
  }
`;

export default function AnimationLabStudio() {
  const { language } = useLanguage();
  const t = translations[language];

  const [type, setType] = useState(DEFAULTS.type);
  const [bezier, setBezier] = useState(DEFAULTS.bezier);
  const [duration, setDuration] = useState(DEFAULTS.duration);
  const [delay, setDelay] = useState(DEFAULTS.delay);
  const [iteration, setIteration] = useState(DEFAULTS.iteration);
  const [direction, setDirection] = useState(DEFAULTS.direction);
  const [tx, setTx] = useState(DEFAULTS.tx);
  const [ty, setTy] = useState(DEFAULTS.ty);
  const [scaleVal, setScaleVal] = useState(DEFAULTS.scaleVal);
  const [rotateVal, setRotateVal] = useState(DEFAULTS.rotateVal);
  const [blurFrom, setBlurFrom] = useState(DEFAULTS.blurFrom);
  const [blurTo, setBlurTo] = useState(DEFAULTS.blurTo);
  const [opacityFrom, setOpacityFrom] = useState(DEFAULTS.opacityFrom);
  const [opacityTo, setOpacityTo] = useState(DEFAULTS.opacityTo);

  const [playing, setPlaying] = useState(true);
  const [runId, setRunId] = useState(0);
  const [copied, setCopied] = useState(false);

  const params = useMemo(
    () => ({
      tx,
      ty,
      scaleVal,
      rotateVal,
      blurFrom,
      blurTo,
      opacityFrom,
      opacityTo,
    }),
    [tx, ty, scaleVal, rotateVal, blurFrom, blurTo, opacityFrom, opacityTo],
  );

  const visibleControls = TYPE_CONTROLS[type] ?? [];
  const steps = useMemo(() => buildSteps(type, params), [type, params]);
  const easingCss = useMemo(() => easingToCss(bezier), [bezier]);

  const activeEasing = useMemo(
    () =>
      EASINGS.find((e) =>
        e.bezier.every((v, i) => Math.abs(v - bezier[i]) < 0.005),
      ),
    [bezier],
  );

  const keyframeName = `${type}Anim`;

  const exportCode = useMemo(
    () =>
      buildCss({
        type,
        name: keyframeName,
        steps,
        duration,
        delay,
        easingCss,
        iteration,
        direction,
      }),
    [
      type,
      keyframeName,
      steps,
      duration,
      delay,
      easingCss,
      iteration,
      direction,
    ],
  );

  useEffect(() => {
    setPlaying(true);
    setRunId((id) => id + 1);
  }, [type, duration, delay, iteration, direction, easingCss, steps]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const applyQuickPreset = (preset) => {
    setType(preset.type);
    setDirection(preset.direction ?? "normal");

    if (preset.tx !== undefined) setTx(preset.tx);
    if (preset.ty !== undefined) setTy(preset.ty);
    if (preset.scaleVal !== undefined) setScaleVal(preset.scaleVal);
    if (preset.rotateVal !== undefined) setRotateVal(preset.rotateVal);
    if (preset.opacityFrom !== undefined) setOpacityFrom(preset.opacityFrom);
    if (preset.opacityTo !== undefined) setOpacityTo(preset.opacityTo);
    if (preset.iteration !== undefined) setIteration(preset.iteration);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const replay = () => {
    setPlaying(false);
    requestAnimationFrame(() => {
      setRunId((id) => id + 1);
      setPlaying(true);
    });
  };

  const totalMs = delay + duration;
  const delayPct = totalMs ? (delay / totalMs) * 100 : 0;

  return (
    <div className="container py-16 md:py-25" dir={t.dir} lang={language}>
      <style>{`
        ${STYLES}
        @keyframes ${keyframeName} {
          ${steps
            .map(({ offset, ...props }) => {
              const declarations = Object.entries(props)
                .map(([key, value]) => `${key}: ${value};`)
                .join(" ");
              return `${offset}% { ${declarations} }`;
            })
            .join("\n")}
        }
      `}</style>

      {/* Header */}
      <header className="mb-8 mt-3 text-left rtl:text-right">
        <h1 className="text-[22px] font-medium tracking-tight text-black dark:text-white md:text-[26px]">
          {t.title}
        </h1>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
          {t.description}
        </p>
      </header>

      {/* Types */}
      <section>
        <div className="w-full lg:w-fit mt-3 flex border border-neutral-200 dark:border-neutral-800 p-1 rounded-full overflow-x-auto hide-scrollbar">
          {TYPES.map((id) => {
            const active = type === id;

            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => setType(id)}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium tracking-wide cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30 ${
                  !active ? "hover:bg-black/5 dark:hover:bg-white/5" : ""
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeTypePill"
                    className="absolute inset-0 rounded-full bg-black dark:bg-white"
                    transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  />
                )}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    active
                      ? "text-white dark:text-black"
                      : "text-black/50 dark:text-neutral-400/90"
                  }`}
                >
                  {t.types[id]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Preview */}
      <div className="my-6 flex h-56 items-center justify-center overflow-hidden rounded-4xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800 md:h-64">
        <div
          key={runId}
          style={{
            width: 56,
            height: 56,
            borderRadius: 10,
            animationName: keyframeName,
            animationDuration: `${duration}ms`,
            animationTimingFunction: easingCss,
            animationDelay: `${delay}ms`,
            animationIterationCount: iterationToCss(iteration),
            animationDirection: direction,
            animationFillMode: "both",
            animationPlayState: playing ? "running" : "paused",
          }}
          className="bg-black dark:bg-white"
        />
      </div>

      {/* Transport */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className={`${BUTTON} ${playing ? "bg-black text-white dark:bg-white dark:text-black" : ""}`}
          >
            <Play size={13} /> {t.play}
          </button>

          <button
            type="button"
            onClick={() => setPlaying(false)}
            className={`${BUTTON} ${!playing ? "bg-black text-white dark:bg-white dark:text-black" : ""}`}
          >
            <Pause size={13} /> {t.pause}
          </button>

          <button type="button" onClick={replay} className={BUTTON}>
            <RotateCcw size={13} /> {t.replay}
          </button>
        </div>

        <div dir="ltr" className="relative h-6 px-1">
          <div className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-neutral-300 dark:bg-neutral-800" />

          {[0, 25, 50, 75, 100].map((p) => (
            <span
              key={p}
              className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-neutral-300 dark:bg-neutral-700"
              style={{ left: `${p}%` }}
            />
          ))}

          {delay > 0 && (
            <div
              className="absolute top-1/2 h-px -translate-y-1/2 bg-neutral-400 dark:bg-neutral-600"
              style={{ left: 0, width: `${delayPct}%` }}
            />
          )}

          <span
            key={runId}
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white"
            style={{
              animationName: "alDot",
              animationDuration: `${duration}ms`,
              animationTimingFunction: easingCss,
              animationDelay: `${delay}ms`,
              animationIterationCount: iterationToCss(iteration),
              animationDirection: direction,
              animationFillMode: "both",
              animationPlayState: playing ? "running" : "paused",
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Easing / Timing */}
        <div className={`${PANEL} flex flex-col gap-6 p-5 md:p-6`}>
          <div>
            <p className="mb-2.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.easing}
            </p>

            <div className="flex flex-wrap gap-2">
              {EASINGS.map((e) => (
                <Chip
                  key={e.id}
                  active={activeEasing?.id === e.id}
                  onClick={() => setBezier(e.bezier)}
                >
                  {t.easingNames[e.id]}
                </Chip>
              ))}

              <Chip active={!activeEasing} onClick={() => {}}>
                {t.customEasing}
              </Chip>
            </div>

            <div className="mt-3">
              <BezierEditor value={bezier} onChange={setBezier} />
            </div>
          </div>

          <div>
            <p className="mb-1.5 flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span>{t.duration}</span>
              <span
                dir="ltr"
                className="tabular-nums text-black dark:text-white"
              >
                {duration}ms
              </span>
            </p>

            <DraggableRuler
              value={duration}
              min={0}
              max={2000}
              step={10}
              onChange={setDuration}
            />

            <div className="mt-2 flex flex-wrap gap-1.5">
              {DURATIONS.map((d) => (
                <Chip
                  key={d}
                  active={duration === d}
                  onClick={() => setDuration(d)}
                >
                  {d}ms
                </Chip>
              ))}
            </div>
          </div>

          <MiniSlider
            label={t.delay}
            value={delay}
            min={0}
            max={1000}
            step={10}
            unit="ms"
            onChange={setDelay}
          />

          <div>
            <p className="mb-2.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.iteration}
            </p>
            <div className="flex flex-wrap gap-2">
              {ITERATIONS.map((item) => (
                <Chip
                  key={item.id}
                  active={iteration === item.value}
                  onClick={() => setIteration(item.value)}
                >
                  {t.iterations[item.id]}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.direction}
            </p>
            <div className="flex flex-wrap gap-2">
              {DIRECTIONS.map((item) => (
                <Chip
                  key={item.id}
                  active={direction === item.value}
                  onClick={() => setDirection(item.value)}
                >
                  {t.directions[item.id]}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Transform / Presets */}
        <div className={`${PANEL} flex flex-col gap-6 p-5 md:p-6`}>
          {(visibleControls.includes("translateX") ||
            visibleControls.includes("translateY") ||
            visibleControls.includes("scale") ||
            visibleControls.includes("rotate") ||
            visibleControls.includes("blur")) && (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {t.transform}
              </p>

              {visibleControls.includes("translateX") && (
                <MiniSlider
                  label={t.controls.translateX}
                  value={tx}
                  min={-150}
                  max={150}
                  step={5}
                  unit="px"
                  onChange={setTx}
                />
              )}

              {visibleControls.includes("translateY") && (
                <MiniSlider
                  label={t.controls.translateY}
                  value={ty}
                  min={-150}
                  max={150}
                  step={5}
                  unit="px"
                  onChange={setTy}
                />
              )}

              {visibleControls.includes("scale") && (
                <MiniSlider
                  label={t.controls.scale}
                  value={scaleVal}
                  min={0.1}
                  max={2}
                  step={0.05}
                  onChange={setScaleVal}
                />
              )}

              {visibleControls.includes("rotate") && (
                <MiniSlider
                  label={t.controls.rotate}
                  value={rotateVal}
                  min={0}
                  max={360}
                  step={5}
                  unit="°"
                  onChange={setRotateVal}
                />
              )}

              {visibleControls.includes("blur") && (
                <>
                  <MiniSlider
                    label={`${t.controls.blur} — ${t.opacityFrom}`}
                    value={blurFrom}
                    min={0}
                    max={30}
                    step={1}
                    unit="px"
                    onChange={setBlurFrom}
                  />
                  <MiniSlider
                    label={`${t.controls.blur} — ${t.opacityTo}`}
                    value={blurTo}
                    min={0}
                    max={30}
                    step={1}
                    unit="px"
                    onChange={setBlurTo}
                  />
                </>
              )}
            </div>
          )}

          {visibleControls.includes("opacity") && (
            <div>
              <p className="mb-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {t.opacity}
              </p>

              <div className="flex flex-col gap-4">
                <MiniSlider
                  label={t.opacityFrom}
                  value={Math.round(opacityFrom * 100)}
                  min={0}
                  max={100}
                  step={5}
                  unit="%"
                  onChange={(v) => setOpacityFrom(v / 100)}
                />

                <MiniSlider
                  label={t.opacityTo}
                  value={Math.round(opacityTo * 100)}
                  min={0}
                  max={100}
                  step={5}
                  unit="%"
                  onChange={(v) => setOpacityTo(v / 100)}
                />
              </div>
            </div>
          )}

          <div>
            <p className="mb-2.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.quickPresets}
            </p>

            <div className="flex flex-col gap-3">
              {Object.entries(QUICK_PRESETS).map(([category, presets]) => (
                <div key={category}>
                  <p className="mb-1.5 text-[10px] uppercase tracking-wider text-neutral-500 opacity-70 dark:text-neutral-400">
                    {t.categories[category]}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((preset) => (
                      <Chip
                        key={preset.id}
                        onClick={() => applyQuickPreset(preset)}
                      >
                        {t.presets[preset.id]}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className={`${PANEL} mt-4 p-5 md:p-6`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {t.cssOutput}
          </p>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] uppercase tracking-wide transition-colors ${
              copied
                ? "bg-black text-white dark:bg-white dark:text-black"
                : BUTTON
            }`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? t.copied : t.copy}
          </button>
        </div>

        <pre
          dir="ltr"
          className="al-scroll overflow-x-auto rounded-2xl border border-neutral-300 bg-white p-4 text-left font-mono text-xs leading-7 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300"
        >
          {exportCode}
        </pre>
      </div>
    </div>
  );
}
