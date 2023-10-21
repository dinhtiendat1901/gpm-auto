import {currentBrowser} from "../../globalVariable";
import {Job} from "bullmq";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function addSocialSuperfulJob(job: Job) {
    try {
        const proxyPage = await currentBrowser.newPage();
        await proxyPage.goto(process.env.SUPER_FUL_SETTINGS_URL, {waitUntil: 'networkidle0'});
        const superFulSettingsPage = await currentBrowser.newPage();
        superFulSettingsPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await superFulSettingsPage.goto(process.env.SUPER_FUL_SETTINGS_URL, {waitUntil: 'networkidle0'});
        const laterButton = await superFulSettingsPage.$('p.font-bold.text-sm.line-clamp-1.text-teal-400.transition.cursor-pointer');
        if (laterButton) {
            await laterButton.click();
            await new Promise(r => setTimeout(r, 500));
        }
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
    } catch (e:any) {
        await writeToSecondSheet(job.data.jobIndex, 'addSocialSuperfulJob');
        console.log(e.message);
    }
}