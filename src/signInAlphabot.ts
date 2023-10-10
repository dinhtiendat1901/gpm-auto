import {Page} from "puppeteer";
import {currentBrowser} from "./globalVariable";

export default async function (page: Page) {
    page.setDefaultTimeout(15000);
    await page.goto('https://www.alphabot.app/');
    await page.waitForSelector('[data-action="header-sign-in"]');
    await page.click('[data-action="header-sign-in"]');
    await page.waitForSelector('.css-1c7g2xp');
    await page.click('.css-1c7g2xp');
    const backgroundPageTarget = await currentBrowser.waitForTarget(
        target => target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/notification.html');
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