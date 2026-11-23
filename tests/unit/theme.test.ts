import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, isTheme } from "@/lib/theme";

describe("préférence de thème", () => {
  it("propose clair, sombre et système", () => {
    expect([...THEMES]).toEqual(["light", "dark", "system"]);
  });

  it("utilise le thème système par défaut", () => {
    expect(DEFAULT_THEME).toBe("system");
  });

  it("reconnaît uniquement les thèmes valides", () => {
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("solarized")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });

  it("a une clé de stockage stable", () => {
    expect(THEME_STORAGE_KEY).toBe("cla-theme");
  });
});
