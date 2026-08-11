/* ---------------------------------------------------------------------- */
/*  Config data — no copy lives here, only ids/numbers.                    */
/*  All display text is resolved through `translations` by id.             */
/* ---------------------------------------------------------------------- */

export const PRESETS = [
  { id: "editorial", base: 18, ratio: 1.25, font: "system", weight: 400, leading: 1.5, tracking: -0.01 },
  { id: "product", base: 15, ratio: 1.2, font: "inter", weight: 500, leading: 1.4, tracking: -0.02 },
  { id: "apple", base: 17, ratio: 1.125, font: "system", weight: 500, leading: 1.3, tracking: -0.015 },
  { id: "dense", base: 13, ratio: 1.125, font: "geist", weight: 500, leading: 1.3, tracking: 0 },
  { id: "landing", base: 20, ratio: 1.333, font: "poppins", weight: 600, leading: 1.2, tracking: -0.02 },
  { id: "reading", base: 19, ratio: 1.2, font: "inter", weight: 400, leading: 1.65, tracking: -0.005 },
];

export const RATIOS = [
  { id: "minorSecond", value: 1.067 },
  { id: "majorSecond", value: 1.125 },
  { id: "minorThird", value: 1.2 },
  { id: "majorThird", value: 1.25 },
  { id: "perfectFourth", value: 1.333 },
  { id: "augmentedFourth", value: 1.414 },
  { id: "perfectFifth", value: 1.5 },
  { id: "goldenRatio", value: 1.618 },
];

export const LEVELS = [
  { key: "display", step: 3 },
  { key: "heading", step: 2 },
  { key: "subheading", step: 1 },
  { key: "body", step: 0 },
  { key: "small", step: -1 },
  { key: "caption", step: -2 },
];

export const WEIGHTS = [400, 500, 600, 700, 800];

export const LATIN_FONTS = [
  { id: "inter", label: "Inter", stack: "'Inter', -apple-system, sans-serif" },
  { id: "geist", label: "Geist", stack: "'Geist', -apple-system, sans-serif" },
  { id: "poppins", label: "Poppins", stack: "'Poppins', -apple-system, sans-serif" },
  { id: "system", label: "System UI", stack: "-apple-system, 'Segoe UI', sans-serif" },
  { id: "mono", label: "Mono", stack: "ui-monospace, 'SF Mono', Menlo, monospace" },
  { id: "serif", label: "Serif", stack: "'Iowan Old Style', Georgia, serif" },
];

export const PERSIAN_FONTS = [
  { id: "vazir", label: "Vazirmatn", stack: "'Vazirmatn', 'Segoe UI', sans-serif" },
  { id: "yekan", label: "Yekan Bakh", stack: "'Yekan Bakh', 'Segoe UI', sans-serif" },
];

/** Persian fonts are only worth offering once the user is previewing Persian text. */
export function getFonts(language) {
  return language === "fa" ? [...PERSIAN_FONTS, ...LATIN_FONTS] : LATIN_FONTS;
}

/* ---------------------------------------------------------------------- */
/*  Translations                                                           */
/* ---------------------------------------------------------------------- */

export const translations = {
  en: {
    dir: "ltr",
    title: "TypeScale",
    description: "A visual type-scale builder for consistent, exportable typography.",
    base: "Base",
    ratioLabel: "Ratio",
    fontLabel: "Font family",
    weightLabel: "Weight",
    lineHeight: "Line height",
    letterSpacing: "Letter spacing",
    sizing: "Sizing",
    customSample: "Custom sample text",
    customPlaceholder: "Type your own sample…",
    staticLabel: "Static",
    fluidLabel: "Fluid",
    copy: "Copy",
    copied: "Copied",
    builtFrom: (n) => `Built from a ${n}px base.`,
    presets: {
      editorial: "Editorial",
      product: "Product UI",
      apple: "Apple-ish",
      dense: "Dense Dashboard",
      landing: "Landing Page",
      reading: "Reading Heavy",
    },
    ratios: {
      minorSecond: "Minor Second",
      majorSecond: "Major Second",
      minorThird: "Minor Third",
      majorThird: "Major Third",
      perfectFourth: "Perfect Fourth",
      augmentedFourth: "Augmented Fourth",
      perfectFifth: "Perfect Fifth",
      goldenRatio: "Golden Ratio",
    },
    weights: { 400: "Regular", 500: "Medium", 600: "Semibold", 700: "Bold", 800: "Black" },
    levels: {
      display: { label: "Display", sample: "Quiet by design" },
      heading: { label: "Heading", sample: "Made for readable UI" },
      subheading: { label: "Subheading", sample: "Balanced type across screens" },
      body: {
        label: "Body",
        sample:
          "A typography system tuned for modern interfaces — with consistent scale, calmer spacing, and readable rhythm from display to caption.",
      },
      small: { label: "Small", sample: "Optimized for product design." },
      caption: { label: "Caption", sample: null },
    },
  },

  fa: {
    dir: "rtl",
    title: "تایپ‌اسکیل",
    description: "ابزاری بصری برای ساخت مقیاس تایپوگرافی یکدست و قابل خروجی.",
    base: "پایه",
    ratioLabel: "نسبت",
    fontLabel: "خانواده فونت",
    weightLabel: "وزن",
    lineHeight: "ارتفاع خط",
    letterSpacing: "فاصله حروف",
    sizing: "نحوه اندازه‌گیری",
    customSample: "متن نمونه دلخواه",
    customPlaceholder: "متن دلخواهت را بنویس…",
    staticLabel: "ثابت",
    fluidLabel: "سیال",
    copy: "کپی",
    copied: "کپی شد",
    builtFrom: (n) => `ساخته‌شده بر پایه‌ی ${n}px.`,
    presets: {
      editorial: "ادیتوریال",
      product: "رابط محصول",
      apple: "اپل‌وار",
      dense: "داشبورد فشرده",
      landing: "لندینگ",
      reading: "مطالعه‌محور",
    },
    ratios: {
      minorSecond: "دوم کوچک",
      majorSecond: "دوم بزرگ",
      minorThird: "سوم کوچک",
      majorThird: "سوم بزرگ",
      perfectFourth: "چهارم درست",
      augmentedFourth: "چهارم افزوده",
      perfectFifth: "پنجم درست",
      goldenRatio: "نسبت طلایی",
    },
    weights: { 400: "معمولی", 500: "متوسط", 600: "نیمه‌بولد", 700: "بولد", 800: "بلک" },
    levels: {
      display: { label: "نمایشی", sample: "سکوت در طراحی" },
      heading: { label: "عنوان", sample: "ساخته‌شده برای رابط‌های خوانا" },
      subheading: { label: "زیرعنوان", sample: "تعادل تایپوگرافی در همه‌ی صفحه‌ها" },
      body: {
        label: "متن",
        sample:
          "سیستمی برای تایپوگرافی رابط‌های امروزی؛ با مقیاس یکدست، فاصله‌گذاری متعادل و ریتمی خوانا از نمایشی تا زیرنویس.",
      },
      small: { label: "کوچک", sample: "بهینه‌شده برای طراحی محصول." },
      caption: { label: "زیرنویس", sample: null },
    },
  },
};

/* ---------------------------------------------------------------------- */
/*  Pure helpers                                                           */
/* ---------------------------------------------------------------------- */

export const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;
export const toRem = (px) => round(px / 16, 3);

export function fluidClamp(px) {
  const minPx = Math.max(12, round(px * 0.74, 0));
  const maxPx = px;
  const minVw = 360;
  const maxVw = 1440;
  if (maxPx <= minPx) return `${toRem(px)}rem`;
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const yIntercept = minPx - slope * minVw;
  const vwPart = round(slope * 100, 3);
  const remPart = toRem(yIntercept);
  return `clamp(${toRem(minPx)}rem, ${remPart}rem + ${vwPart}vw, ${toRem(maxPx)}rem)`;
}