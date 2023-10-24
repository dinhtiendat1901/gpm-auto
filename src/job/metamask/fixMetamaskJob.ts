import {currentBrowser} from "../../globalVariable";
import installMetamask from "../../installMetamask";
import {Job} from "bullmq";
import unlockMetamask from "../../unlockMetamask";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function fixMetamaskJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const firstPage = await currentBrowser.newPage();
        await installMetamask(firstPage);
        await currentBrowser.waitForTarget(
            target => target.url() === process.env.METAMASK_UNLOCK_URL || target.url() === process.env.METAMASK_HOME_URL);
        const metamaskPage = await currentBrowser.newPage();
        await metamaskPage.goto(process.env.METAMASK_UNLOCK_URL);
        await unlockMetamask(metamaskPage);
    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'fixMetamaskJob', e.message);
        console.log(`Job ${job.data.jobIndex} failed in fixMetamaskJob...`);
        console.log(`Error: ${e.message}`);
    }
}