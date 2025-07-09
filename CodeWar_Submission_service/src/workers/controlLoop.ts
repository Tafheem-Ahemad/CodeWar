import {Job} from "bullmq";
import SubmissionAfterEvaluationWorker from "./submissionAfterEvaluationWorker";
import CustomRunAfterEvaluationWorker from "./customRunAfterEvaluationWorker";
import submissionAfterEvaluationQueue from "../queues/submissionAfterEvaluationQueue";
import customRunAfterEvaluationQueue from "../queues/customRunAfterEvaluationQueue";

async function processWorkers(job: Job | null) {
	if (!job) return;

	try {
		console.log(`Processing job ${job.id} from ${job.queueName}`);

		if (job.name === "submissionAfterEvaluationJob") {
			SubmissionAfterEvaluationWorker("submissionAfterEvaluationQueue");
		} else if (job.name === "customRunAfterEvaluationJob") {
			CustomRunAfterEvaluationWorker("customRunAfterEvaluationQueue");
		} else {
			throw new Error(`Unknown job name: ${job.name}`);
		}

		await job.remove();
	} catch (error) {
		console.error(`Error processing job ${job.id}:`, error);
	}
}

export async function workerLoop() {
	try {
		console.log("Custom worker loop started...");
		while (true) {
			// Process up to 3 jobs from high-priority queue
			const highPriorityJobs = await customRunAfterEvaluationQueue.getJobs(["waiting"], 0, 2);

			if (highPriorityJobs.length > 0) {
				console.log(`Found ${highPriorityJobs.length} jobs in HIGH priority queue`);
				for (const job of highPriorityJobs) {
					await processWorkers(job);
				}
			}

			// Process 1 job from low-priority queue
			const lowPriorityJobs = await submissionAfterEvaluationQueue.getJobs(["waiting"], 0, 0);

			if (lowPriorityJobs.length > 0) {
				console.log(`Found 1 job in LOW priority queue`);
				await processWorkers(lowPriorityJobs[0]);
			}

			const [highCounts, lowCounts] = await Promise.all([
				customRunAfterEvaluationQueue.getJobCounts(),
				submissionAfterEvaluationQueue.getJobCounts(),
			]);

			const highIdle = highCounts.waiting === 0 && highCounts.active === 0;
			const lowIdle = lowCounts.waiting === 0 && lowCounts.active === 0;

			if (highIdle && lowIdle) {
				await new Promise(resolve => setTimeout(resolve, 500));
			}
		}
	} catch (error) {
		console.error("Error in worker loop:", error);
	}
}