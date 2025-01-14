import { test, expect } from '@playwright/test';
import { login } from './Functions';

// Function to generate random email
function generateRandomEmail() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `automation.${timestamp}.${random}@test.com`;
}

// Function to generate random mobile number
function generateRandomMobile() {
    // Generate first digit (6-9)
    const firstDigit = Math.floor(Math.random() * 4) + 6;
    
    // Generate 9 random digits
    const remainingDigits = Array.from({ length: 9 }, () => 
        Math.floor(Math.random() * 10)
    ).join('');
    
    return `${firstDigit}${remainingDigits}`;
}

test('create Employee', async ({ page }) => {
    try {
        // Generate random email and mobile at the start of the test
        const randomEmail = generateRandomEmail();
        const randomMobile = generateRandomMobile();
        console.log('Using email:', randomEmail); // Log the email being used
        console.log('Using mobile:', randomMobile); // Log the mobile being used

        // Login first
        await login(page);

        // Employee Management navigation
        await page.getByRole('list').locator('div').filter({ hasText: 'Employee Management' }).click();
        await page.getByRole('link', { name: 'Employee On-Board' }).click();
        await page.getByRole('button', { name: 'Add New Employee' }).click();

        // Fill employee details
        await page.getByLabel('First Name *').click();
        await page.getByLabel('First Name *').fill('Automation');
        await page.getByLabel('Role *').selectOption('Branch Manager');
        await page.getByLabel('Email *').click();
        await page.getByLabel('Email *').fill(randomEmail);
        await page.getByLabel('Mobile Number *').click();
        await page.getByLabel('Mobile Number *').fill(randomMobile);
        await page.getByLabel('Employee ID').click();
        await page.getByLabel('Employee ID').fill('Rnit_123');
        await page.getByLabel('Date of Birth').fill('2011-01-01');
        await page.getByLabel('Marital Status').selectOption('Single');
        await page.getByLabel('Date of Joining *').fill('2025-01-01');
        await page.getByLabel('Gender *').selectOption('Male');
        await page.getByLabel('Blood Group').selectOption('O+');
        await page.getByLabel('Default Shift *').selectOption('General');
        await page.getByLabel('Holiday List').selectOption('2025');
        await page.getByLabel('Grade').selectOption('Grade A');
        await page.getByLabel('Leave Policy').selectOption('HR-LPOL-2024-00001');
        await page.locator('.css-19bb58m').first().click();
        await page.locator('#react-select-2-input').fill('hem');
        await page.locator('#react-select-2-input').press('Enter');
        await page.getByLabel('Home Branch *').selectOption('Head Office');
        await page.getByLabel('Department *').selectOption('All Departments');
        await page.locator('div').filter({ hasText: /^Employee BranchesSelect\.\.\.$/ }).locator('svg').click();
        await page.locator('#react-select-3-option-1').click();
        await page.getByLabel('Employment Type').selectOption('Full-time');
        await page.getByLabel('Bank Name').click();
        await page.getByLabel('Bank Name').fill('Indusind');
        await page.getByLabel('Bank A/C No.').click();
        await page.getByLabel('Bank A/C No.').fill('+15+' + randomMobile);
        await page.getByLabel('IFSC Code').click();
        await page.getByLabel('IFSC Code').fill('Ind1230333');
        await page.getByLabel('PAN Number').fill('ABCD133456');
        await page.getByLabel('Provident Fund Account').click();
        await page.getByLabel('Provident Fund Account').fill('EIUGHE');
        await page.getByLabel('PF UAN').fill('8717271611');
        await page.getByLabel('CTC').click();
        await page.getByLabel('CTC').fill('1200000');
        await page.locator('label').filter({ hasText: 'Based on Hourly Shift Wages' }).locator('span').first().click();
        await page.getByLabel('Regular Employee Rate(R)').click();
        await page.getByLabel('Regular Employee Rate(R)').fill('10');
        await page.getByLabel('Employee Hourly Rate for OverTime(O)').click();
        await page.getByLabel('Employee Hourly Rate for OverTime(O)').fill('15');
        await page.getByLabel('Employee Hourly Rate for Holiday(H)').click();
        await page.getByLabel('Employee Hourly Rate for Holiday(H)').fill('20');      

        // Click save and wait for response
        await page.getByRole('button', { name: 'Save' }).click();

        // Wait for toast to be visible
        await page.waitForSelector('#toast-2-description', {
            state: 'visible',
            timeout: 10000
        });

        // Get the toast message
        const toastMessage = await page.locator('#toast-2-description').textContent();
        const toastStatus = await page.locator('#toast-2-description').getAttribute('data-status');

        // Add test annotation for reporting
        test.info().annotations.push({
            type: toastStatus === 'error' ? 'error' : 'success',
            description: `Toast message: ${toastMessage}\nEmail used: ${randomEmail}\nMobile used: ${randomMobile}`
        });

        // Verify based on the message received
        if (toastStatus === 'error') {
            expect(['Email must be unique', 'Mobile must be unique']).toContain(toastMessage);
        } else {
            expect(toastMessage).toBe('Employee created successfully');
        }

    } catch (error) {
        // Take screenshot on failure
        await page.screenshot({ 
            path: `test-fails/employee-creation-error-${Date.now()}.png`,
            fullPage: true 
        });
        console.error('Test execution failed:', error);
        test.info().annotations.push({
            type: 'error',
            description: `Test failed: ${error.message}`
        });
        throw error;
    }
});



