import startProfile from "../until/startProfile";
import {Job} from "bullmq";
import {changeCurrentProfileId} from "../globalVariable";
import stopProfile from "../until/stopProfile";

export default async function addWalletAlphabotJob(job: Job) {
    changeCurrentProfileId(job.data.profileId);
    const browser = await startProfile(job.data.profileId);
    const alphaBotPage = await browser.newPage();
    alphaBotPage.setDefaultTimeout(15000);
    await alphaBotPage.goto(process.env.ALPHA_BOT_URL);
    await alphaBotPage.waitForSelector('[data-action="header-sign-in"]');
    await alphaBotPage.click('[data-action="header-sign-in"]');
    await alphaBotPage.waitForSelector('.css-1c7g2xp');
    await alphaBotPage.click('.css-1c7g2xp');
    const backgroundPageTarget = await browser.waitForTarget(
        target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
    const backgroundPage = await backgroundPageTarget.page();
    backgroundPage.setDefaultTimeout(15000);
    await backgroundPage.waitForSelector('#password', {visible: true});
    await backgroundPage.type('#password', process.env.METAMASK_PASSWORD);
    await backgroundPage.click('[data-testid="unlock-submit"]');

    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('.permission-approval-container__content__requested', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');


    const backgroundPageTarget1 = await browser.waitForTarget(
        target => target.url().includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/notification.html#confirm-transaction/') || target.url() === process.env.METAMASK_NOTIFICATION_URL);

    const lastPage = await backgroundPageTarget1.page();
    await lastPage.waitForSelector('.request-signature__origin', {visible: true});
    await lastPage.click('[data-testid="page-container-footer-next"]');
    await alphaBotPage.waitForSelector('[data-action="header-open-profile"]', {visible: true});
    stopProfile(job.data.profileId);
}