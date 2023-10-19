import {Page} from "puppeteer";

export default async function (page: Page) {
    page.setDefaultTimeout(15000);
    await page.waitForSelector('#password', {visible: true});
    await page.type('#password', 'Jav123456');
    await page.click('[data-testid="unlock-submit"]');
    await new Promise(r => setTimeout(r, 3000));
}