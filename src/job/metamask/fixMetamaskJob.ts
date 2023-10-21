import startProfile from "../../until/handleProfile/startProfile";
import {changeCurrentBrowser, currentProfileId} from "../../globalVariable";
import installMetamask from "../../installMetamask";
import stopProfile from "../../until/handleProfile/stopProfile";
import {Job} from "bullmq";
import {changeCurrentProfileId} from "../../globalVariable";
import unlockMetamask from "../../unlockMetamask";

export default async function fixMetamaskJob(job: Job) {
    changeCurrentProfileId(job.data.profileId);
    const browser = await startProfile(currentProfileId);
    changeCurrentBrowser(browser);
    const firstPage = await browser.newPage();
    await installMetamask(firstPage);
    await browser.waitForTarget(
        target => target.url() === process.env.METAMASK_UNLOCK_URL || target.url() === process.env.METAMASK_HOME_URL);
    const metamaskPage = await browser.newPage();
    await metamaskPage.goto(process.env.METAMASK_UNLOCK_URL);
    await unlockMetamask(metamaskPage);
    stopProfile(currentProfileId);
}