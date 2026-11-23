# ADR-005 — Image PostgreSQL de développement

## Statut

Proposé

## Contexte

Docker Compose requis ; pgvector sera nécessaire en Phase 11.

## Options étudiées

postgres:17 ; pgvector/pgvector dès maintenant.

## Décision

`postgres:17` en Phase 0.

## Justification

Évite une image spécialisée tant que le RAG n'est pas commencé.

## Conséquences

Changement d'image requis en Phase 11 (**À DÉCIDER**).

## Date

2026-11-23
