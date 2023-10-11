import startProfile from "../until/startProfile";
import {changeCurrentBrowser, currentProfileId} from "../globalVariable";
import installMetamask from "../installMetamask";
import createMetamask from "../createMetamask";
import signInAlphabot from "../signInAlphabot";
import stopProfile from "../until/stopProfile";
import {Job} from "bullmq";
import {changeCurrentProfileId} from "../globalVariable";

export default async function (job: Job) {
    changeCurrentProfileId(job.data.profileId);
    const browser = await startProfile(currentProfileId);
    changeCurrentBrowser(browser);
    const firstPage = await browser.pages().then(allPages => allPages[0]);
    await installMetamask(firstPage);
    await browser.waitForTarget(
        target => target.url() === process.env.METAMASK_WELCOME_URL || target.url() === process.env.METAMASK_HOME_URL);
    const metamaskPage = await browser.newPage();
    await metamaskPage.goto(process.env.METAMASK_WELCOME_URL);
    await createMetamask(metamaskPage);
    const alphaBotPage = await browser.newPage();
    await signInAlphabot(alphaBotPage);
    stopProfile(currentProfileId);
}