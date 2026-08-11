import { useState, useMemo, useEffect } from "react";
import { Copy, Check, Play, Pause, RotateCcw } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { DraggableRuler, MiniSlider, Chip, BezierEditor } from "./AnimationAlabControls";
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
} from "./AnimationLab.data";

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

  const params = { tx, ty, scaleVal, rotateVal, blurFrom, blurTo, opacityFrom, opacityTo };
  const visibleControls = TYPE_CONTROLS[type] ?? [];
  const steps = useMemo(() => buildSteps(type, params), [type, tx, ty, scaleVal, rotateVal, blurFrom, blurTo, opacityFrom, opacityTo]);
  const easingCss = easingToCss(bezier);
  const activeEasing = EASINGS.find((e) => e.bezier.every((v, i) => Math.abs(v - bezier[i]) < 0.005));
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
    [type, keyframeName, steps, duration, delay, easingCss, iteration, direction]
  );

  // Auto-replay whenever any parameter that affects the animation changes.
  useEffect(() => {
    setPlaying(true);
    setRunId((id) => id + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, duration, delay, iteration, direction, easingCss, JSON.stringify(steps)]);

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
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const totalMs = delay + duration;
  const delayPct = totalMs ? (delay / totalMs) * 100 : 0;

  return (
    <div className="container py-16 md:py-25" dir={t.dir} lang={language}>
      <style>{`
        @keyframes ${keyframeName} {
${steps.map((s) => {
  const { offset, ...props } = s;
  const decls = Object.entries(props).map(([k, v]) => `${k}: ${v};`).join(" ");
  return `          ${offset}% { ${decls} }`;
}).join("\n")}
        }
        .al-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px; height: 12px; border-radius: 9999px;
          background: #000; cursor: pointer;
          box-shadow: 0 0 0 3px #fff, 0 0 0 4px #e5e5e5;
        }
        .dark .al-range::-webkit-slider-thumb {
          background: #fff;
          box-shadow: 0 0 0 3px #000, 0 0 0 4px #262626;
        }
        .al-range::-moz-range-thumb {
          width: 12px; height: 12px; border-radius: 9999px;
          background: #000; border: none; cursor: pointer;
        }
        .dark .al-range::-moz-range-thumb { background: #fff; }
        .al-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .al-scroll::-webkit-scrollbar-track { background: transparent; }
        .al-scroll::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 9999px; }
        .dark .al-scroll::-webkit-scrollbar-thumb { background: #404040; }
        @keyframes alDot { from { left: 0%; } to { left: 100%; } }
      `}</style>

      {/* Header */}
      <div className="mb-8 text-left rtl:text-right">
        <h1 className="text-[22px] font-medium tracking-tight text-black dark:text-white md:text-[26px]">
          {t.title}
        </h1>
        <p className="mt-1.5 text-sm text-secondary md:text-base">{t.description}</p>
      </div>

      {/* Type tabs */}
      <div className="al-scroll flex gap-1.5 overflow-x-auto pb-1">
        {TYPES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setType(id)}
            className={
              "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-colors " +
              (type === id
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-secondary hover:text-black dark:hover:text-white")
            }
          >
            {t.types[id]}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="my-6 flex h-56 items-center justify-center rounded-lg border-primary bg-neutral-50 dark:bg-neutral-950/40 md:h-64">
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

      {/* Transport + timeline */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="inline-flex items-center gap-1.5 rounded-full border-primary px-3.5 py-1.5 text-[13px] text-secondary hover:text-black dark:hover:text-white"
          >
            <Play size={13} /> {t.play}
          </button>
          <button
            type="button"
            onClick={() => setPlaying(false)}
            className="inline-flex items-center gap-1.5 rounded-full border-primary px-3.5 py-1.5 text-[13px] text-secondary hover:text-black dark:hover:text-white"
          >
            <Pause size={13} /> {t.pause}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              setRunId((id) => id + 1);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border-primary px-3.5 py-1.5 text-[13px] text-secondary hover:text-black dark:hover:text-white"
          >
            <RotateCcw size={13} /> {t.replay}
          </button>
        </div>

        <div dir="ltr" className="relative h-6 px-1">
          <div className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-neutral-200 dark:bg-neutral-800" />
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
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-black dark:bg-white"
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

      {/* Controls grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left column: easing + timing */}
        <div className="flex flex-col gap-6 rounded-lg border-primary p-5 md:p-6">
          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.easing}</p>
            <div className="flex flex-wrap gap-2">
              {EASINGS.map((e) => (
                <Chip key={e.id} active={activeEasing?.id === e.id} onClick={() => setBezier(e.bezier)}>
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
            <p className="mb-1.5 flex items-center justify-between text-xs font-medium text-secondary">
              <span>{t.duration}</span>
              <span dir="ltr" className="tabular-nums text-black dark:text-white">
                {duration}ms
              </span>
            </p>
            <DraggableRuler value={duration} min={0} max={2000} step={10} onChange={setDuration} />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {DURATIONS.map((d) => (
                <Chip key={d} active={duration === d} onClick={() => setDuration(d)}>
                  {d}ms
                </Chip>
              ))}
            </div>
          </div>

          <MiniSlider label={t.delay} value={delay} min={0} max={1000} step={10} unit="ms" onChange={setDelay} />

          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.iteration}</p>
            <div className="flex flex-wrap gap-2">
              {ITERATIONS.map((i) => (
                <Chip key={i.id} active={iteration === i.value} onClick={() => setIteration(i.value)}>
                  {t.iterations[i.id]}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.direction}</p>
            <div className="flex flex-wrap gap-2">
              {DIRECTIONS.map((d) => (
                <Chip key={d.id} active={direction === d.value} onClick={() => setDirection(d.value)}>
                  {t.directions[d.id]}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: transform + opacity + quick presets */}
        <div className="flex flex-col gap-6 rounded-lg border-primary p-5 md:p-6">
          {(visibleControls.includes("translateX") ||
            visibleControls.includes("translateY") ||
            visibleControls.includes("scale") ||
            visibleControls.includes("rotate") ||
            visibleControls.includes("blur")) && (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-secondary">{t.transform}</p>
              {visibleControls.includes("translateX") && (
                <MiniSlider label={t.controls.translateX} value={tx} min={-150} max={150} step={5} unit="px" onChange={setTx} />
              )}
              {visibleControls.includes("translateY") && (
                <MiniSlider label={t.controls.translateY} value={ty} min={-150} max={150} step={5} unit="px" onChange={setTy} />
              )}
              {visibleControls.includes("scale") && (
                <MiniSlider label={t.controls.scale} value={scaleVal} min={0.1} max={2} step={0.05} onChange={setScaleVal} />
              )}
              {visibleControls.includes("rotate") && (
                <MiniSlider label={t.controls.rotate} value={rotateVal} min={0} max={360} step={5} unit="°" onChange={setRotateVal} />
              )}
              {visibleControls.includes("blur") && (
                <>
                  <MiniSlider label={`${t.controls.blur} — ${t.opacityFrom}`} value={blurFrom} min={0} max={30} step={1} unit="px" onChange={setBlurFrom} />
                  <MiniSlider label={`${t.controls.blur} — ${t.opacityTo}`} value={blurTo} min={0} max={30} step={1} unit="px" onChange={setBlurTo} />
                </>
              )}
            </div>
          )}

          {visibleControls.includes("opacity") && (
            <div>
              <p className="mb-3 text-xs font-medium text-secondary">{t.opacity}</p>
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
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.quickPresets}</p>
            <div className="flex flex-col gap-3">
              {Object.entries(QUICK_PRESETS).map(([category, presets]) => (
                <div key={category}>
                  <p className="mb-1.5 text-[10px] uppercase tracking-wider text-secondary opacity-70">
                    {t.categories[category]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((preset) => (
                      <Chip key={preset.id} active={false} onClick={() => applyQuickPreset(preset)}>
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

      {/* CSS output */}
      <div className="py-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-secondary">{t.cssOutput}</p>
          <button
            type="button"
            onClick={handleCopy}
            className={
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] uppercase tracking-wide transition-colors " +
              (copied
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "border-primary text-secondary hover:text-black dark:hover:text-white")
            }
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <pre
          dir="ltr"
          className="overflow-x-auto rounded-lg border-primary bg-neutral-100 p-4 text-left font-mono text-xs leading-7 text-neutral-700 dark:bg-neutral-950/60 dark:text-neutral-300"
        >
          {exportCode}
        </pre>
      </div>
    </div>
  );
}