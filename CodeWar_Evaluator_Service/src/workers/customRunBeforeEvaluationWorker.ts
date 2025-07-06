import {Job, Worker} from 'bullmq';

import redisConnection from '../config/redisConnection';
import CustomRunJob from '../Jobs/customRunJob';

export default function createCustomRunBeforeEvaluationWorker(queuename: string): Worker {
	return new Worker(
		queuename,
		async (job: Job) => {
			if(job.name === 'customRunBeforeEvaluationJob') {
				const handler = new CustomRunJob(job.data);
				await handler.handle(job);
			}else{
				throw new Error(`Unknown job name: ${job.name}`);
			}
		},
		{
			connection: redisConnection,
		}
	);

}