import { describe, expect, it } from "vitest";
import { parseEnv } from "@/lib/env";

describe("parseEnv", () => {
  it("accepte une URL de base de données valide", () => {
    const env = parseEnv({ DATABASE_URL: "postgres://user:pass@localhost:5432/cla" });
    expect(env.DATABASE_URL).toContain("localhost");
  });

  it("refuse une configuration sans DATABASE_URL", () => {
    expect(() => parseEnv({})).toThrow(/DATABASE_URL/);
  });

  it("n'exige aucune clé IA : l'application fonctionne sans IA", () => {
    const env = parseEnv({ DATABASE_URL: "postgres://u:p@localhost:5432/cla" });
    expect(env.AI_PROVIDER).toBe("none");
  });

  it("refuse un fournisseur IA inconnu", () => {
    expect(() =>
      parseEnv({ DATABASE_URL: "postgres://u:p@localhost:5432/cla", AI_PROVIDER: "inconnu" }),
    ).toThrow(/AI_PROVIDER/);
  });
});
