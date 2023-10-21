import {currentBrowser} from "../../globalVariable";

export default async function addSocialSuperfulJob() {
    const proxyPage = await currentBrowser.newPage();
    await proxyPage.goto(process.env.SUPER_FUL_SETTINGS_URL, {waitUntil: 'networkidle0'});
    const superFulSettingsPage = await currentBrowser.newPage();
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
}