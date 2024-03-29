import {Job} from "bullmq";
import {currentBrowser} from "../../globalVariable";
import handleMetamaskPopup from "../../handleMetamaskPopup";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function addWalletAlphabotJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const alphaBotPage = await currentBrowser.newPage();
        alphaBotPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await alphaBotPage.goto(process.env.ALPHA_BOT_URL);
        await alphaBotPage.waitForSelector('[data-action="header-sign-in"]');
        await alphaBotPage.click('[data-action="header-sign-in"]');
        await alphaBotPage.waitForSelector('.css-1c7g2xp');
        await alphaBotPage.click('.css-1c7g2xp');
        await handleMetamaskPopup(job, null, null);
        await alphaBotPage.waitForSelector('[data-action="header-open-profile"]', {visible: true});
    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'addWalletAlphabotJob', e.message);
        console.log(`Job ${job.data.jobIndex} failed in addWalletAlphabotJob...`);
        console.log(`Error: ${e.message}`);
    }
}