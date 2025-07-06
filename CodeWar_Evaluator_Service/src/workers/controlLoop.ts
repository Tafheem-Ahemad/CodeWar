import { Job } from "bullmq";
import SubmissionBeforeEvaluationWorker from "./submissionBeforeEvaluationWorker";
import createCustomRunBeforeEvaluationWorker from "./customRunBeforeEvaluationWorker";
import customRunBeforeEvaluationQueue from "../queues/customRunBeforeEvaluationQueue";
import submissionBeforeEvaluationQueue from "../queues/submissionBeforeEvaluationQueue";

async function processWorkers(job: Job | null) {
	if (!job) return;

	try {
		console.log(`Processing job ${job.id} from ${job.queueName}`);

		if (job.name === "submissionBeforeEvaluationJob") {
			SubmissionBeforeEvaluationWorker("submissionBeforeEvaluationQueue");
		}else if (job.name === "customRunBeforeEvaluationJob") {
			createCustomRunBeforeEvaluationWorker("customRunBeforeEvaluationQueue");
		}else{
			throw new Error(`Unknown job name: ${job.name}`);
		}

		await job.remove();
	} catch (error) {
		console.error(`Error processing job ${job.id}:`, error);
	}
}

export async function workerLoop() {

    try{
		console.log("Custom worker loop started...");
		while (true) {
			//Process up to 3 jobs from high-priority queue
			const highPriorityJobs = await customRunBeforeEvaluationQueue.getJobs(["waiting"],0,2);

			if (highPriorityJobs.length > 0) {
				console.log(`Found ${highPriorityJobs.length} jobs in HIGH priority queue`);
				for (const job of highPriorityJobs) {
					await processWorkers(job);
				}
			}

			// Process 1 job from low-priority queue
			const lowPriorityJobs = await submissionBeforeEvaluationQueue.getJobs(["waiting"],0,0);

			if (lowPriorityJobs.length > 0) {
				console.log(`Found 1 job in LOW priority queue`);
				await processWorkers(lowPriorityJobs[0]);
			}

			const [highCounts, lowCounts] = await Promise.all([
				customRunBeforeEvaluationQueue.getJobCounts(),
				submissionBeforeEvaluationQueue.getJobCounts(),
			]);

			const highIdle = highCounts.waiting === 0 && highCounts.active === 0;
			const lowIdle = lowCounts.waiting === 0 && lowCounts.active === 0;

			if (highIdle && lowIdle) {
				await sleep(500);
			}
		}
	}catch(error){
		console.error("💥 Worker loop crashed:", error);
    	throw error;
	}
  
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
