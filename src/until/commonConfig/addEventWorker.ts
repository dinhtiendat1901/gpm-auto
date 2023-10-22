import {deleteFirstRow} from "../excelUntil";
import stopProfile from "../handleProfile/stopProfile";
import {Worker} from "bullmq";

export default async function (worker: Worker) {
    worker.on('failed', async (job) => {
        console.log(`job ${job.data.jobIndex} failed.`);
        stopProfile(job.data.profileId);
    });
    worker.on('completed', async (job) => {
        await deleteFirstRow();
        console.log(`job ${job.data.jobIndex} completed.`);
        stopProfile(job.data.profileId);
    });
}