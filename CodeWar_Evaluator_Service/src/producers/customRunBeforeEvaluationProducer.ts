import customRunBeforeEvaluationQueue from "../queues/customRunBeforeEvaluationQueue";

export default async function(payload: Record<string, unknown>) {
    await customRunBeforeEvaluationQueue.add("customRunBeforeEvaluationJob", payload);
    console.log("Successfully added a new custom run evaluation job to the after evaluation queue.");
}