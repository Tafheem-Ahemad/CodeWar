import { Job } from "bullmq";

import submissionAfterEvaluationProducer from "../producers/submissionAfterEvaluationProducer";
import { IJob } from "../types/bullMqJobDefinition";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/ExecutorFactory";
import {fetchTestCases} from "../fetchData/fetchTestcases";
import {TestCases} from "../types/testCases";

export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        console.log("Handler of the job called");
        console.log(this.payload);
        if(job) {
            const key = Object.keys(this.payload)[0];
            const codeLanguage = this.payload[key].language;
            const code = this.payload[key].code;
			const problemId = this.payload[key].problemId;
            const strategy = createExecutor(codeLanguage);
            console.log(strategy);
            if(strategy != null) {

				const testcases : TestCases = await fetchTestCases(problemId);

				let result = "SUCCESS";
				for (const testcase of testcases) {
					const response : ExecutionResponse = await strategy.execute(code, testcase.input);
					
					if(response.status === "COMPLETED") {
						if(response.output.trim() !== testcase.output.trim()) {
							result = "WA";
							break;
						}
					} else {
						result  = response.status || "Unknown Error";
						break;
					}
				}


                submissionAfterEvaluationProducer({result, userId: this.payload[key].userId, submissionId: this.payload[key].submissionId});
                if(result === "SUCCESS"){
                    console.log("Code executed successfully");
                    console.log(result);
                } else {
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