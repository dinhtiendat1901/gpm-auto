import {Browser, Page} from "puppeteer";

export default async function (page: Page, browser: Browser) {
    page.setDefaultTimeout(15000);
    await page.goto('https://www.alphabot.app/');
    await page.waitForSelector('[data-action="header-sign-in"]');
    await page.click('[data-action="header-sign-in"]');
    await page.waitForSelector('.css-1c7g2xp');
    await page.click('.css-1c7g2xp');
    const backgroundPageTarget = await browser.waitForTarget(
        target => target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/notification.html', {timeout: 30000}
    );
    const backgroundPage = await backgroundPageTarget.page();
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await new Promise(r => setTimeout(r, 1000));
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await page.waitForSelector('[data-action="header-open-profile"]', {visible: true});
}