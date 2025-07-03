import submissionBeforeEvaluationQueue from "../queues/submissionBeforeEvaluationQueue";

export default async function(payload: Record<string, unknown>) {
	await submissionBeforeEvaluationQueue.add("submissionBeforeEvaluationJob", payload);
	console.log("Successfully added a new submission evaluation job to the before evaluation queue.");
}