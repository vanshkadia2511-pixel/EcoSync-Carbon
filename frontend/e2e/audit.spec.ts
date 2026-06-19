import { test, expect } from '@playwright/test';

test.describe('EcoTrack E2E Flows', () => {
  test('should load Landing page, run Audit with exact spec, verify Dashboard, and chat with Coach', async ({ page }) => {
    // 1. Go to Landing Page
    await page.goto('/');
    await expect(page).toHaveTitle(/EcoTrack — Carbon Footprint Tracker/i);
    
    // 2. Click Start Audit
    const auditBtn = page.getByRole('link', { name: /Start Carbon Audit/i }).first();
    await auditBtn.click();
    await expect(page).toHaveURL(/\/audit/);

    // 3. Fill Audit Form with spec values
    // Transport
    await page.selectOption('select[name="transportMode"]', 'car');
    await page.fill('input[name="transportKm"]', '120');

    // Diet
    await page.selectOption('select[name="diet"]', 'vegetarian');

    // Electricity
    await page.fill('input[name="electricity"]', '180');

    // Shopping
    await page.selectOption('select[name="shopping"]', 'medium');

    // Flights
    await page.fill('input[name="flights"]', '0');

    // Household size
    await page.fill('input[name="householdSize"]', '1');

    // 4. Verify live preview calculations (transport 120km = 100.8kg, vegetarian = 85kg, electricity 180kwh = 147.6kg, shopping = 70kg, total = 403.4kg, score = 72)
    const monthlyPreview = page.locator('p:has-text("403.4")');
    await expect(monthlyPreview).toBeVisible();

    const scorePreview = page.locator('div:has-text("72")').first();
    await expect(scorePreview).toBeVisible();

    // 5. Submit Audit
    const submitBtn = page.getByRole('button', { name: /Calculate & Save/i });
    await submitBtn.click();
    
    // 6. Verify Dashboard redirect & 6 cards
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verify 6 overview cards are displayed
    await expect(page.locator('text=Eco Score')).toBeVisible();
    await expect(page.locator('text=Monthly Footprint')).toBeVisible();
    await expect(page.locator('text=Yearly Footprint')).toBeVisible();
    await expect(page.locator('text=Highest Category')).toBeVisible();
    await expect(page.locator('text=Biggest Opportunity')).toBeVisible();
    await expect(page.locator('text=Best Habit')).toBeVisible();

    // Check specific calculations on dashboard
    await expect(page.locator('text=403.4')).toBeVisible();

    // 7. Go to AI Coach and send message
    await page.goto('/coach');
    await expect(page.locator('text=AI EcoCoach')).toBeVisible();

    const inputField = page.getByPlaceholder(/Type your environmental question here/i);
    await inputField.fill('What is my biggest footprint contributor?');
    await page.click('button[type="submit"]:has-text("Send")');

    // Verify AI response bubble appears
    await expect(page.locator('text=EcoCoach is typing...')).toBeVisible();
    // Wait for mock AI response (starts with "Your biggest opportunity is...")
    const responseBubble = page.locator('text=Your biggest opportunity is');
    await expect(responseBubble).toBeVisible({ timeout: 10000 });
  });
});
