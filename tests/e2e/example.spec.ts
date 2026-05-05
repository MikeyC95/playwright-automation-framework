import { test, expect } from '@playwright/test';

test('page title is correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Example Domain/);
});

test('page has expected heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});
