import {BulkJobOptions, Worker} from 'bullmq';
import getListProfileIds from "./until/getListProfileIds";
import setupRedis from "./until/setupRedis";
import {deleteFirstRow, cutAndInsertRow, readData, writeArrayToColumn, clearSecondWorksheet} from "./until/excelUntil";
import signInAlphabotJob from "./job/signInAlphabotJob";
import stopProfile from "./until/stopProfile";
import {currentProfileId} from "./globalVariable";
import getUserInput from "./until/getUserInput";
import createMetamaskJob from "./job/createMetamaskJob";

interface JobIns {
    name: string,
    data: any,
    opts: BulkJobOptions
}

async function main() {
    const userInput = await getUserInput();

    const redisConfig = await setupRedis();

    new Worker(redisConfig.queueName, async (job) => {
        switch (userInput.runScript) {
            case 1:
                await createMetamaskJob(job);
                break;
            case 2:
                await signInAlphabotJob(job);
                break;
        }
    }, {
        connection: redisConfig.connection
    });
    let listProfileId;
    if (userInput.runType === 1) {
        listProfileId = await readData();
    } else {
        listProfileId = await getListProfileIds(userInput.runFrom, userInput.runTo);
        await writeArrayToColumn(listProfileId);
    }
    await clearSecondWorksheet();
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
        await cutAndInsertRow();
    });
    redisConfig.queueEvents.on('completed', async (event) => {
        console.log(`Job with ID ${event.jobId} has been completed.`);
        await deleteFirstRow();
    });
}


main().then();











