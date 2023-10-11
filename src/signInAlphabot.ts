import {Page} from "puppeteer";
import {currentBrowser} from "./globalVariable";
import dotenv from "dotenv";

dotenv.config();

export default async function (page: Page) {
    page.setDefaultTimeout(15000);
    await page.goto(process.env.ALPHA_BOT_URL);
    await page.waitForSelector('[data-action="header-sign-in"]');
    await page.click('[data-action="header-sign-in"]');
    await page.waitForSelector('.css-1c7g2xp');
    await page.click('.css-1c7g2xp');
    const backgroundPageTarget = await currentBrowser.waitForTarget(
        target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
    const backgroundPage = await backgroundPageTarget.page();
    backgroundPage.setDefaultTimeout(15000);
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('.permission-approval-container__content__requested', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('.request-signature__origin', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await page.waitForSelector('[data-action="header-open-profile"]', {visible: true});
}