// Préférence de thème : clair, sombre ou suivre le système.
// La valeur est conservée dans le navigateur par next-themes sous THEME_STORAGE_KEY.
export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "system";
export const THEME_STORAGE_KEY = "cla-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}
