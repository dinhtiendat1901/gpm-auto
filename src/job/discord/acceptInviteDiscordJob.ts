import {currentBrowser} from "../../globalVariable";
import {writeToSecondSheet} from "../../until/excelUntil";
import {Job} from "bullmq";

export default async function acceptInviteDiscordJob(job: Job) {
    try {
        if (job.data.jobTimeout) throw new Error('Job timeout');
        const inviteDiscordPage = await currentBrowser.newPage();
        inviteDiscordPage.setDefaultTimeout(parseInt(process.env.TIME_OUT));
        await inviteDiscordPage.goto(process.env.DISCORD_INVITE_URL, {waitUntil: 'networkidle0'});
        await inviteDiscordPage.waitForSelector('.contents_fb6220', {visible: true});
        await inviteDiscordPage.click('.contents_fb6220');
        await inviteDiscordPage.waitForNavigation({waitUntil: 'networkidle0'});
        await new Promise(r => setTimeout(r, 3000));
    } catch (e: any) {
        await writeToSecondSheet(job.data.jobIndex, 'acceptInviteDiscordJob', e.message);
        console.log(`Job ${job.data.jobIndex} failed in acceptInviteDiscordJob...`);
        console.log(`Error: ${e.message}`);

    }
}