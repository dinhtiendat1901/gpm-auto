import * as robot from "robotjs";
import {Page} from "puppeteer";
import {currentBrowser} from "./globalVariable";
import dotenv from "dotenv";

dotenv.config();

export default async function (page: Page) {
    page.setDefaultTimeout(15000);
    await page.goto(process.env.WEB_STORE_METAMASK_URL);
    await page.evaluate(() => {
        document.documentElement.requestFullscreen();
    });
    await page.waitForSelector('[aria-label="Add to Chrome"]');

    await page.click('[aria-label="Add to Chrome"]');

    while ((await currentBrowser.pages()).length < 2) {
        await new Promise(r => setTimeout(r, 1000));
        robot.moveMouse(parseInt(process.env.COORDINATES_X), parseInt(process.env.COORDINATES_Y));
        robot.mouseClick();
    }
}