import { RADIUS_PRESETS, SHADOW_PRESETS } from "../constants/uiBuilderConstants";

// Turns the config into a plain :root {} block of CSS custom properties —
// this is the "professional" upgrade the plan called for: the config isn't
// just for the live preview, it's a real portable design-token export.
export const buildCssVariables = (config) => {
  const { colors, radius, shadow, typography } = config;

  const lines = [
    ":root {",
    ...Object.entries(colors).map(([key, value]) => `  --color-${key}: ${value};`),
    `  --radius: ${RADIUS_PRESETS[radius]};`,
    `  --shadow: ${SHADOW_PRESETS[shadow]};`,
    `  --font-family: ${typography.fontFamily};`,
    `  --heading-size: ${typography.headingSize}px;`,
    `  --body-size: ${typography.bodySize}px;`,
    "}",
  ];

  return lines.join("\n");
};