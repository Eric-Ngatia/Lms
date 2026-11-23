import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

// Page de référence visuelle : elle n'affiche aucune donnée pédagogique.
// Classes écrites en entier : Tailwind ne détecte pas les classes construites dynamiquement.
const SWATCHES = [
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "accent", className: "bg-accent" },
  { name: "muted", className: "bg-muted" },
] as const;
const STATE_TOKENS = [
  { name: "success", Icon: CheckCircle2, label: "Succès", className: "text-success" },
  { name: "warning", Icon: AlertTriangle, label: "Attention", className: "text-warning" },
  { name: "destructive", Icon: XCircle, label: "Erreur", className: "text-destructive" },
  { name: "info", Icon: Info, label: "Information", className: "text-info" },
] as const;

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Design system</h1>
        <ThemeToggle />
      </header>

      <section aria-labelledby="couleurs" className="space-y-3">
        <h2 id="couleurs" className="text-lg font-semibold">
          Couleurs
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SWATCHES.map(({ name, className }) => (
            <div key={name} className="rounded-card border border-border bg-card p-3 text-sm">
              <div className={`mb-2 h-10 rounded-md border border-border ${className}`} />
              {name}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="etats" className="space-y-3">
        <h2 id="etats" className="text-lg font-semibold">
          États fonctionnels
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {STATE_TOKENS.map(({ name, Icon, label, className }) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-card border border-border bg-card p-3"
            >
              <Icon className={`size-5 ${className}`} aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="boutons" className="space-y-3">
        <h2 id="boutons" className="text-lg font-semibold">
          Boutons
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button>Principal</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="outline">Contour</Button>
          <Button variant="ghost">Discret</Button>
          <Button variant="destructive">Supprimer</Button>
          <Button disabled>Désactivé</Button>
        </div>
      </section>

      <section aria-labelledby="typo" className="space-y-3">
        <h2 id="typo" className="text-lg font-semibold">
          Typographie
        </h2>
        <p>Geist Sans pour l&apos;interface et la lecture des cours.</p>
        <pre className="rounded-card border border-border bg-muted p-4 font-mono text-sm">
          aws s3 ls --region eu-west-3
        </pre>
      </section>
    </main>
  );
}
