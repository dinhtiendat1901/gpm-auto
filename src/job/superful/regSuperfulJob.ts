import {Job} from "bullmq";
import {currentBrowser} from "../../globalVariable";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function regSuperfulJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const proxyPage = await currentBrowser.newPage();
        proxyPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await proxyPage.goto(process.env.SUPER_FUL_REG_URL, {waitUntil: 'networkidle0'});
        const regPage = await currentBrowser.newPage();
        regPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await regPage.goto(process.env.SUPER_FUL_REG_URL, {waitUntil: 'networkidle0'});
        await regPage.waitForSelector('.px-8.capitalize.inline-flex.items-center.py-3.justify-center.border.border-transparent.text-base.font-medium.rounded-xl.shadow-sm.bg-teal-400.transition.hidden', {visible: true});
        await regPage.click('.px-8.capitalize.inline-flex.items-center.py-3.justify-center.border.border-transparent.text-base.font-medium.rounded-xl.shadow-sm.bg-teal-400.transition.hidden');
        await regPage.waitForNavigation({waitUntil: 'networkidle0'});

    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'regSuperfulJob', e.message);
        console.log(`Job ${job.data.jobIndex} failed in regSuperfulJob...`);
        console.log(`Error: ${e.message}`);

    }
}