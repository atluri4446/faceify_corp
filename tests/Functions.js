import { expect } from '@playwright/test';  // Add this import

export async function login(page) {
    try {
        await page.goto('https://testproduction.faceify.app/web');
        await page.getByPlaceholder('Enter username').click();
        await page.getByPlaceholder('Enter username').fill('admin@test.com');
        await page.getByPlaceholder('Enter username').press('Tab');
        await page.getByPlaceholder('Enter password').fill('Rnit@123');
        await page.getByText('Show').click();
        await page.getByRole('button', { name: 'Login' }).click();
      
        
        // Wait for navigation or network idle
        await page.waitForLoadState('networkidle');
        
        // Then check for toast
        await expect(page.locator('#toast-1-description')).toContainText('Loggedin Successfully', 
          { timeout: 5000 });
        await page.getByText('HRMS').first().click();
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}