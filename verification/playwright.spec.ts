import { test, expect } from '@playwright/test';

test('Cron Parser verification', async ({ page }) => {
  await page.goto('http://localhost:3000/parse-cron-expression');
  await expect(page).toHaveTitle(/Cron/);

  await page.fill('#cron_input', '0 12 * * 1-5');

  await expect(page.locator('.nes-container.is-success')).toContainText('At 12:00 PM, Monday through Friday');

  const rows = page.locator('table.nes-table tbody tr');
  await expect(rows).toHaveCount(5);

  await page.screenshot({ path: 'verification/screenshots/cron-parser.png' });
});
