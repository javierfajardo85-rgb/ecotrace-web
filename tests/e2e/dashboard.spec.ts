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

test.describe("Compliance", () => {
  test("shows frameworks, provenance and reports", async ({ page }) => {
    await page.goto("/dashboard/compliance");
    await expect(page.getByText("GLEC Framework v3")).toBeVisible();
    await expect(page.getByText("Omega Engine · physics-informed NN")).toBeVisible();
    await expect(page.getByText("Scope 3 transport emissions report")).toBeVisible();
    await expect(page.getByText("Verified").first()).toBeVisible();
  });
});

test.describe("Operations", () => {
  test("shows intensity bars and a routes table with flags", async ({ page }) => {
    await page.goto("/dashboard/operations");
    await expect(page.getByText("City · high traffic")).toBeVisible();
    await expect(page.getByText("Hull → Bristol")).toBeVisible();
    await expect(page.getByText("Anomaly", { exact: true })).toBeVisible();
    await expect(page.getByText("Overload", { exact: true })).toBeVisible();
  });
});

test.describe("Fleet", () => {
  test("shows vehicle inventory and a map placeholder", async ({ page }) => {
    await page.goto("/dashboard/fleet");
    await expect(page.getByText("HGV-018")).toBeVisible();
    await expect(page.getByText("Route map")).toBeVisible();
  });
});
