import { z } from "zod";

// Variables d'environnement validées au démarrage.
// Aucune clé IA n'est obligatoire : sans fournisseur, l'application reste pleinement utilisable.
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AI_PROVIDER: z.enum(["none", "mock"]).default("none"),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const names = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Configuration invalide (${names}). Voir .env.example.`);
  }
  return result.data;
}
