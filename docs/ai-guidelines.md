# Gouvernance de l'IA

Statut : règles posées en Phase 0. Aucune fonctionnalité IA n'existe encore.

## Principes

L'IA est complémentaire : contextuelle, traçable, limitée, testable, configurable, à coût maîtrisé. Elle ne remplace pas un traitement déterministe suffisant (parsing, classification simple, scores, répétition espacée).

## Fournisseurs et configuration

Interface d'abstraction (Phase 10). Fournisseur, modèle et paramètres via variables d'environnement, jamais de clé en dur ni dans les logs.
Phase 0 : `AI_PROVIDER` ∈ `none` | `mock` (`src/lib/env.ts`). Sans IA, tout le reste fonctionne.

## Contextes (Phase 10)

Parcours, module, leçon, lab, quiz, examen, maîtrise, sources du repository. Transmettre le minimum nécessaire.

## RAG (Phase 11)

Extraction → nettoyage → chunking → métadonnées → embeddings → recherche hybride → reranking facultatif → citations. pgvector : **À DÉCIDER** (image PostgreSQL).

## Sources et citations

Citer repository, fichier, section, leçon, page PDF si connue. Ne jamais inventer de référence. Distinguer sources internes et connaissances générales ; signaler l'absence de source.

## Traduction

Préserver commandes, code, acronymes, noms de services. Traduction pédagogique contextuelle, mise en cache.

## Sécurité

Les documents importés sont des données non fiables, jamais des instructions. Le tuteur ignore toute consigne trouvée dans un repository. Ne jamais prétendre avoir exécuté une commande Cloud. Exemples d'indices progressifs avant toute solution d'exercice.

## Coûts

Cache, contextes limités, quotas par utilisateur, désactivation globale. Valeurs : **À DÉCIDER** en Phase 10.

## Tests

Fournisseur simulé, aucune clé requise. Tester erreurs, délais d'attente, réponses invalides, limites, injection de prompt.
