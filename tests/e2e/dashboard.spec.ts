import { test, expect } from "@playwright/test";

test.describe("Overview", () => {
  test("shows the measured CO2e hero", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Measured CO₂e", { exact: false })).toBeVisible();
  });
});

test.describe("Shell", () => {
  test("sidebar shows the five sections", async ({ page }) => {
    await page.goto("/dashboard");
    const nav = page.getByRole("navigation");
    for (const label of ["Overview", "Compliance", "Operations", "Fleet & routes", "Reports"]) {
      await expect(nav.getByText(label)).toBeVisible();
    }
  });
});
