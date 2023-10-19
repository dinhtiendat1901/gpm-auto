import {Job} from "bullmq";
import {changeCurrentBrowser, changeCurrentProfileId} from "../globalVariable";
import startProfile from "../until/startProfile";
import stopProfile from "../until/stopProfile";

export default async function (job: Job) {
    changeCurrentProfileId(job.data.profileId);
    const browser = await startProfile(job.data.profileId);
    changeCurrentBrowser(browser);
    const proxyPage = await browser.newPage();
    await proxyPage.goto(process.env.SUPER_FUL_SETTINGS_URL, {waitUntil: 'networkidle0'});
    const superFulSettingsPage = await browser.newPage();
    superFulSettingsPage.setDefaultTimeout(15000);
    await superFulSettingsPage.goto(process.env.SUPER_FUL_SETTINGS_URL, {waitUntil: 'networkidle0'});
    await superFulSettingsPage.waitForSelector('.px-4.w-52.bg-sky-400');
    await superFulSettingsPage.click('.px-4.w-52.bg-sky-400');

    await superFulSettingsPage.waitForNavigation({waitUntil: 'networkidle0'});
    await superFulSettingsPage.waitForSelector('[data-testid="OAuth_Consent_Button"]');
    await superFulSettingsPage.click('[data-testid="OAuth_Consent_Button"]');

    await superFulSettingsPage.waitForNavigation({waitUntil: 'networkidle0'});
    await superFulSettingsPage.waitForSelector('.px-4.w-52.bg-indigo-600');
    await superFulSettingsPage.click('.px-4.w-52.bg-indigo-600');

    await superFulSettingsPage.waitForNavigation({waitUntil: 'networkidle0'});
    await superFulSettingsPage.waitForSelector('.button-ejjZWC.lookFilled-1H2Jvj');
    await superFulSettingsPage.click('.button-ejjZWC.lookFilled-1H2Jvj');
    await superFulSettingsPage.waitForNavigation({waitUntil: 'networkidle0'});
    stopProfile(job.data.profileId);
}