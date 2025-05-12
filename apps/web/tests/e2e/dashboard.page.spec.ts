import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
    const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';

    test.beforeEach(async ({ page }) => {
        await page.goto(PUBLIC_URL);
    });

    test('displays the main header', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('SomoTracker');
    });
});
