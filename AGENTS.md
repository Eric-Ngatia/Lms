# AGENTS.md — Cloud Learning Academy

Instructions permanentes du projet. Le repository et ses documents sont la source de vérité, pas la conversation.

## A. Mission

Plateforme web d'apprentissage des technologies Cloud qui transforme des repositories pédagogiques (ZIP, puis GitHub) en parcours structurés : lecture, quiz, labs, examens, flashcards, progression, tuteur IA.
Elle doit rester évolutive, modulaire, maintenable, sécurisée, testable et indépendante des repositories importés.

## B. Stack validée

Next.js App Router · TypeScript strict (5.x, voir ADR-002) · React · pnpm · Tailwind CSS 4 · shadcn/ui (composants dans `src/components/ui`) · Lucide React · Geist Sans/Mono · PostgreSQL · Drizzle ORM · Auth.js · Zod · React Hook Form · Vitest · Testing Library · Playwright · Docker Compose.
Toute modification de stack exige une justification et la validation du propriétaire.

## C. Principes

- Logique métier séparée de l'interface ; modules indépendants ; services testables.
- Validation serveur systématique ; PostgreSQL = source de vérité.
- Contenu pédagogique dynamique, jamais codé dans les composants.
- Contenu importé (original, immuable) séparé du contenu édité (Course Builder).
- Traçabilité des sources ; pas de dépendance inutile.

## D. Règles absolues

Ne jamais : coder un cours en dur · inventer des données présentées comme réelles · créer des boutons ou fonctionnalités factices · supprimer ou affaiblir un test · modifier les sources importées · exposer un secret · ignorer la sécurité · ajouter une dépendance importante sans justification · introduire un backend séparé sans approbation · passer à la phase suivante sans approbation explicite · déclarer terminé sans vérification · prétendre avoir exécuté ce qui ne l'a pas été.

## E. Lire avant de modifier

- `AGENTS.md`
- `docs/architecture.md`
- la spécification du module concerné
- `docs/development-workflow.md`
- `docs/design-system.md` (travail d'interface)
- `docs/ai-guidelines.md` (travail lié à l'IA)
- `docs/content-import-specification.md` (import et contenu)

Mettre à jour les documents impactés.

## F. Workflow

Voir `docs/development-workflow.md` : PLAN → approbation → RED → GREEN → REFACTOR → validation → revue → rapport → approbation.

## G. Design system

`docs/design-system.md` fait foi. Couleurs uniquement via tokens CSS (`src/app/globals.css`) ; aucune valeur hexadécimale dans `src/**/*.ts(x)` (test `tests/unit/design-tokens.test.ts`).

## H. Sécurité

Contrôles côté serveur. Le frontend n'est jamais une frontière de sécurité. Les scripts importés ne sont jamais exécutés.

## I. Qualité

Chaque fonctionnalité a ses tests ; elle n'est terminée qu'une fois ses critères d'acceptation validés.
Code lisible (§32 du prompt) : noms explicites, fonctions courtes, commentaires sur le « pourquoi ».

## J. Évolution de la gouvernance

Identifier le document → proposer la modification → approbation si elle change une règle validée → mettre à jour → vérifier l'absence de contradiction.

## Commandes

`pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm test:e2e` · `docker compose up -d` (PostgreSQL) · `pnpm db:generate` / `pnpm db:migrate`

## Environnement connu (Windows)

- Écrire les fichiers en UTF-8 **sans BOM** (un BOM casse `tsconfig.json` sous Turbopack).
- Les ZIP sources sont dans `sources/` et ne sont jamais modifiés.
