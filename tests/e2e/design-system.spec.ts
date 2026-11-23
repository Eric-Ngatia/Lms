import { expect, test } from "@playwright/test";

test("la page de démonstration s'affiche et bascule en thème sombre", async ({ page }) => {
  await page.goto("/design-system");
  await expect(page.getByRole("heading", { name: "Design system", level: 1 })).toBeVisible();

  await page.getByRole("button", { name: "Thème sombre" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "Thème clair" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("le thème choisi est conservé après rechargement", async ({ page }) => {
  await page.goto("/design-system");
  await page.getByRole("button", { name: "Thème sombre" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("la page n'a pas de défilement horizontal", async ({ page }) => {
  await page.goto("/design-system");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
