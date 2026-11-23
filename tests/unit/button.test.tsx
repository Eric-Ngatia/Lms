import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("affiche son libellé et est accessible comme bouton", () => {
    render(<Button>Continuer</Button>);
    expect(screen.getByRole("button", { name: "Continuer" })).toBeInTheDocument();
  });

  it("peut être désactivé", () => {
    render(<Button disabled>Envoyer</Button>);
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeDisabled();
  });
});
