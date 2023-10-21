import {currentBrowser} from "./globalVariable";
import {EventEmitter} from "puppeteer";
import {Job} from "bullmq";

export default async function (eventemitter: EventEmitter<any>, job: Job) {
    const backgroundPageTarget = await currentBrowser.waitForTarget(
        target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
    const backgroundPage = await backgroundPageTarget.page();
    backgroundPage.setDefaultTimeout(15000);
    if (job.data.needPasswordMetamask) {
        await backgroundPage.waitForSelector('#password', {visible: true});
        await backgroundPage.type('#password', process.env.METAMASK_PASSWORD);
        await backgroundPage.click('[data-testid="unlock-submit"]');
        job.data.needPasswordMetamask = false;
    }
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('.permission-approval-container__content__requested', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    backgroundPage.once('close', async () => {
        eventemitter.emit('metamaskClosed', '*');
    })
}