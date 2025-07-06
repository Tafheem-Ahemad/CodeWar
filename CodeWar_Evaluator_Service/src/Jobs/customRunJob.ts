import { Job } from "bullmq";

import customRunAfterEvaluationProducer from "../producers/customRunAfterEvaluationProducer";
import { IJob } from "../types/bullMqJobDefinition";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";
import { CustomRunPayload } from "../types/customRunPayload";
import createExecutor from "../utils/ExecutorFactory";
import { fetchSolution } from "../fetchData/fetchSolution";
import { problemSolution } from "../types/problemSolution";

export default class CustomRunJob implements IJob {
	name: string;
	payload: Record<string, CustomRunPayload>;
	constructor(payload: Record<string, CustomRunPayload>) {
		this.payload = payload;
		this.name = this.constructor.name;
	}

	handle = async (job?: Job) => {
		console.log("Handler of the job called");
		console.log(this.payload);
		if(job){
			const key = Object.keys(this.payload)[0];
			const codeLanguage = this.payload[key].language;
			const code = this.payload[key].code;
			const problemId = this.payload[key].problemId;
			const strategy = createExecutor(codeLanguage);
			const inputCase = this.payload[key].inputCase;
			console.log(strategy);
			if(strategy != null) {

				let result = "AC";

				const response: ExecutionResponse = await strategy.execute(code, inputCase);
				if(response.status === "COMPLETED") {
					const solution : problemSolution  = await fetchSolution(problemId);
					const solutionStrategy = createExecutor(solution.language);
					
					const solutionOutput = solutionStrategy ? await solutionStrategy.execute(solution.code, inputCase) : null;

					if(solutionOutput && solutionOutput.output.trim() !== response.output.trim()){
						result = "WA";
					}
				}else{
					result = response.status;
					customRunAfterEvaluationProducer({result, userId: this.payload[key].userId, submissionId: this.payload[key].submissionId});
				}

				if(result === "AC"){
					console.log("Code executed successfully");
					console.log(result);
				}else{
					console.log("Something went wrong with code execution");
					console.log(result);
				}
			}else{
				throw new Error(`No executor found for language: ${codeLanguage}`);
			}
		}
	};

	failed = (job?: Job) : void => {
		console.log("Job failed");
		if(job) {
			console.log(job.id);
		}
	};
}