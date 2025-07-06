import {Job, Worker} from 'bullmq';

import redisConnection from "../config/redisConnection";
import SubmissionJob from '../Jobs/submissionJob';

export default function SubmissionBeforeEvaluationWorker(queuename: string): Worker {
	return new Worker(
		queuename,
		async (job: Job) => {
			if (job.name === 'submissionBeforeEvaluationJob') {
				const handler = new SubmissionJob(job.data);
				await handler.handle(job);
			}else {
				throw new Error(`Unknown job name: ${job.name}`);
			}
		},
		{
			connection: redisConnection,
		}
	);
}