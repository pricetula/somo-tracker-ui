import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
    const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';

    test.beforeEach(async ({ page }) => {
        await page.goto(PUBLIC_URL);
    });

    test('has correct title and metadata', async ({ page }) => {
        await expect(page).toHaveTitle('SomoTracker – Academic Progression Tool');
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
            'content',
            'Track student progress, set academic goals, and analyze performance in real-time. Centralized, collaborative, and data-driven.'
        );
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
            'content',
            'SomoTracker – Academic Progression Tool'
        );
    });

    test('displays the main header', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('SomoTracker 🚀');
    });

    test('shows key features section', async ({ page }) => {
        await expect(page.locator('h2#features')).toHaveText('Key Features');
    });
});
