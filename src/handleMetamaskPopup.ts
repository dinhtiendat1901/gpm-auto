import {currentBrowser} from "./globalVariable";
import {Job} from "bullmq";
import handlePopup from "./handlePopup";
import {Page} from "puppeteer";

export default async function (job: Job, buttonSelector: string, page: Page) {

    if (job.data.needPasswordMetamask) {
        const backgroundPageTarget = await currentBrowser.waitForTarget(
            target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
        const backgroundPage = await backgroundPageTarget.page();
        backgroundPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await backgroundPage.waitForSelector('#password', {visible: true});
        await backgroundPage.type('#password', process.env.METAMASK_PASSWORD);
        await backgroundPage.click('[data-testid="unlock-submit"]');
        job.data.needPasswordMetamask = false;
    }
    await handlePopup(process.env.METAMASK_CONNECT_URL);
    await handlePopup(process.env.METAMASK_CONNECT_URL);
    if (buttonSelector) {
        await new Promise(r => setTimeout(r, 2000));
        await page.waitForSelector(buttonSelector);
        await page.click(buttonSelector);
    }
    await handlePopup(process.env.METAMASK_TRANSACTION_URL);
}