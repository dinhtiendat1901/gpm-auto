import {Job} from "bullmq";
import {currentBrowser} from "../../globalVariable";
import handleMetamaskPopup from "../../handleMetamaskPopup";

export default async function addWalletAlphabotJob(job: Job) {
    const alphaBotPage = await currentBrowser.newPage();
    alphaBotPage.setDefaultTimeout(15000);
    await alphaBotPage.goto(process.env.ALPHA_BOT_URL);
    await alphaBotPage.waitForSelector('[data-action="header-sign-in"]');
    await alphaBotPage.click('[data-action="header-sign-in"]');
    await alphaBotPage.waitForSelector('.css-1c7g2xp');
    await alphaBotPage.click('.css-1c7g2xp');
    await handleMetamaskPopup(job);
    await alphaBotPage.waitForSelector('[data-action="header-open-profile"]', {visible: true});
}