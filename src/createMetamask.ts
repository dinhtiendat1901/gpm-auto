import {Page} from "puppeteer";

export default async function (page: Page) {
    page.setDefaultTimeout(15000);
    await page.waitForSelector('#onboarding__terms-checkbox', {visible: true});
    let isChecked = false;
    while (!isChecked) {
        await page.click('#onboarding__terms-checkbox');
        isChecked = await page.$eval('#onboarding__terms-checkbox', (element: Element) => {
            return element.classList.contains('check-box__checked');
        });
        if (isChecked) break;
    }
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