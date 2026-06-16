import { test, expect } from "@playwright/test";

test.describe("Overview", () => {
  test("shows the measured CO2e hero", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Measured CO₂e", { exact: false })).toBeVisible();
  });
});
