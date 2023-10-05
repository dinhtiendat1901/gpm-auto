import {Page} from "puppeteer";

export default async function (page: Page) {
    await page.waitForSelector('#onboarding__terms-checkbox', {visible: true});
    await new Promise(r => setTimeout(r, 1000));
    await page.click('#onboarding__terms-checkbox');
    await page.click('[data-testid="onboarding-create-wallet"]');
    await page.waitForSelector('[data-testid="metametrics-i-agree"]');
    await page.click('[data-testid="metametrics-i-agree"]');
    await page.waitForSelector('[data-testid="create-password-new"]');
    await page.type('[data-testid="create-password-new"]', 'Jav13579');
    await page.type('[data-testid="create-password-confirm"]', 'Jav13579');
    await page.click('[data-testid="create-password-terms"]');
    await page.click('[data-testid="create-password-wallet"]');
    await page.waitForSelector('[data-testid="secure-wallet-later"]');
    await page.click('[data-testid="secure-wallet-later"]');
    await page.waitForSelector('[data-testid="skip-srp-backup-popover-checkbox"]');
    await page.click('[data-testid="skip-srp-backup-popover-checkbox"]');
    await page.click('[data-testid="skip-srp-backup"]');
    await page.waitForSelector('[data-testid="onboarding-complete-done"]');
    await page.click('[data-testid="onboarding-complete-done"]');
    await page.waitForSelector('[data-testid="pin-extension-next"]');
    await page.click('[data-testid="pin-extension-next"]');
    await page.waitForSelector('[data-testid="pin-extension-done"]');
    await page.click('[data-testid="pin-extension-done"]');
}