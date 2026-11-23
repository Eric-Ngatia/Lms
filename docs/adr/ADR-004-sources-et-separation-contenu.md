# ADR-004 — Sources ZIP dans sources/ et séparation source/édité

## Statut

Proposé

## Contexte

Les ZIP d'origine doivent rester intacts (§8.8) ; les modifications pédagogiques ne doivent pas être écrasées par une réimportation (§8.9).

## Options étudiées

Dossier sources/ versionné ; stockage hors Git.

## Décision

ZIP dans `sources/` (déplacés à la demande du propriétaire). Séparation en base : contenu source immuable / contenu édité.

## Justification

Respecte la traçabilité et la réimportation sûre.

## Conséquences

Détail du modèle de données et de la politique de conflit **À DÉCIDER** en Phase 2. Les ZIP (~6,6 Mo) sont actuellement commités : à rediscuter si d'autres dépôts sont ajoutés.

## Date

2026-11-23
