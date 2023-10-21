import {currentBrowser} from "../../globalVariable";
import {EventEmitter} from "puppeteer";
import waitMetamaskNotiFirst from "../../waitMetamaskNotiFirst";
import waitMetamaskNotiSecond from "../../waitMetamaskNotiSecond";

export default async function addWalletSuperfulJob() {
    const proxyPage = await currentBrowser.newPage();
    await proxyPage.goto(process.env.SUPER_FUL_URL, {waitUntil: 'networkidle0'});
    const superFulPage = await currentBrowser.newPage();
    superFulPage.setDefaultTimeout(15000);
    await superFulPage.goto(process.env.SUPER_FUL_URL, {waitUntil: 'networkidle0'});
    const closeButton = await superFulPage.$('svg.h-6.w-6.text-gray-800');
    if (closeButton) {
        await closeButton.click();
        await new Promise(r => setTimeout(r, 500));
    }
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
    await superFulPage.waitForNavigation({waitUntil: 'networkidle0'});
}