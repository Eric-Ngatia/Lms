# ADR-002 — TypeScript 5.x plutôt que 7.x

## Statut

Accepté

## Contexte

`pnpm add -D typescript` a installé TypeScript 7.0.2. `pnpm lint` échouait : « typescript-eslint does not support TS 7.0 » (observé).

## Options étudiées

Rester en TS 7 sans lint TypeScript ; fixer TS 5.

## Décision

TypeScript 5.x (`typescript@5`).

## Justification

Le lint typé est requis par le prompt (ESLint). typecheck et build fonctionnent avec TS 5.

## Conséquences

Réévaluer le passage à TS 7 quand typescript-eslint le supportera (nouvel ADR).

## Date

2026-11-23
