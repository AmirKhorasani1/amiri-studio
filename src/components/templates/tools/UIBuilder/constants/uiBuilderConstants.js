export const RADIUS_PRESETS = {
  sharp: "0px",
  subtle: "6px",
  rounded: "14px",
  pill: "9999px",
};

export const SHADOW_PRESETS = {
  none: "none",
  soft: "0 2px 10px rgba(0,0,0,0.06)",
  medium: "0 8px 24px rgba(0,0,0,0.10)",
  strong: "0 16px 40px rgba(0,0,0,0.18)",
};

export const SPACING_PRESETS = {
  compact: 0.75,
  cozy: 0.875,
  default: 1,
  relaxed: 1.125,
  spacious: 1.25,
};

export const FONT_OPTIONS = ["Inter", "Poppins", "Roboto", "System"];

export const WEIGHT_OPTIONS = [400, 500, 600, 700, 800];

export const COLOR_FIELDS = [
  { id: "primary", label: { en: "Primary", fa: "اصلی" } },
  { id: "secondary", label: { en: "Secondary", fa: "ثانویه" } },
  { id: "accent", label: { en: "Accent", fa: "تاکیدی" } },
  { id: "background", label: { en: "Background", fa: "پس‌زمینه" } },
  { id: "surface", label: { en: "Surface", fa: "سطح" } },
  { id: "text", label: { en: "Text", fa: "متن" } },
];

export const DEFAULT_CONFIG = {
  colors: {
    primary: "#111111",
    secondary: "#6B6B6B",
    accent: "#6366F1",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#111111",
  },
  typography: {
    fontFamily: "Inter",
    headingSize: 48,
    bodySize: 16,
    headingWeight: 700,
    bodyWeight: 400,
  },
  radius: "rounded",
  shadow: "soft",
  spacing: "default",
};