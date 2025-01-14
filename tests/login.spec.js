import { test, expect } from '@playwright/test';
import { login } from './Functions';

test('Faceify Login', async ({ page }) => {
    await login(page);
});