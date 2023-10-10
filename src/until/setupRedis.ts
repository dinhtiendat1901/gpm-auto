import IORedis from "ioredis";
import {Queue, QueueEvents} from "bullmq";


interface RedisConfig {
    queueName: string,
    connection: IORedis,
    queue: Queue,
    queueEvents: QueueEvents
}

export default async function (): Promise<RedisConfig> {
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
    return {
        queueName: 'idsQueue',
        queue: queue,
        connection: connection,
        queueEvents: queueEvents
    }
}