import { test, expect } from "@playwright/test";

test.describe("Overview", () => {
  test("shows measured hero, average-factor comparison, metrics and compliance", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Measured CO₂e", { exact: false })).toBeVisible();
    await expect(page.getByText("1,247")).toBeVisible();
    await expect(page.getByText("+11.6%")).toBeVisible();
    await expect(page.getByText("±0.43%").first()).toBeVisible();
    await expect(page.getByText("ISO 14083")).toBeVisible();
    await expect(page.getByText("Standard HGV")).toBeVisible();
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
