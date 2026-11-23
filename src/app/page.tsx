import { Cloud } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-4 py-16">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-semibold">
          <Cloud className="size-5 text-primary" aria-hidden /> Cloud Learning Academy
        </span>
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">Phase 0 — Fondations</h1>
      <p className="text-muted-foreground">
        Le socle technique est en place. Les parcours et les cours seront ajoutés par importation
        dans les phases suivantes.
      </p>
      <div>
        <Link href="/design-system" className={buttonVariants()}>
          Voir le design system
        </Link>
      </div>
    </main>
  );
}
