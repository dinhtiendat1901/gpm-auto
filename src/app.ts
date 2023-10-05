import {Worker, Queue, QueueEvents} from 'bullmq';
import IORedis from 'ioredis';
import createMetamask from "./createMetamask";
import signInAlphabot from "./signInAlphabot";
import startProfile from "./startProfile";
import installMetamask from "./installMetamask";
import getListProfileIds from "./getListProfileIds";
import stopProfile from "./stopProfile";


async function main() {
    const connection = new IORedis();
    const queue = new Queue('idsQueue', {
        connection,
    });
    const queueEvents = new QueueEvents('idsQueue', {
        connection,
    });
    new Worker('idsQueue', async (job) => {
        const browser = await startProfile(job.data.profileId);
        const firstPage = await browser.pages().then(allPages => allPages[0]);
        await installMetamask(firstPage);
        await browser.waitForTarget(
            target => target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/welcome' || target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html', {
                timeout: 600000
            }
        );
        const metamaskPage = await browser.newPage();
        await metamaskPage.goto('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/welcome');
        await createMetamask(metamaskPage);
        // }
        const alphaBotPage = await browser.newPage();
        await signInAlphabot(alphaBotPage, browser);
        stopProfile(job.data.profileId);
    }, {
        connection,
    });
    const listProfileId = await getListProfileIds();
    let currentIndex = 0;

    async function addNextJob() {
        if (currentIndex < listProfileId.length) {
            const profileId = listProfileId[currentIndex];
            await queue.add(`job-${profileId}`, {profileId});
            currentIndex++;
        }
    }

    addNextJob().then();
    queueEvents.on('completed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been completed.`);
        await addNextJob();
    });
}


main().then();











