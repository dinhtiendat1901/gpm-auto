import {Worker, Queue, QueueEvents} from 'bullmq';
import IORedis from 'ioredis';
import getListProfileIds from "./until/getListProfileIds";
import stopProfile from "./until/stopProfile";
import {currentProfileId, changeCurrentProfileId} from './globalVariable';
import createMetamaskJob from "./job/createMetamaskJob";
import setupRedis from "./until/setupRedis";


async function main() {

    const redisConfig = await setupRedis();

    new Worker(redisConfig.queueName, async () => {
        await createMetamaskJob();
    }, {
        connection: redisConfig.connection
    });
    const listProfileId = getListProfileIds();
    let currentIndex = 0;

    async function addNextJob() {
        if (currentIndex < listProfileId.length) {
            changeCurrentProfileId(listProfileId[currentIndex]);
            await redisConfig.queue.add(`job-${currentProfileId}`, null, {
                removeOnComplete: true,
                removeOnFail: true
            });
            currentIndex++;
        }
    }

    addNextJob().then();
    redisConfig.queueEvents.on('completed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been completed.`);
        await addNextJob();
    });
    redisConfig.queueEvents.on('failed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been failed.`);
        stopProfile(currentProfileId);
        await addNextJob();
    });
}


main().then();











