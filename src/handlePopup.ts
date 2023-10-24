import {currentBrowser} from "./globalVariable";

export default async function (link: string) {
    const backgroundPageTarget = await currentBrowser.waitForTarget(
        target => target.url().includes(link) || target.url() === process.env.METAMASK_NOTIFICATION_URL);
    const backgroundPage = await backgroundPageTarget.page();
    backgroundPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
}