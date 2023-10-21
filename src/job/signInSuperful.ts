import {currentBrowser} from "../globalVariable";
import {EventEmitter} from "puppeteer";
import waitMetamaskNotiFirst from "../waitMetamaskNotiFirst";
import waitMetamaskNotiSecond from "../waitMetamaskNotiSecond";

export default async function () {
    const proxyPage = await currentBrowser.newPage();
    await proxyPage.goto(process.env.SUPER_FUL_URL, {waitUntil: 'domcontentloaded'});
    const superFulPage = await currentBrowser.newPage();
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
}