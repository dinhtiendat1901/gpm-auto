import startProfile from "../until/startProfile";
import {Job} from "bullmq";
import {changeCurrentBrowser, changeCurrentProfileId} from "../globalVariable";
import stopProfile from "../until/stopProfile";
import {EventEmitter} from "puppeteer";
import waitMetamaskNotiFirst from "../waitMetamaskNotiFirst";
import waitMetamaskNotiSecond from "../waitMetamaskNotiSecond";

export default async function (job: Job) {
    changeCurrentProfileId(job.data.profileId);
    const browser = await startProfile(job.data.profileId);
    changeCurrentBrowser(browser);
    const proxyPage = await browser.newPage();
    await proxyPage.goto(process.env.SUPER_FUL_URL, {waitUntil: 'domcontentloaded'});
    const superFulPage = await browser.newPage();
    superFulPage.setDefaultTimeout(15000);
    await superFulPage.goto(process.env.SUPER_FUL_URL, {waitUntil: 'domcontentloaded'});
    await superFulPage.waitForSelector('.px-8.w-56');
    await superFulPage.click('.px-8.w-56');
    await superFulPage.waitForSelector('[data-testid="rk-wallet-option-metaMask"]');
    await superFulPage.click('[data-testid="rk-wallet-option-metaMask"]');

    const eventEmitter = new EventEmitter();
    eventEmitter.once('metamaskClosed', async () => {
        await superFulPage.waitForSelector('.px-8.undefined');
        await superFulPage.click('.px-8.undefined');
    });

    await waitMetamaskNotiFirst(eventEmitter);
    await waitMetamaskNotiSecond();
    await superFulPage.waitForNavigation({waitUntil: 'domcontentloaded'});
    stopProfile(job.data.profileId);
}