import {currentBrowser} from "../../globalVariable";
import {Job} from "bullmq";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function vendettaJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const vendettaDiscordPage = await currentBrowser.newPage();
        vendettaDiscordPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await vendettaDiscordPage.goto(process.env.SUPER_FUL_VENDETTA_DISCORD_URL, {waitUntil: 'networkidle0'});
        await vendettaDiscordPage.waitForSelector('.marginTop40-Q4o1tS.button-1cRKG6.button-ejjZWC.lookFilled-1H2Jvj.colorBrand-2M3O3N.sizeLarge-2xP3-w.fullWidth-3M-YBR.grow-2T4nbg', {visible: true});
        await vendettaDiscordPage.click('.marginTop40-Q4o1tS.button-1cRKG6.button-ejjZWC.lookFilled-1H2Jvj.colorBrand-2M3O3N.sizeLarge-2xP3-w.fullWidth-3M-YBR.grow-2T4nbg');
        await vendettaDiscordPage.waitForNavigation({waitUntil: 'networkidle0'});
        await new Promise(r => setTimeout(r, 5000));

        const vendettaPage = await currentBrowser.newPage();
        vendettaPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await vendettaPage.goto(process.env.SUPER_FUL_VENDETTA_URL, {waitUntil: 'networkidle0'});
        await vendettaPage.waitForSelector('.px-8.capitalize.inline-flex.items-center.py-3.justify-center.border.border-transparent.text-base.font-medium.rounded-xl.shadow-sm.bg-teal-400.transition.hidden', {visible: true});
        await vendettaPage.click('.px-8.capitalize.inline-flex.items-center.py-3.justify-center.border.border-transparent.text-base.font-medium.rounded-xl.shadow-sm.bg-teal-400.transition.hidden');
        await vendettaPage.waitForNavigation({waitUntil: 'networkidle0'});

    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'vendettaJob', e.message);
        console.log(`Job ${job.data.jobIndex} failed in vendettaJob...`);
        console.log(`Error: ${e.message}`);

    }
}