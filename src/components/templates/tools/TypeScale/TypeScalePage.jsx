import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { PixelRuler, MiniSlider, Chip } from "./TypescaleControls";
import {
  PRESETS,
  RATIOS,
  LEVELS,
  WEIGHTS,
  getFonts,
  translations,
  round,
  toRem,
  fluidClamp,
} from "./Typescale.data";

export default function TypeScaleStudio() {
  const { language } = useLanguage();
  const t = translations[language];
  const fonts = useMemo(() => getFonts(language), [language]);

  const [preset, setPreset] = useState("editorial");
  const [base, setBase] = useState(18);
  const [ratio, setRatio] = useState(1.25);
  const [fontId, setFontId] = useState("system");
  const [weight, setWeight] = useState(400);
  const [leading, setLeading] = useState(1.5);
  const [tracking, setTracking] = useState(-0.01);
  const [fluid, setFluid] = useState(false);
  const [customText, setCustomText] = useState("");
  const [exportTab, setExportTab] = useState("css");
  const [copied, setCopied] = useState(false);

  const font = fonts.find((f) => f.id === fontId) ?? fonts[0];

  const applyPreset = (p) => {
    setPreset(p.id);
    setBase(p.base);
    setRatio(p.ratio);
    setFontId(p.font);
    setWeight(p.weight);
    setLeading(p.leading);
    setTracking(p.tracking);
  };

  const activeRatio = RATIOS.reduce((closest, r) =>
    Math.abs(r.value - ratio) < Math.abs(closest.value - ratio) ? r : closest
  );

  const scale = useMemo(
    () => LEVELS.map((lvl) => ({ ...lvl, px: round(base * Math.pow(ratio, lvl.step), 1) })),
    [base, ratio]
  );

  const sampleFor = (level) => {
    if (customText.trim()) return customText;
    if (level.key === "caption") return t.builtFrom(base);
    return t.levels[level.key].sample;
  };

  const exportCode = useMemo(() => {
    const vars = scale
      .map((s) => `  --font-size-${s.key}: ${fluid ? fluidClamp(s.px) : `${toRem(s.px)}rem`};`)
      .join("\n");

    if (exportTab === "css") {
      return `:root {\n${vars}\n  --font-family-base: ${font.stack};\n  --font-weight-base: ${weight};\n  --line-height-base: ${leading};\n  --letter-spacing-base: ${tracking}em;\n}`;
    }
    const twSizes = scale
      .map(
        (s) =>
          `        ${s.key}: ["${fluid ? fluidClamp(s.px) : `${toRem(s.px)}rem`}", { lineHeight: "${leading}", letterSpacing: "${tracking}em" }],`
      )
      .join("\n");
    return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontSize: {\n${twSizes}\n      },\n      fontFamily: {\n        base: [${font.stack
      .split(",")
      .map((s) => `"${s.trim().replace(/'/g, "")}"`)
      .join(", ")}],\n      },\n    },\n  },\n};`;
  }, [scale, fluid, exportTab, font, weight, leading, tracking]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="container py-16 md:py-25" dir={t.dir} lang={language}>
      <style>{`
        .ts-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px; height: 12px; border-radius: 9999px;
          background: #000; cursor: pointer;
          box-shadow: 0 0 0 3px #fff, 0 0 0 4px #e5e5e5;
        }
        .dark .ts-range::-webkit-slider-thumb {
          background: #fff;
          box-shadow: 0 0 0 3px #000, 0 0 0 4px #262626;
        }
        .ts-range::-moz-range-thumb {
          width: 12px; height: 12px; border-radius: 9999px;
          background: #000; border: none; cursor: pointer;
        }
        .dark .ts-range::-moz-range-thumb { background: #fff; }
        .ts-scroll::-webkit-scrollbar { width: 6px; }
        .ts-scroll::-webkit-scrollbar-track { background: transparent; }
        .ts-scroll::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 9999px; }
        .dark .ts-scroll::-webkit-scrollbar-thumb { background: #404040; }
      `}</style>

      {/* Header */}
      <div className="mb-8 text-left rtl:text-right">
        <h1 className="text-[22px] font-medium tracking-tight text-black dark:text-white md:text-[26px]">
          {t.title}
        </h1>
        <p className="mt-1.5 text-sm text-secondary md:text-base">{t.description}</p>
      </div>

      {/* Presets */}
      <div className="ts-scroll flex gap-1.5 overflow-x-auto pb-1">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p)}
            className={
              "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-colors " +
              (preset === p.id
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-secondary hover:text-black dark:hover:text-white")
            }
          >
            {t.presets[p.id]}
          </button>
        ))}
      </div>

      {/* Base size ruler */}
      <div className="px-2 py-7 text-center md:px-7">
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-secondary">{t.base}</p>
        <p dir="ltr" className="mb-5 text-3xl font-bold leading-none tabular-nums text-black dark:text-white md:text-4xl">
          {base}
          <span className="ml-1.5 text-base font-medium text-secondary">px</span>
        </p>
        <PixelRuler value={base} min={8} max={72} onChange={setBase} />
      </div>

      {/* Scale + controls */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.5fr_1fr]">
        {/* Left: scale preview — scrolls internally, never pushes the panel below or the controls beside it */}
        <div className="ts-scroll overflow-y-auto rounded-lg border-primary md:max-h-[700px]">
          {scale.map((lvl) => (
            <div
              key={lvl.key}
              className="flex items-center justify-between gap-5 border-b-primary px-4 py-4 transition-colors last:border-b-0 hover:bg-neutral-100 dark:hover:bg-neutral-950 md:px-6"
            >
              <span
                className="min-w-0 flex-1 truncate text-black dark:text-white"
                style={{
                  fontSize: `${lvl.px}px`,
                  fontWeight: weight,
                  lineHeight: leading,
                  letterSpacing: `${tracking}em`,
                  fontFamily: font.stack,
                }}
              >
                {sampleFor(lvl)}
              </span>
              <span className="flex-none text-right rtl:text-left">
                <span className="block text-[11px] uppercase tracking-wider text-secondary">
                  {t.levels[lvl.key].label}
                </span>
                <span dir="ltr" className="text-xs tabular-nums text-secondary">
                  {lvl.px}px · {toRem(lvl.px)}rem
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Right: controls — fixed in place, does not shift as the left panel grows or scrolls */}
        <div className="flex flex-col gap-6 rounded-lg border-primary p-5 md:sticky md:top-0 md:self-start md:p-6">
          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.ratioLabel}</p>
            <div className="flex flex-wrap gap-2">
              {RATIOS.map((r) => (
                <Chip key={r.id} active={activeRatio.id === r.id} onClick={() => setRatio(r.value)} sub={r.value}>
                  {t.ratios[r.id]}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.fontLabel}</p>
            <div className="flex flex-wrap gap-2">
              {fonts.map((f) => (
                <Chip key={f.id} active={fontId === f.id} onClick={() => setFontId(f.id)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.weightLabel}</p>
            <div className="flex flex-wrap gap-2">
              {WEIGHTS.map((w) => (
                <Chip key={w} active={weight === w} onClick={() => setWeight(w)}>
                  <span style={{ fontWeight: w }}>{t.weights[w]}</span>
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <MiniSlider label={t.lineHeight} value={leading} min={1} max={2} step={0.05} onChange={setLeading} />
            <MiniSlider
              label={t.letterSpacing}
              value={tracking}
              min={-0.05}
              max={0.1}
              step={0.005}
              unit="em"
              onChange={setTracking}
            />
          </div>

          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.customSample}</p>
            <input
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={t.customPlaceholder}
              className="w-full rounded-lg border-primary bg-neutral-100 px-3 py-2 text-sm text-black outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-700 dark:focus:border-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["css", "tailwind"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setExportTab(tab)}
                className={
                  "rounded-full px-3.5 py-1.5 text-[13px] uppercase tracking-wide transition-colors " +
                  (exportTab === tab
                    ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                    : "border-primary text-secondary hover:text-black dark:hover:text-white")
                }
              >
                {tab === "css" ? "CSS" : "Tailwind"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-full border-primary">
              <button
                type="button"
                onClick={() => setFluid(false)}
                className={
                  "px-3.5 py-1.5 text-[13px] transition-colors " +
                  (!fluid
                    ? "bg-black font-medium text-white dark:bg-white dark:text-black"
                    : "text-secondary hover:text-black dark:hover:text-white")
                }
              >
                {t.staticLabel}
              </button>
              <button
                type="button"
                onClick={() => setFluid(true)}
                className={
                  "px-4.5 py-1.5 text-[13px] transition-colors " +
                  (fluid
                    ? "bg-black font-medium text-white dark:bg-white dark:text-black"
                    : "text-secondary hover:text-black dark:hover:text-white")
                }
              >
                {t.fluidLabel}
              </button>
            </div>

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