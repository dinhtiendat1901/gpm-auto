import {currentBrowser} from "../../globalVariable";
import installMetamask from "../../installMetamask";
import createMetamask from "../../createMetamask";
import {Job} from "bullmq";

export default async function createMetamaskJob(job: Job) {
    const firstPage = await currentBrowser.pages().then(allPages => allPages[0]);
    await installMetamask(firstPage);
    await currentBrowser.waitForTarget(
        target => target.url() === process.env.METAMASK_WELCOME_URL || target.url() === process.env.METAMASK_HOME_URL);
    const metamaskPage = await currentBrowser.newPage();
    await metamaskPage.goto(process.env.METAMASK_WELCOME_URL);
    await createMetamask(metamaskPage);
    job.data.needPasswordMetamask = false;
}