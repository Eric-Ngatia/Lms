# Spécification produit

Statut : brouillon de Phase 0. Règles marquées **À DÉCIDER** : non validées.

## A. Vision

Aider un apprenant à passer de la lecture de ressources Cloud brutes (repositories GitHub/ZIP) à un parcours mesurable : Learn → Understand → Test → Practice → Validate → Retain. Valeur ajoutée sur une simple documentation : progression, évaluations corrigées, révision espacée, tuteur contextualisé.
Interface en français ; ressources originales conservées (anglais, portugais).

## B. Profils

Apprenant (débutant, intermédiaire, avancé : un seul rôle, niveau déclaré dans le profil) · Administrateur pédagogique. Pas d'autre rôle pour l'instant.

## C. Modules

Voir `architecture.md` §C.

## D. Parcours utilisateurs

Première connexion · choisir un parcours · lire une leçon · traduire/simplifier · quiz et correction · lab · révision · tuteur IA · (admin) importer, organiser, publier une formation. Détail à chaque phase concernée.

## E. Règles métier

Aucune règle validée en Phase 0. À définir avec le propriétaire avant leur phase :

- Leçon terminée : **À DÉCIDER** (Phase 4).
- Progression : pondérations configurables (exemple du prompt : leçons 20 %, quiz 25 %, labs 30 %, évaluation finale 25 %), **À DÉCIDER** (Phase 5).
- Validation d'un lab sans intégration Cloud : auto-déclarée ; jamais présentée comme vérifiée (**À DÉCIDER** en Phase 7).
- Effet d'une réimportation sur une formation éditée : voir `content-import-specification.md` §H.

## F. Priorités

MVP : phases 0 à 6 (fondations, auth, import ZIP, Course Builder, lecteur, progression, quiz). V1 : labs, examens, flashcards. V2 : tuteur IA, RAG. Évolutions : gamification, portfolio, GitHub, production.

## G. Critères d'acceptation

Définis dans chaque `docs/plans/PHASE_<n>.md`, testables et observables.

## Contenus de départ connus

Deux ZIP dans `sources/` (voir `content-import-specification.md` §L). Le dépôt SAP-C02 est un brouillon à faible valeur pédagogique : importé en brouillon, non publiable en l'état.
Les examens internes ne sont jamais présentés comme des certifications officielles.
