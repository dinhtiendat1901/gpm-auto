import {Worker} from 'bullmq';
import setupRedis from "./until/commonConfig/setupRedis";
import {changeCurrentBrowser} from "./globalVariable";
import getUserInput from "./until/commonConfig/getUserInput";
import addJobToQueue from "./until/commonConfig/addJobToQueue";
import startProfile from "./until/handleProfile/startProfile";
import addEventWorker from "./until/commonConfig/addEventWorker";


async function main() {
    const userInput = await getUserInput();
    const redisConfig = await setupRedis();
    const worker = new Worker(redisConfig.queueName, async (job) => {
        const browser = await startProfile(job.data.profileId);
        changeCurrentBrowser(browser);
        for (const func of userInput.runScripts) {
            await func(job);
        }
    }, {
        connection: redisConfig.connection
    });
    await addJobToQueue(userInput, redisConfig.queue);
    await addEventWorker(worker);
}


main().then();











