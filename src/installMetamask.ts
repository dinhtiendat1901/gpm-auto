import * as robot from "robotjs";
import {Browser, Page} from "puppeteer";

export default async function (page: Page, browser: Browser) {
    page.setDefaultTimeout(15000);
    await page.goto('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB');
    await page.evaluate(() => {
        document.documentElement.requestFullscreen();
    });
    await page.waitForSelector('[aria-label="Add to Chrome"]');

    await page.click('[aria-label="Add to Chrome"]');

    while ((await browser.pages()).length < 2) {
        await new Promise(r => setTimeout(r, 1000));
        robot.moveMouse(1300, 200);
        robot.mouseClick();
    }
}