import {currentBrowser} from "../../globalVariable";
import {Job} from "bullmq";
import handleMetamaskPopup from "../../handleMetamaskPopup";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function addWalletSubberJob(job: Job) {
    try {
        const subberPage = await currentBrowser.newPage();
        subberPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await subberPage.goto(process.env.SUBBER_URL, {waitUntil: 'networkidle0'});
        const closeWindowButton = await subberPage.$('.dim.css-1h4ru7b');
        if (closeWindowButton) {
            await subberPage.click('.dim.css-1h4ru7b');
            await new Promise(r => setTimeout(r, 500));
        }
        await subberPage.waitForSelector('.css-1m5tmdf', {visible: true});
        await subberPage.click('.css-1m5tmdf');
        await subberPage.waitForSelector('button.flex.items-center.css-1j35lj5', {visible: true});
        await subberPage.click('button.flex.items-center.css-1j35lj5');
        await subberPage.waitForSelector('[data-testid="rk-wallet-option-metaMask"]');
        await subberPage.click('[data-testid="rk-wallet-option-metaMask"]');


        await handleMetamaskPopup(job);
        await subberPage.waitForNavigation({waitUntil: 'networkidle0'});
    } catch (e) {
        await writeToSecondSheet(job.data.jobIndex, 'addWalletSubberJob');
    }

}