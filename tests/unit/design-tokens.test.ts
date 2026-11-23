import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Ces tests protègent le design system (docs/design-system.md) :
// tous les tokens existent dans les deux thèmes, et aucune couleur n'est codée en dur dans l'UI.

const REQUIRED_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
  "ring",
  "success",
  "warning",
  "destructive",
  "info",
];

const css = readFileSync("src/app/globals.css", "utf8");

/** Retourne le contenu du premier bloc CSS dont le sélecteur est `selector`. */
function readBlock(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return "";
  return css.slice(start, css.indexOf("}", start));
}

function readToken(block: string, token: string): string | undefined {
  return block.match(new RegExp(`--${token}:\\s*([^;]+);`))?.[1]?.trim();
}

describe("tokens du design system", () => {
  const light = readBlock(":root");
  const dark = readBlock(".dark");

  it.each(REQUIRED_TOKENS)("définit --%s en clair et en sombre", (token) => {
    expect(readToken(light, token), `clair: ${token}`).toBeDefined();
    expect(readToken(dark, token), `sombre: ${token}`).toBeDefined();
  });

  it("le thème sombre n'est pas une copie du thème clair", () => {
    expect(readToken(dark, "background")).not.toBe(readToken(light, "background"));
    expect(readToken(dark, "card")).not.toBe(readToken(light, "card"));
  });
});

describe("aucune couleur codée en dur dans l'interface", () => {
  function listSourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) return listSourceFiles(full);
      return /\.(tsx?|jsx?)$/.test(name) ? [full] : [];
    });
  }

  it("les fichiers .ts/.tsx de src/ ne contiennent pas de couleur hexadécimale", () => {
    const offenders = listSourceFiles("src").filter((file) =>
      /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});
