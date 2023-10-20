import {Worker} from 'bullmq';
import setupRedis from "./until/setupRedis";
import {changeCurrentBrowser} from "./globalVariable";
import getUserInput from "./until/getUserInput";
import addJobToQueue from "./until/addJobToQueue";
import startProfile from "./until/startProfile";
import addEventWorker from "./until/addEventWorker";


async function main() {
    const userInput = await getUserInput();
    const redisConfig = await setupRedis();
    const worker = new Worker(redisConfig.queueName, async (job) => {
        const browser = await startProfile(job.data.profileId);
        changeCurrentBrowser(browser);
        for (const func of userInput.runScripts) {
            await func();
        }
    }, {
        connection: redisConfig.connection
    });
    await addJobToQueue(userInput, redisConfig.queue);
    await addEventWorker(worker);
}


main().then();











