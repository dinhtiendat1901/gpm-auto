import {BulkJobOptions, Worker} from 'bullmq';
import getListProfileIds from "./until/getListProfileIds";
import stopProfile from "./until/stopProfile";
import {currentProfileId} from './globalVariable';
import createMetamaskJob from "./job/createMetamaskJob";
import setupRedis from "./until/setupRedis";

interface JobIns {
    name: string,
    data: any,
    opts: BulkJobOptions
}

async function main() {

    const redisConfig = await setupRedis();

    new Worker(redisConfig.queueName, async (job) => {
        await createMetamaskJob(job);
    }, {
        connection: redisConfig.connection
    });
    const listProfileId = getListProfileIds();
    let listJob: JobIns[] = [];

    listProfileId.forEach((profileId: string) => {
        listJob.push({
            name: `job-${profileId}`,
            data: {
                profileId: profileId
            },
            opts: {
                removeOnFail: true,
                removeOnComplete: true
            }
        })

    });
    await redisConfig.queue.addBulk(listJob);
    redisConfig.queueEvents.on('failed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been failed.`);
        stopProfile(currentProfileId);
    });
}


main().then();











