import * as robot from "robotjs";
import {Page} from "puppeteer";

export default async function (page: Page) {
    await page.goto('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB');
    await page.evaluate(() => {
        document.documentElement.requestFullscreen();
    });
    await page.waitForSelector('[aria-label="Add to Chrome"]');
    await page.click('[aria-label="Add to Chrome"]');


    robot.moveMouse(100, 100);
    robot.mouseClick();
    await new Promise(r => setTimeout(r, 2000));
    robot.keyTap('left');
    robot.keyTap('enter');
}