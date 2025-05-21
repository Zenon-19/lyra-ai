const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'screenshots/landing.png', fullPage: true });

  // Go to login
  await page.click('text=Get Started');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

  // Go to register
  await page.click('text=Sign up');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/register.png', fullPage: true });

  // Login as guest
  await page.click('text=Continue as Guest');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/dashboard.png', fullPage: true });

  await browser.close();
})();
