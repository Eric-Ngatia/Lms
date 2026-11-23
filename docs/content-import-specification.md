# Spécification du moteur d'importation

Statut : contrat de Phase 0, implémenté en Phase 2. Basé sur l'analyse réelle des deux ZIP de `sources/`.

## A. Objectif

Importer de nouveaux repositories pédagogiques sans modifier le code des modules cours, quiz ou dashboard.

## B. Sources

Phase 2 : ZIP uniquement. Plus tard : GitHub public (SSRF, redirections contrôlées), GitHub privé (token chiffré), synchronisation.

## C. Formats

Markdown, TXT, JSON, YAML, CSV, HTML, images, code, ZIP imbriqué. PDF : **À DÉCIDER** (bibliothèque d'extraction, aucun PDF dans les deux ZIP actuels).
Tout format non reconnu est conservé et signalé ; jamais supprimé silencieusement.

## D. Pipeline

Source → Validation → Import Job → Extraction sécurisée → File Discovery → Parsing → Classification → Metadata → Content Mapping → Prévisualisation → Validation admin → Publication.
Les étapes déterministes ne nécessitent pas d'IA.

## E. Classification

Catégories : Course, Module, Chapter, Lesson, Lab, Quiz, Exam, Flashcard, Cheatsheet, Use Case, Diagram, Glossary, Resource, Code, Unknown.
Chaque résultat porte un score de confiance ; en cas d'ambiguïté → `Unknown` + signalement. La classification n'est jamais infaillible : correction manuelle prévue.

## F. Mapping pédagogique

Source → Learning Path / Module / Lesson / Lab / Quiz / Exam / Flashcard / Skill / Resource.

## G. Préservation

Original jamais modifié. Métadonnées : repository, URL, chemin, nom, type, version, hash (SHA-256), date d'import, section/page, infos d'extraction.

## H. Réimportation

États : nouveau, modifié, supprimé, inchangé, modification locale, conflit. Aucune modification éditoriale écrasée sans politique de résolution (**À DÉCIDER** en Phase 2).

## I. Sécurité

Limites de taille et de ratio de décompression, ZIP Slip (chemins `..`, absolus, lecteurs), type réel vs extension, aucun script exécuté (les `.py`/`.sh` sont des ressources téléchargeables), contenu traité comme non fiable.
Limites chiffrées : **À DÉCIDER** (les deux ZIP actuels : 3,6 Mo et 3,0 Mo, 4,4 Mo et 2,9 Mo décompressés, ~260 fichiers chacun).

## J. Évolutivité

Interface commune d'adaptateur (à définir en Phase 2). Un nouvel adaptateur = un fichier dans le module d'import.

## K. Cas non pris en charge

Corrompu, inconnu, trop gros, non extractible, ambigu, dangereux : erreur enregistrée dans `ImportErrors`, original conservé quand c'est sûr.

## L. Repositories analysés (faits observés)

**SAA-C03** (`aws-certified-solutions-architect-associate-brasil-saa-c03-english`, anglais, MIT) : 31 dossiers `NN-Titre`, 189 `.md`.
Fichiers par module : `README.md`, `cheatsheet.md`, `flashcards.md` (`## Card NN` + `<details>`), `questions.md` (`<!-- question-id: 04-Q01 -->`, options `A)`…`D)`, bloc `<details>` avec `✅ **Correct answer:** A`, explication, justification des distracteurs), `lab.md`, `use-cases.md`, `links.md`.
Modules « lab » (03, 07, 09, 11, 15) : `lab.md` + `links.md`. Module 29 : examens blancs. Racine : `README.md`, `DOMAIN_STUDY_PATHS.md`, `MODULE_TEMPLATE.md`, portail HTML, scripts `.py`/`.sh`, `docs/english-edition/*.json` (métadonnées éditoriales). Total : 125 questions, 198 flashcards.

**SAP-C02** (`aws-certified-solutions-architect-professional-brasil-main`, portugais, MIT) : 31 dossiers, 217 `.md` de 600 à 1500 octets, noms en portugais (`questoes.md`, `casos-de-uso.md`), sans `README` de module riche. Contenu générique répété (même texte, nom de service substitué). **Importable, non publiable en l'état.**

Particularités à gérer : noms de fichiers selon la langue du repository (mapping par adaptateur, pas de `if` dispersé) ; liens promotionnels et photo personnelle dans les README (classés Resource) ; fichiers `.github/`, `LICENSE`, `CONTRIBUTING.md` (classés Resource).
Non vérifié : format exact des questions du module 29 (SAA) et recoupement de fichiers entre les deux repositories.
