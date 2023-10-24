import {currentBrowser} from "../../globalVariable";
import {Job} from "bullmq";
import {writeToSecondSheet} from "../../until/excelUntil";
import handleMetamaskPopup from "../../handleMetamaskPopup";

export default async function addWalletSuperfulJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const proxyPage = await currentBrowser.newPage();
        await proxyPage.goto(process.env.SUPER_FUL_URL, {waitUntil: 'networkidle0'});
        const superFulPage = await currentBrowser.newPage();
        superFulPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
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
        await handleMetamaskPopup(job, '.px-8.undefined', superFulPage);
        await superFulPage.waitForNavigation({waitUntil: 'networkidle0'});
    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'addWalletSuperfulJob', e.message);
        console.log(`Job ${job.data.jobIndex} failed in addWalletSuperfulJob...`);
        console.log(`Error: ${e.message}`);
    }

}