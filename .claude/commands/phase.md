---
description: Rappelle et applique le cycle obligatoire A → E (plan, exécution TDD, tests et qualité, revue, rapport) pour une phase de Cloud Learning Academy
argument-hint: <numéro de phase, ex. 0>
---

# Cycle de travail d'une phase (A → E) — Phase $ARGUMENTS

> Commande `/phase` : à suivre pour chaque phase, sans exception. Ce cycle reprend le protocole du prompt principal v2.0 (§26 Protocole strict, §28 Rapports, §31.13 Cohérence documentaire, §31.14 Continuité, §32.11 Revue de lisibilité). Le rappel du cycle figure aussi dans `AGENTS.md` et `docs/development-workflow.md`.

## 0. Reprise de contexte (avant toute action)
1. Lire `AGENTS.md`, puis `docs/development-workflow.md` et `docs/architecture.md`.
2. Identifier la dernière phase validée et lire son rapport `docs/reports/PHASE_<n-1>_RAPPORT.md`.
3. Lire les ADR récents pertinents dans `docs/adr/`.
4. Vérifier l'état réel du dépôt : `git status`, `git log -5`, modifications non commitées, état des tests.
5. Présenter au propriétaire un résumé de reprise et confirmer le périmètre de la Phase $ARGUMENTS.

Ne jamais se fier uniquement à l'historique de conversation. Ne jamais reprendre une phase interrompue sans vérifier l'état réel du code.

## Organisation agentique

### Agents
Les sous-agents du projet sont définis dans `.claude/agents/` et versionnés avec le dépôt :

| Agent | Modèle | Rôle | Écrit du code ou des documents ? |
|---|---|---|---|
| `planner` | sonnet | Plans de phase, découpage, critères d'acceptation, assemblage des rapports | `docs/plans/` et `docs/reports/` uniquement |
| `architect` | opus | Architecture, modules, contrats, frontières de confiance, ADR, cohérence entre phases | `docs/architecture.md`, `docs/adr/` ; ne code pas l'application seul |
| `database-specialist` | opus | Modèle PostgreSQL, Drizzle, contraintes, index, invariants, migrations, versions de contenu, pgvector | Oui, fichiers attribués (`src/db/`, `drizzle/`) |
| `frontend-engineer` | sonnet | Design system, thèmes, composants, pages, accessibilité, responsive | Oui, fichiers attribués (`src/app/`, `src/components/`, `docs/design-system.md`) |
| `backend-engineer` | sonnet | Services métier, Server Actions, Route Handlers, Auth.js, moteur d'importation, moteurs de progression, quiz, labs, examens | Oui, fichiers attribués (`src/modules/`, `src/lib/`, `docs/content-import-specification.md`) |
| `ai-engineer` | sonnet | Fournisseurs IA, tuteur, traduction contextuelle, RAG, injections de prompt, coûts | Oui, fichiers attribués (`src/modules/ai-tutor/`, `src/modules/search/`, `docs/ai-guidelines.md`) |
| `instructional-designer` | sonnet | Diagnostic pédagogique, classification, compétences, règles pédagogiques | Documents uniquement (`docs/pedagogy/`) ; jamais de code |
| `devops` | sonnet | Versions vérifiées, Docker Compose, variables d'environnement, CI, stockage, déploiement, sauvegardes, coûts | Oui, fichiers d'infrastructure attribués |
| `qa-tester` | sonnet | Tests RED, traçabilité, non-régression, tests de sécurité, recherche active de défauts | Tests et documents de test uniquement |
| `security-auditor` | opus | Authentification, permissions, IDOR, imports, SSRF, examens, secrets, injections de prompt | Son rapport d'audit ; signale sans corriger le travail des autres |
| `independent-reviewer` | opus | Revue indépendante, lisibilité, sincérité des tests, cohérence documentaire, verdict | Jamais : lecture seule |

### Propriété des fichiers partagés
| Fichier | Rédacteur | Contributeurs (via leur rapport) |
|---|---|---|
| `AGENTS.md` | agent principal | `architect`, tous |
| `docs/product-specification.md` | agent principal | `instructional-designer`, `architect` |
| `docs/development-workflow.md` | agent principal | `planner` |
| `docs/architecture.md`, `docs/adr/` | `architect` | `database-specialist`, `devops`, `ai-engineer` |
| `docs/design-system.md` | `frontend-engineer` | `independent-reviewer` |
| `docs/content-import-specification.md` | `backend-engineer` | `instructional-designer`, `security-auditor` |
| `docs/ai-guidelines.md` | `ai-engineer` | `security-auditor` |
| `docs/plans/`, `docs/reports/` | `planner` | tous |

### Coordination
- L'agent principal garde la responsabilité de l'ensemble. Il délègue des tâches délimitées en donnant à chaque agent : objectif, contexte, fichiers concernés, **fichiers qu'il a le droit d'écrire**, critères d'acceptation, contraintes.
- **Un fichier n'a qu'un rédacteur à la fois.** Les autres agents proposent leurs entrées dans leur rapport.
- Les agents ne prennent aucune décision métier ou architecturale importante : ils la marquent `À DÉCIDER` avec options et recommandation, et le propriétaire tranche.
- L'agent principal synthétise les rapports, résout les désaccords et **vérifie lui-même** les fichiers produits et les commandes réellement exécutées : un rapport d'agent n'est jamais une preuve suffisante.
- Avant de déléguer, vérifier les capacités réellement disponibles (sous-agents chargés, exécution parallèle ou non). Sans parallélisme, travailler avec les sous-agents en séquence. Si peu d'agents sont disponibles, combiner des rôles compatibles, mais **toujours garder une revue indépendante dans un contexte neuf** (`independent-reviewer`, ou à défaut une session séparée). Ne jamais prétendre avoir délégué une tâche qui ne l'a pas été.

## Cycle obligatoire pour chaque phase (TDD strict)

**A. Plan** (mode plan, aucune modification ; inspections et diagnostics sans effet autorisés).
- Relire les exigences de la phase (prompt principal §27), les documents de gouvernance et les ADR acceptés.
- Le `planner` rédige, avec l'`architect` (et l'`instructional-designer` si la phase touche la pédagogie) : objectif précis ; scope et hors scope ; fichiers à créer ou modifier **avec leur agent rédacteur** ; dépendances et ordre ; risques et cas limites ; critères d'acceptation testables ; **spécification des tests à écrire en B1 (cas nominaux, limites, erreurs, permissions, sécurité)** ; décisions `À DÉCIDER` à faire approuver.
- Le plan est enregistré dans `docs/plans/PHASE_$ARGUMENTS.md`.
- **Attendre l'approbation explicite du propriétaire.** Une question ou une demande de précision n'est pas une approbation.

**B. Exécution (boucle TDD Red → Green).**
- **B1. Tests d'abord (RED).** Le `qa-tester` écrit uniquement les tests prévus au plan (Vitest, React Testing Library, Playwright, intégration PostgreSQL). Exécuter la suite ciblée et vérifier qu'ils échouent **pour la raison métier attendue**, pas pour une configuration cassée. **Interdiction d'écrire le code applicatif avant cet échec confirmé.**
- **B2. Implémentation (GREEN).** Les agents rédacteurs écrivent le code minimal qui fait passer les tests de B1 au vert. **Interdiction de modifier les assertions des tests de B1 sans approbation.**
- **Règles transverses.**
  - Seulement les tâches prévues ; délégation des tâches indépendantes ; respect de l'architecture et des contrats validés ; aucune fonctionnalité hors périmètre.
  - Aucun contenu pédagogique codé en dur, aucune donnée fictive, aucun bouton factice, aucun secret exposé, aucune source importée modifiée.
  - Design system obligatoire pour toute UI : tokens uniquement, Light et Dark, accessibilité.
  - Ne jamais ignorer une erreur, désactiver un contrôle de sécurité ou une étape de CI, ni écraser une modification sans vérifier son origine.
  - Bug hors phase : le documenter, évaluer s'il bloque, proposer un plan, ne pas étendre silencieusement le périmètre.
  - Contrôler `git status` et `git diff` avant de terminer.
  - Une décision importante non prévue arrête le travail sur ce point : options, recommandation, choix demandé au propriétaire.
- **Commits.** Messages conventionnels ; distinguer les commits RED, GREEN et REFACTOR lorsque c'est possible ; aucune réécriture d'historique ni réinitialisation destructive.

**C. Tests et qualité (refactor et non-régression).**
- Refactor éventuel sans changer le comportement : lisibilité, structure, noms explicites, fonctions courtes (prompt principal §32).
- Vérification complète, chaque commande indiquée avec son résultat :
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm test` (unitaires et composants)
  - `pnpm test:integration` (PostgreSQL de test via Docker Compose)
  - `pnpm test:e2e` (Playwright) quand la phase le justifie
  - `pnpm build`
  - migrations Drizzle appliquées sur une base vierge quand le schéma change
  - erreurs de console et réponses API ; vérification Light/Dark et mobile pour toute UI
- Un test bloqué par un outil, un service ou l'environnement est signalé **NOT RUN** avec la raison, jamais remplacé par une affirmation.

**D. Revue.**
- `independent-reviewer` **systématiquement**, plus `architect` et `security-auditor` selon le périmètre (`security-auditor` obligatoire pour les phases 1, 2, 6, 8, 10, 11 et 14), chacun dans un contexte neuf, avec les exigences, le plan `docs/plans/PHASE_$ARGUMENTS.md` et les critères d'acceptation, **mais sans le raisonnement des auteurs**.
- Couverture : exigences ; cohérence ; qualité ; sécurité (permissions, IDOR, injections, fuites de données, réponses d'examen) ; performance raisonnable ; maintenabilité ; **revue de lisibilité (§32.11)** ; **sincérité et couverture des tests (aucun test complaisant)** ; régressions ; **cohérence documentaire (§31.13)**.
- Défauts classés **BLOQUANT / MAJEUR / MINEUR**. Les BLOQUANTS sont corrigés par l'agent rédacteur concerné, les vérifications relancées, puis nouvelle revue, jusqu'à validation. Seuls les écarts qui touchent la correction, la sécurité ou les exigences sont à traiter ; les préférences restent facultatives.

**E. Rapport et validation.**
- Mettre à jour les documents impactés (architecture, design system, spécifications, AGENTS.md) et ajouter un ADR si une décision structurante a été prise.
- Le `planner` assemble `docs/reports/PHASE_$ARGUMENTS_RAPPORT.md` avec les 15 rubriques du prompt principal §28 : résumé ; fonctionnalités livrées ; tests RED ; tests GREEN ; commits ; commandes réellement exécutées ; résultats OK / FAILED / NOT RUN ; critères d'acceptation ; revue technique ; revue sécurité ; fichiers créés ou modifiés ; décisions architecturales ; risques ; dette technique ; consignes pour la phase suivante.
- L'agent principal vérifie le rapport contre le dépôt réel, puis présente les résultats et **demande explicitement la validation**.
- **Ne jamais commencer automatiquement la phase suivante**, même si tout est vert.
