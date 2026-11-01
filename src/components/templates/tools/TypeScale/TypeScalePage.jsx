import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { PixelRuler, MiniSlider, Chip } from "./components/TypescaleControls";
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
} from "./components/Typescale.data";

const PANEL = "rounded-4xl bg-neutral-200/65 hover:bg-neutral-200/80 transition-all dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90 duration-300";
const INNER = "border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800";

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

    const twSizes = scale.map((s) =>
      `        ${s.key}: ["${fluid ? fluidClamp(s.px) : `${toRem(s.px)}rem`}", { lineHeight: "${leading}", letterSpacing: "${tracking}em" }],`
    ).join("\n");

    const family = font.stack
      .split(",")
      .map((s) => `"${s.trim().replace(/'/g, "")}"`)
      .join(", ");

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
${twSizes}
      },
      fontFamily: {
        base: [${family}],
      },
    },
  },
};`;
  }, [scale, fluid, exportTab, font, weight, leading, tracking]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="container py-16 md:py-25" dir={t.dir} lang={language}>
      <style>{`
        .ts-range::-webkit-slider-thumb {
          -webkit-appearance:none;width:12px;height:12px;border-radius:9999px;background:#000;cursor:pointer;
          box-shadow:0 0 0 3px #fff,0 0 0 4px #d4d4d4;
        }
        .dark .ts-range::-webkit-slider-thumb {
          background:#fff;box-shadow:0 0 0 3px #0a0a0a,0 0 0 4px #404040;
        }
        .ts-range::-moz-range-thumb {
          width:12px;height:12px;border:0;border-radius:9999px;background:#000;cursor:pointer;
        }
        .dark .ts-range::-moz-range-thumb { background:#fff; }
        .ts-scroll::-webkit-scrollbar { width:6px;height:6px; }
        .ts-scroll::-webkit-scrollbar-track { background:transparent; }
        .ts-scroll::-webkit-scrollbar-thumb { background:#d4d4d4;border-radius:9999px; }
        .dark .ts-scroll::-webkit-scrollbar-thumb { background:#404040; }
      `}</style>

      {/* Header */}
      <header className="mb-8 text-left rtl:text-right">
        <h1 className="text-[22px] font-medium tracking-tight text-black dark:text-white md:text-[26px]">
          {t.title}
        </h1>
        <p className="mt-1.5 text-sm text-secondary md:text-base">{t.description}</p>
      </header>

      {/* Presets */}
      <div className="ts-scroll flex gap-1.5 overflow-x-auto pb-1">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p)}
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-colors ${
              preset === p.id
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-secondary hover:text-black dark:hover:text-white"
            }`}
          >
            {t.presets[p.id]}
          </button>
        ))}
      </div>

      {/* Base */}
      <div className={`${PANEL} my-6 px-3 py-7 text-center md:px-7`}>
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-secondary">{t.base}</p>
        <p dir="ltr" className="mb-5 text-3xl font-bold leading-none tabular-nums text-black dark:text-white md:text-4xl">
          {base}<span className="ml-1.5 text-base font-medium text-secondary">px</span>
        </p>
        <div className="rounded-3xl bg-white/70 px-4 py-3 dark:bg-neutral-950/30 md:px-6">
          <PixelRuler value={base} min={8} max={72} onChange={setBase} />
        </div>
      </div>

      {/* Scale + Controls */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.5fr_1fr]">
        {/* Scale */}
        <div className={`${PANEL} overflow-hidden p-2 md:p-3`}>
          <div className="ts-scroll overflow-y-auto rounded-3xl">
            {scale.map((lvl) => (
              <div
                key={lvl.key}
                className="flex items-center justify-between gap-5 border-b border-neutral-200 px-4 py-4 transition-colors last:border-b-0 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900 md:px-6"
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
        </div>

        {/* Controls */}
        <div className={`${PANEL} flex flex-col gap-6 p-5 md:sticky md:top-0 md:self-start md:p-6`}>
          <div>
            <p className="mb-2.5 text-xs font-medium text-secondary">{t.ratioLabel}</p>
            <div className="flex flex-wrap gap-2">
              {RATIOS.map((r) => (
                <Chip
                  key={r.id}
                  active={activeRatio.id === r.id}
                  onClick={() => setRatio(r.value)}
                  sub={r.value}
                >
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
              className="w-full rounded-2xl border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-neutral-400 focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-700 dark:focus:border-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* Export */}
      <div className={`${PANEL} mt-4 p-5 md:p-6`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["css", "tailwind"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setExportTab(tab)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] uppercase tracking-wide transition-colors ${
                  exportTab === tab
                    ? "bg-black font-medium text-white dark:bg-white dark:text-black"
                    : "border-primary text-secondary hover:text-black dark:hover:text-white"
                }`}
              >
                {tab === "css" ? "CSS" : "Tailwind"}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-full border-primary">
              <button
                type="button"
                onClick={() => setFluid(false)}
                className={`px-3.5 py-1.5 text-[13px] transition-colors ${
                  !fluid
                    ? "bg-black font-medium text-white dark:bg-white dark:text-black"
                    : "text-secondary hover:text-black dark:hover:text-white"
                }`}
              >
                {t.staticLabel}
              </button>

              <button
                type="button"
                onClick={() => setFluid(true)}
                className={`px-4.5 py-1.5 text-[13px] transition-colors ${
                  fluid
                    ? "bg-black font-medium text-white dark:bg-white dark:text-black"
                    : "text-secondary hover:text-black dark:hover:text-white"
                }`}
              >
                {t.fluidLabel}
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] uppercase tracking-wide transition-colors ${
                copied
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-primary text-secondary hover:text-black dark:hover:text-white"
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>

        <pre
          dir="ltr"
          className="ts-scroll overflow-x-auto rounded-3xl border border-neutral-300 bg-white p-4 text-left font-mono text-xs leading-7 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300"
        >
          {exportCode}
        </pre>
      </div>
    </div>
  );
}