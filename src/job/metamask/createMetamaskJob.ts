import {currentBrowser} from "../../globalVariable";
import installMetamask from "../../installMetamask";
import createMetamask from "../../createMetamask";
import {Job} from "bullmq";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function createMetamaskJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const firstPage = await currentBrowser.pages().then(allPages => allPages[0]);
        await installMetamask(firstPage);
        await currentBrowser.waitForTarget(
            target => target.url() === process.env.METAMASK_WELCOME_URL || target.url() === process.env.METAMASK_HOME_URL);
        const metamaskPage = await currentBrowser.newPage();
        await metamaskPage.goto(process.env.METAMASK_WELCOME_URL);
        await createMetamask(metamaskPage);
        job.data.needPasswordMetamask = false;
    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'createMetamaskJob');
        console.log(`Job ${job.data.jobIndex} failed in createMetamaskJob...`);
        console.log(`Error: ${e.message}`);
    }
}