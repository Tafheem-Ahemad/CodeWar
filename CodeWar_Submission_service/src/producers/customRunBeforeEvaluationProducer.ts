import customRunBeforeEvaluationQueue from "../queues/customRunBeforeEvaluationQueue";
import { CustomRunPayload } from "../models/customRunPayload";

export default async function customRunBeforeEvaluationProducer(payload : CustomRunPayload){
	try {
		await customRunBeforeEvaluationQueue.add("customRunBeforeEvaluationJob",payload);
		console.log("Payload added to customRunBeforeEvaluationQueue successfully.");
	} catch (error) {
		throw new Error("Failed to add payload to customRunBeforeEvaluationQueue");
	}
}