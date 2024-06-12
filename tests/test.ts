import { expect, test } from '@playwright/test';

test.describe('layout', async () => {
  test('layout has a header available.', async ({ page }) => {
    await page.goto('/');
  });
});
