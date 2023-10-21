import {userInput} from "./getUserInput";
import {BulkJobOptions, Queue} from "bullmq";
import {clearSecondWorksheet, readData, writeArrayToColumn} from "../excelUntil";
import getListProfileIds from "../handleProfile/getListProfileIds";

interface JobIns {
    name: string,
    data: any,
    opts: BulkJobOptions
}

export default async function (userInput: userInput, queue: Queue) {
    let listProfileId;
    if (userInput.runType === 1) {
        listProfileId = await readData();
    } else {
        listProfileId = await getListProfileIds(userInput.runFrom, userInput.runTo);
        await writeArrayToColumn(listProfileId);
    }
    await clearSecondWorksheet();
    let listJob: JobIns[] = [];

    listProfileId.forEach((profileId: string, index) => {
        listJob.push({
            name: `job-${profileId}`,
            data: {
                profileId: profileId,
                needPasswordMetamask: true,
                jobIndex: index + userInput.runFrom
            },
            opts: {
                removeOnFail: true,
                removeOnComplete: true
            }
        })

    });
    await queue.addBulk(listJob);
}