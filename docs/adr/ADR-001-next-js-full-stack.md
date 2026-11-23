# ADR-001 — Next.js full-stack sans backend séparé

## Statut

Accepté

## Contexte

Le prompt impose Next.js comme framework full-stack et interdit un backend Express/Fastify sans justification.

## Options étudiées

Next.js seul ; Next.js + API séparée.

## Décision

Next.js App Router (Server Actions, Route Handlers), services métier dans `src/modules`.

## Justification

Moins de pièces à déployer, types partagés, conforme au prompt.

## Conséquences

Les tâches longues (import, indexation) passeront par une abstraction de jobs ; un worker séparé devra faire l'objet d'un nouvel ADR.

## Date

2026-11-23
