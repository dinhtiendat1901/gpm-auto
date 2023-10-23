import {deleteFirstRow} from "../excelUntil";
import stopProfile from "../handleProfile/stopProfile";
import {Worker} from "bullmq";

export default async function (worker: Worker) {
    worker.on('failed', async (job, error) => {
        console.log(`JOB ${job.data.jobIndex} FAILED: ${error.message.toUpperCase()}`);
        stopProfile(job.data.profileId);
    });
    worker.on('completed', async (job) => {
        await deleteFirstRow();
        console.log(`JOB ${job.data.jobIndex} COMPLETED.`);
        stopProfile(job.data.profileId);
    });
}