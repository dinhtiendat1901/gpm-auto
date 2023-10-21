import {cutAndInsertRow, deleteFirstRow} from "../excelUntil";
import stopProfile from "../handleProfile/stopProfile";
import {Worker} from "bullmq";

export default async function (worker: Worker) {
    worker.on('failed', async (job, error) => {
        console.log(job.data.profileId);
        console.log(error.message);
        await cutAndInsertRow();
        stopProfile(job.data.profileId);
    });
    worker.on('completed', async (job) => {
        await deleteFirstRow();
        stopProfile(job.data.profileId);
    });
}