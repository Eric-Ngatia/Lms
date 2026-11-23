"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { isTheme, type Theme } from "@/lib/theme";

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Thème clair", Icon: Sun },
  { value: "dark", label: "Thème sombre", Icon: Moon },
  { value: "system", label: "Thème du système", Icon: Monitor },
];

// Rien à surveiller : la valeur ne change jamais après l'hydratation.
function subscribeNothing() {
  return () => {};
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Faux sur le serveur, vrai dans le navigateur : le thème stocké n'est connu que du client.
  const isMounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );

  return (
    <div role="group" aria-label="Choix du thème" className="inline-flex gap-1">
      {OPTIONS.map(({ value, label, Icon }) => (
        <Button
          key={value}
          variant={isMounted && isTheme(theme) && theme === value ? "secondary" : "ghost"}
          size="sm"
          aria-label={label}
          aria-pressed={isMounted && theme === value}
          onClick={() => setTheme(value)}
        >
          <Icon className="size-4" aria-hidden />
        </Button>
      ))}
    </div>
  );
}
