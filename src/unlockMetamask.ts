import {Page} from "puppeteer";

export default async function (page: Page) {
    page.setDefaultTimeout(parseInt(process.env.TIME_OUT));
    await page.waitForSelector('#password', {visible: true});
    await page.type('#password', process.env.METAMASK_PASSWORD);
    await page.click('[data-testid="unlock-submit"]');
    await new Promise(r => setTimeout(r, 3000));
}