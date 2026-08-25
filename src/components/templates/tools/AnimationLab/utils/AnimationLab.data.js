/* ---------------------------------------------------------------------- */
/*  Config data — ids/numbers only. Copy lives in `translations`.          */
/* ---------------------------------------------------------------------- */

export const TYPES = ["fade", "slide", "scale", "rotate", "bounce", "blur", "shake", "pulse"];

/** Which transform/opacity controls are relevant for each animation type. */
export const TYPE_CONTROLS = {
  fade: ["opacity"],
  slide: ["translateX", "translateY", "opacity"],
  scale: ["scale", "opacity"],
  rotate: ["rotate"],
  blur: ["blur", "opacity"],
  bounce: ["translateY"],
  shake: ["translateX"],
  pulse: ["scale"],
};

export const EASINGS = [
  { id: "linear", css: "linear", bezier: [0, 0, 1, 1] },
  { id: "ease", css: "ease", bezier: [0.25, 0.1, 0.25, 1] },
  { id: "easeIn", css: "ease-in", bezier: [0.42, 0, 1, 1] },
  { id: "easeOut", css: "ease-out", bezier: [0, 0, 0.58, 1] },
  { id: "easeInOut", css: "ease-in-out", bezier: [0.42, 0, 0.58, 1] },
];

export const DURATIONS = [100, 200, 300, 400, 500, 700, 1000];

export const ITERATIONS = [
  { id: "once", value: 1 },
  { id: "twice", value: 2 },
  { id: "thrice", value: 3 },
  { id: "infinite", value: "infinite" },
];

export const DIRECTIONS = [
  { id: "normal", value: "normal" },
  { id: "reverse", value: "reverse" },
  { id: "alternate", value: "alternate" },
  { id: "alternateReverse", value: "alternate-reverse" },
];

/**
 * Quick presets. `direction` doubles as the enter/exit switch — an "exit"
 * preset is just the matching "entrance" params played with direction
 * reversed, since every keyframe pair here goes offset(0%) -> rest(100%).
 */
export const QUICK_PRESETS = {
  entrance: [
    { id: "fadeIn", type: "fade", direction: "normal", opacityFrom: 0, opacityTo: 1 },
    { id: "slideUp", type: "slide", direction: "normal", tx: 0, ty: 40, opacityFrom: 0, opacityTo: 1 },
    { id: "slideDown", type: "slide", direction: "normal", tx: 0, ty: -40, opacityFrom: 0, opacityTo: 1 },
    { id: "slideLeft", type: "slide", direction: "normal", tx: 40, ty: 0, opacityFrom: 0, opacityTo: 1 },
    { id: "slideRight", type: "slide", direction: "normal", tx: -40, ty: 0, opacityFrom: 0, opacityTo: 1 },
    { id: "scaleIn", type: "scale", direction: "normal", scaleVal: 0.5, opacityFrom: 0, opacityTo: 1 },
  ],
  attention: [
    { id: "shake", type: "shake", direction: "normal", tx: 8, iteration: 1 },
    { id: "pulse", type: "pulse", direction: "normal", scaleVal: 1.08, iteration: 2 },
    { id: "bounce", type: "bounce", direction: "normal", ty: -20, iteration: 2 },
    { id: "wiggle", type: "wiggle", direction: "normal", iteration: 2 },
  ],
  exit: [
    { id: "fadeOut", type: "fade", direction: "reverse", opacityFrom: 0, opacityTo: 1 },
    { id: "scaleOut", type: "scale", direction: "reverse", scaleVal: 0.5, opacityFrom: 0, opacityTo: 1 },
    { id: "slideOut", type: "slide", direction: "reverse", tx: 0, ty: 40, opacityFrom: 0, opacityTo: 1 },
  ],
};

/* ---------------------------------------------------------------------- */
/*  Translations                                                           */
/* ---------------------------------------------------------------------- */

export const translations = {
  en: {
    dir: "ltr",
    title: "Animation Lab",
    description: "Preview, tune, and export CSS keyframe animations.",
    box: "BOX",
    play: "Play",
    pause: "Pause",
    replay: "Replay",
    type: "Animation type",
    easing: "Easing",
    customEasing: "Custom",
    duration: "Duration",
    delay: "Delay",
    iteration: "Iteration",
    direction: "Direction",
    transform: "Transform",
    opacity: "Opacity",
    opacityFrom: "From",
    opacityTo: "To",
    quickPresets: "Animation presets",
    cssOutput: "CSS",
    copy: "Copy",
    copied: "Copied",
    types: {
      fade: "Fade",
      slide: "Slide",
      scale: "Scale",
      rotate: "Rotate",
      bounce: "Bounce",
      blur: "Blur",
      shake: "Shake",
      pulse: "Pulse",
    },
    easingNames: {
      linear: "Linear",
      ease: "Ease",
      easeIn: "Ease In",
      easeOut: "Ease Out",
      easeInOut: "Ease In Out",
    },
    iterations: { once: "Once", twice: "2×", thrice: "3×", infinite: "Infinite" },
    directions: {
      normal: "Normal",
      reverse: "Reverse",
      alternate: "Alternate",
      alternateReverse: "Alternate Reverse",
    },
    controls: {
      translateX: "Translate X",
      translateY: "Translate Y",
      scale: "Scale",
      rotate: "Rotate",
      blur: "Blur amount",
    },
    categories: { entrance: "Entrance", attention: "Attention", exit: "Exit" },
    presets: {
      fadeIn: "Fade In",
      slideUp: "Slide Up",
      slideDown: "Slide Down",
      slideLeft: "Slide Left",
      slideRight: "Slide Right",
      scaleIn: "Scale In",
      shake: "Shake",
      pulse: "Pulse",
      bounce: "Bounce",
      wiggle: "Wiggle",
      fadeOut: "Fade Out",
      scaleOut: "Scale Out",
      slideOut: "Slide Out",
    },
  },

  fa: {
    dir: "rtl",
    title: "آزمایشگاه انیمیشن",
    description: "پیش‌نمایش، تنظیم و خروجی‌گیری از انیمیشن‌های CSS.",
    box: "باکس",
    play: "پخش",
    pause: "توقف",
    replay: "تکرار",
    type: "نوع انیمیشن",
    easing: "Easing",
    customEasing: "دلخواه",
    duration: "مدت زمان",
    delay: "تأخیر",
    iteration: "تعداد تکرار",
    direction: "جهت",
    transform: "تبدیل",
    opacity: "شفافیت",
    opacityFrom: "شروع",
    opacityTo: "پایان",
    quickPresets: "پریست‌های انیمیشن",
    cssOutput: "CSS",
    copy: "کپی",
    copied: "کپی شد",
    types: {
      fade: "محو شدن",
      slide: "اسلاید",
      scale: "مقیاس",
      rotate: "چرخش",
      bounce: "پرش",
      blur: "بلور",
      shake: "لرزش",
      pulse: "ضربان",
    },
    easingNames: {
      linear: "خطی",
      ease: "نرم",
      easeIn: "نرم در ورود",
      easeOut: "نرم در خروج",
      easeInOut: "نرم در ورود و خروج",
    },
    iterations: { once: "یک‌بار", twice: "۲ بار", thrice: "۳ بار", infinite: "بی‌نهایت" },
    directions: {
      normal: "عادی",
      reverse: "معکوس",
      alternate: "متناوب",
      alternateReverse: "متناوب معکوس",
    },
    controls: {
      translateX: "جابه‌جایی افقی",
      translateY: "جابه‌جایی عمودی",
      scale: "مقیاس",
      rotate: "چرخش",
      blur: "میزان بلور",
    },
    categories: { entrance: "ورود", attention: "جلب توجه", exit: "خروج" },
    presets: {
      fadeIn: "محو به داخل",
      slideUp: "اسلاید به بالا",
      slideDown: "اسلاید به پایین",
      slideLeft: "اسلاید به چپ",
      slideRight: "اسلاید به راست",
      scaleIn: "بزرگ‌شدن",
      shake: "لرزش",
      pulse: "ضربان",
      bounce: "پرش",
      wiggle: "تکان",
      fadeOut: "محو به بیرون",
      scaleOut: "کوچک‌شدن",
      slideOut: "اسلاید به بیرون",
    },
  },
};

/* ---------------------------------------------------------------------- */
/*  Pure helpers                                                           */
/* ---------------------------------------------------------------------- */

export const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

/** Builds the offset/property keyframe steps for a given animation type. */
export function buildSteps(type, p) {
  switch (type) {
    case "fade":
      return [
        { offset: 0, opacity: p.opacityFrom },
        { offset: 100, opacity: p.opacityTo },
      ];
    case "slide":
      return [
        { offset: 0, transform: `translate(${p.tx}px, ${p.ty}px)`, opacity: p.opacityFrom },
        { offset: 100, transform: `translate(0px, 0px)`, opacity: p.opacityTo },
      ];
    case "scale":
      return [
        { offset: 0, transform: `scale(${p.scaleVal})`, opacity: p.opacityFrom },
        { offset: 100, transform: `scale(1)`, opacity: p.opacityTo },
      ];
    case "rotate":
      return [
        { offset: 0, transform: `rotate(${p.rotateVal}deg)` },
        { offset: 100, transform: `rotate(0deg)` },
      ];
    case "blur":
      return [
        { offset: 0, filter: `blur(${p.blurFrom}px)`, opacity: p.opacityFrom },
        { offset: 100, filter: `blur(${p.blurTo}px)`, opacity: p.opacityTo },
      ];
    case "bounce": {
      const h = p.ty;
      return [
        { offset: 0, transform: `translateY(0px)` },
        { offset: 20, transform: `translateY(${h}px)` },
        { offset: 40, transform: `translateY(0px)` },
        { offset: 60, transform: `translateY(${round(h * 0.5)}px)` },
        { offset: 80, transform: `translateY(0px)` },
        { offset: 100, transform: `translateY(0px)` },
      ];
    }
    case "shake": {
      const d = p.tx;
      return [
        { offset: 0, transform: `translateX(0px)` },
        { offset: 10, transform: `translateX(${d}px)` },
        { offset: 20, transform: `translateX(${-d}px)` },
        { offset: 30, transform: `translateX(${d}px)` },
        { offset: 40, transform: `translateX(${-d}px)` },
        { offset: 50, transform: `translateX(${d}px)` },
        { offset: 60, transform: `translateX(${-d}px)` },
        { offset: 70, transform: `translateX(${d}px)` },
        { offset: 80, transform: `translateX(${-d}px)` },
        { offset: 90, transform: `translateX(${d}px)` },
        { offset: 100, transform: `translateX(0px)` },
      ];
    }
    case "pulse":
      return [
        { offset: 0, transform: `scale(1)` },
        { offset: 50, transform: `scale(${p.scaleVal})` },
        { offset: 100, transform: `scale(1)` },
      ];
    case "wiggle":
      return [
        { offset: 0, transform: `rotate(0deg)` },
        { offset: 15, transform: `rotate(-8deg)` },
        { offset: 30, transform: `rotate(6deg)` },
        { offset: 45, transform: `rotate(-4deg)` },
        { offset: 60, transform: `rotate(3deg)` },
        { offset: 75, transform: `rotate(-2deg)` },
        { offset: 100, transform: `rotate(0deg)` },
      ];
    default:
      return [];
  }
}

function stepsToCssBlock(steps) {
  return steps
    .map((s) => {
      const { offset, ...props } = s;
      const decls = Object.entries(props)
        .map(([k, v]) => `${k}: ${v};`)
        .join(" ");
      return `  ${offset}% { ${decls} }`;
    })
    .join("\n");
}

/** Resolves the current bezier to a known keyword, or a cubic-bezier() string. */
export function easingToCss(bezier) {
  const match = EASINGS.find((e) => e.bezier.every((v, i) => Math.abs(v - bezier[i]) < 0.005));
  if (match) return match.css;
  return `cubic-bezier(${bezier.map((n) => round(n, 3)).join(", ")})`;
}

export function iterationToCss(iteration) {
  return iteration === "infinite" ? "infinite" : String(iteration);
}

/** Full exportable CSS: the animation rule + its @keyframes block. */
export function buildCss({ type, name, steps, duration, delay, easingCss, iteration, direction }) {
  const rule = `.element {\n  animation: ${name} ${duration}ms ${easingCss} ${delay}ms ${iterationToCss(
    iteration
  )} ${direction} both;\n}`;
  const keyframes = `@keyframes ${name} {\n${stepsToCssBlock(steps)}\n}`;
  return `${rule}\n\n${keyframes}`;
}