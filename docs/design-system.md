# Design system — source unique de vérité visuelle

Implémentation : `src/app/globals.css` (tokens) · `src/components/ui/` (composants) · page de référence : `/design-system`.

## A. Identité

SaaS éducatif premium, minimaliste, professionnel, lisible. Cyan et violet restent des accents.

## B. Palette

Marque : navy `#111827`, bleu `#2563EB`, cyan `#06B6D4`, violet `#8B5CF6`.
Fonctionnelle : succès `#16A34A`, attention `#F59E0B`, erreur `#DC2626`, information `#06B6D4`.

Les valeurs de marque sont des références. Les tokens finaux sont ajustés par thème pour respecter les contrastes (ex. `--success` clair = `#15803d`, plus foncé que `#16A34A`, pour atteindre 4,5:1 sur fond blanc).

## C. Thèmes

Deux thèmes complets, définis à la main (pas d'inversion automatique) : `:root` (clair) et `.dark`.
Tokens : background, foreground, card, card-foreground, primary, primary-foreground, secondary, secondary-foreground, muted, muted-foreground, accent, accent-foreground, border, input, ring, success, warning, destructive, info.

| Token      | Clair     | Sombre                     |
| ---------- | --------- | -------------------------- |
| background | `#f8fafc` | `#0b1020`                  |
| card       | `#ffffff` | `#111827` (navy de marque) |
| primary    | `#2563eb` | `#3b82f6`                  |
| foreground | `#111827` | `#e5e7eb`                  |

Préférence : clair / sombre / système, mémorisée par `next-themes` sous la clé `cla-theme` (`src/lib/theme.ts`). Défaut : système.

## D. Typographie

Geist Sans (interface, lecture) · Geist Mono (code, commandes). Chargées via le package `geist`.
Échelle de tailles et hauteurs de ligne du lecteur de cours : **À DÉCIDER** en Phase 4.

## E. Espacement

Échelle 4/8 px (classes Tailwind). Cartes `rounded-card` (12 px via `--radius`). Contrôles : 32 / 40 / 48 px de hauteur (`sm` / `md` / `lg`).

## F. Composants

Phase 0 : `Button` (variantes primary, secondary, outline, ghost, destructive ; tailles sm, md, lg).
Les autres (Card, Input, Dialog, Tabs, Toast, Table…) sont ajoutés avec shadcn/ui quand une phase en a besoin, pas avant.

## G. Icônes

Lucide React uniquement, `aria-hidden` si décoratives, pas d'emojis dans l'interface.

## H. Layout et I. Responsive

Sidebar rétractable, layouts dashboard / lecture / examen / admin : **À DÉCIDER** en Phase 1 (premier écran authentifié). Les pages doivent ne produire aucun défilement horizontal (test E2E sur desktop et mobile).

## J. Accessibilité

Focus clavier visible (`:focus-visible`), `prefers-reduced-motion` respecté, boutons de thème avec `aria-label` et `aria-pressed`, états non portés par la couleur seule (icône + libellé).
Contrastes vérifiés (Phase 0, calculés depuis `globals.css`) : texte ≥ 4,5:1 ; bordure de champ et anneau de focus ≥ 3:1, dans les deux thèmes.

## K. Animations

Courtes et fonctionnelles uniquement.

## L. États UI

Idle, loading, processing, success, error, empty, disabled, unauthorized : à prévoir pour chaque fonctionnalité interactive.

## M. Espaces

Dashboard, Course Reader, Labs, Quiz, Exams, AI Tutor, Révision, Administration : ergonomies détaillées au démarrage de leur phase.

## N. Règle d'implémentation

Pas de couleur hexadécimale dans `src/**/*.ts(x)` (garanti par un test). Classes Tailwind écrites en entier, jamais construites dynamiquement (`bg-${x}` n'est pas détecté au build).

## O. Validation Phase 0

Palette, tokens, thèmes, typographie, bouton, page de démonstration : faits. Contrastes : faits. Contrôle visuel humain en clair/sombre et mobile : **à faire par le propriétaire** sur `/design-system`.
