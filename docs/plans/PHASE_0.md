# PHASE 0 — Foundation et architecture

Approuvée par le propriétaire le 2026-11-23, avec : import de SAP en brouillon (Phase 2), `git init`, ZIP dans `sources/`.

## Objectifs

Socle technique, design system validable, gouvernance documentaire.

## Scope

Next.js, TS strict, pnpm, Tailwind 4, Lucide, Geist, thèmes clair/sombre, page `/design-system`, Docker PostgreSQL, Drizzle (config), variables d'environnement validées, ESLint, Prettier, Vitest, Playwright, documents de gouvernance, ADR.

## Hors scope

Auth, tables métier, import, Course Builder, quiz, IA, shadcn/ui au-delà du bouton.

## Tâches (agent unique, pas de délégation)

1. Init Git, déplacement des ZIP dans `sources/`.
2. Projet Next.js et outillage.
3. Tests RED : tokens, thème, bouton, env ; puis GREEN.
4. UI : layout, thème, page de démonstration.
5. E2E Playwright : bascule et persistance du thème, absence de défilement horizontal (desktop + mobile).
6. Vérification des contrastes WCAG.
7. Docker/Drizzle/`.env.example`.
8. Documents + ADR + rapport.

## Critères d'acceptation

- `pnpm test`, `typecheck`, `lint`, `build`, `test:e2e` passent.
- Tokens présents et distincts dans les deux thèmes ; aucune couleur hexadécimale dans `src/**/*.ts(x)`.
- Contrastes texte ≥ 4,5:1 et composants ≥ 3:1.
- PostgreSQL démarre via Docker et accepte une connexion (**dépend de Docker Desktop lancé**).
- Les 7 documents existent, sans contradiction.

## Risques

Docker Desktop arrêté au moment de l'exécution · incompatibilité de versions (voir ADR-002) · BOM UTF-8 sous PowerShell 5.1.
