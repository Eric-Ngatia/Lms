import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { parseEnv } from "@/lib/env";

// Connexion unique à PostgreSQL, source de vérité de l'application.
const { DATABASE_URL } = parseEnv(process.env);

export const sql = postgres(DATABASE_URL);
export const db = drizzle(sql);
