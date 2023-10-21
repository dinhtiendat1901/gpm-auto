import {currentBrowser} from "../../globalVariable";
import {Job} from "bullmq";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function addWalletSuperfulJob(job: Job) {
    try {
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

        const firstMetamaskPoupTarget = await currentBrowser.waitForTarget(
            target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
        const firstMetamaskPoupPage = await firstMetamaskPoupTarget.page();
        firstMetamaskPoupPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        if (job.data.needPasswordMetamask) {
            await firstMetamaskPoupPage.waitForSelector('#password', {visible: true});
            await firstMetamaskPoupPage.type('#password', process.env.METAMASK_PASSWORD);
            await firstMetamaskPoupPage.click('[data-testid="unlock-submit"]');
            job.data.needPasswordMetamask = false;
        }
        await firstMetamaskPoupPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
        await firstMetamaskPoupPage.click('[data-testid="page-container-footer-next"]');
        await firstMetamaskPoupPage.waitForSelector('.permission-approval-container__content__requested', {visible: true});
        await firstMetamaskPoupPage.click('[data-testid="page-container-footer-next"]');

        await new Promise(r => setTimeout(r, 2000));
        await superFulPage.waitForSelector('.px-8.undefined');
        await superFulPage.click('.px-8.undefined');

        const secondMetamaskPoupTarget = await currentBrowser.waitForTarget(
            target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
        const secondMetamaskPoupPage = await secondMetamaskPoupTarget.page();
        secondMetamaskPoupPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await secondMetamaskPoupPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
        await secondMetamaskPoupPage.click('[data-testid="page-container-footer-next"]');


        await superFulPage.waitForNavigation({waitUntil: 'networkidle0'});
    } catch (e:any) {
        await writeToSecondSheet(job.data.jobIndex, 'addWalletSuperfulJob');
        console.log(e.message);
    }

}