# Workflow de développement

## Cycle obligatoire (chaque phase)

ANALYSIS → PLAN (`docs/plans/PHASE_<n>.md`) → approbation du propriétaire → RED (tests) → vérification que l'échec vient de l'absence de la fonctionnalité → GREEN (minimum) → REFACTOR → validation complète → revue → rapport (`docs/reports/PHASE_<n>_RAPPORT.md`) → approbation avant la phase suivante.

## Règles

- Une demande de précision n'est jamais une autorisation de continuer.
- Ne pas affaiblir un test pour le faire passer. Ne pas déclarer exécuté ce qui ne l'a pas été.
- Validation : `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm test:e2e`. Documenter ce qui n'a pas été exécuté.
- Bug hors périmètre : documenter, évaluer l'impact, proposer un plan, ne pas étendre le périmètre silencieusement.
- Commits conventionnels (`feat:`, `test:`, `docs:`, `chore:`), RED/GREEN/REFACTOR séparés quand c'est pertinent. Pas de réécriture d'historique.
- Fin de phase : revue de lisibilité (noms, longueur des fonctions, commentaires, documentation à jour).

## Priorité des instructions

Sécurité > instructions récentes du propriétaire > prompt approuvé > ADR acceptés > `AGENTS.md` > spécifications > plan de phase > conventions. Conflit de même niveau : s'arrêter et demander.

## Reprise de session

Lire `AGENTS.md`, le dernier rapport, le plan en cours, les ADR récents ; vérifier `git status` et l'état réel des tests ; présenter le contexte avant d'agir.

## Agents

Les sous-agents ne sont utilisés que si le propriétaire le demande. Sinon un seul agent travaille, sans prétendre à une délégation.
