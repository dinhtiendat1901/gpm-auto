import {Worker, Queue, QueueEvents} from 'bullmq';
import IORedis from 'ioredis';
import createMetamask from "./createMetamask";
import signInAlphabot from "./signInAlphabot";
import startProfile from "./startProfile";
import installMetamask from "./installMetamask";
import getListProfileIds from "./getListProfileIds";
import stopProfile from "./stopProfile";
import {currentProfileId, changeCurrentProfileId} from './globalVariable';


async function main() {
    const connection = new IORedis();
    const queue = new Queue('idsQueue', {
        connection,
    });
    await queue.clean(0, 1000, 'completed');
    await queue.clean(0, 1000, 'delayed');
    await queue.clean(0, 1000, 'paused');
    await queue.clean(0, 1000, 'active');
    await queue.clean(0, 1000, 'failed');
    await queue.clean(0, 1000, 'prioritized');
    await queue.clean(0, 1000, 'wait');
    const queueEvents = new QueueEvents('idsQueue', {
        connection,
    });
    new Worker('idsQueue', async () => {
        const browser = await startProfile(currentProfileId);
        const firstPage = await browser.pages().then(allPages => allPages[0]);
        await installMetamask(firstPage, browser);
        await browser.waitForTarget(
            target => target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/welcome' || target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html', {
                timeout: 600000
            }
        );
        const metamaskPage = await browser.newPage();
        await metamaskPage.goto('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/welcome');
        await createMetamask(metamaskPage);
        const alphaBotPage = await browser.newPage();
        await signInAlphabot(alphaBotPage, browser);
        stopProfile(currentProfileId);
    }, {
        connection,
    });
    const listProfileId = getListProfileIds();
    let currentIndex = 0;

    async function addNextJob() {
        if (currentIndex < listProfileId.length) {
            changeCurrentProfileId(listProfileId[currentIndex]);
            await queue.add(`job-${currentProfileId}`, null, {
                removeOnComplete: true,
                removeOnFail: true
            });
            currentIndex++;
        }
    }

    addNextJob().then();
    queueEvents.on('completed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been completed.`);
        await addNextJob();
    });
    queueEvents.on('failed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been failed.`);
        stopProfile(currentProfileId);
        await addNextJob();
    });
}


main().then();











