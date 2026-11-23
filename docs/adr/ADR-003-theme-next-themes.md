# ADR-003 — Thème par classe CSS avec next-themes

## Statut

Accepté

## Contexte

Deux thèmes complets, préférence conservée, option système (§5.3).

## Options étudiées

Media query seule ; classe `dark` + next-themes ; implémentation maison.

## Décision

Tokens CSS dans `:root`/`.dark`, bascule via next-themes (`attribute=class`, clé `cla-theme`, défaut système).

## Justification

Évite le flash de thème et la logique de stockage maison ; vérifié par test E2E (persistance après rechargement).

## Conséquences

Dépendance supplémentaire légère (next-themes).

## Date

2026-11-23
