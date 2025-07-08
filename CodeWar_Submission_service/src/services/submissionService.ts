import { SubmissionRepository } from "../repositories/submissionRepository";
import {ProblemSubmission} from "../models/problemSubmissionSchema";
import { CustomRun } from "../models/customRunSchema";
import customRunBeforeEvaluationProducer from "../producers/customRunBeforeEvaluationProducer";
import submissionBeforeEvaluationProducer from "../producers/submissionBeforeEvaluationProducer";


export class submissionService {
	private submissionRepository: SubmissionRepository;
	constructor(submissionRepository: SubmissionRepository) {
		this.submissionRepository = submissionRepository;
	}

	async createSubmission(submissionData: ProblemSubmission) {
		try {
			const response=await this.submissionRepository.createSubmission(submissionData);
			const { success, submissionId } = response;
			if (!success) {
				throw new Error("Failed to create submission");
			}

			const data = {
				submissionId: submissionId,
				...submissionData
			}

			submissionBeforeEvaluationProducer(data);
		} catch (error) {
			throw new Error(`Error creating submission: ${submissionData.problemId}`);
		}
	}	

	async getSubmissionById(id: string) {
		try {
			const submission = await this.submissionRepository.getSubmissionById(id);
			if (!submission) {
				throw new Error(`Submission with ID ${id} not found`);
			}
			return submission;
		} catch (error) {
			throw new Error(`Error fetching submission by ID: ${id}`);
		}
	}

	async getSubmissionsByIds(ids: string[]) {
		try {
			const submissions = await this.submissionRepository.getSubmissionByIds(ids);
			if (!submissions || submissions.length === 0) {
				throw new Error(`No submissions found for the provided IDs: ${ids.join(", ")}`);
			}
			return submissions;
		} catch (error) {
			throw new Error(`Error in fetching submissions`);
		}
	}
	
	async updateSubmissionStatus(id: string, status: string) {
		try {
			const updatedSubmission = await this.submissionRepository.updateSubmissionStatus(id, status);
			if (!updatedSubmission) {
				throw new Error(`Failed to update submission status for ID ${id}`);
			}
		} catch (error) {
			throw new Error(`Error updating submission status`);
		}
	}

	async getUserById(id: string) {
		try {
			const user = await this.submissionRepository.getUserByID(id);
			if (!user) {
				throw new Error(`User with ID ${id} not found`);
			}
			return user;
		} catch (error) {
			throw new Error(`Error fetching user by ID: ${id}`);
		}
	}

	async getSubmissionsByUserId(userId: string) {
		try {
			const submissions = await this.submissionRepository.getSubmissionsByUserId(userId);
			if (!submissions || submissions.length === 0) {
				throw new Error(`No submissions found for user ID ${userId}`);
			}
			return submissions;
		} catch (error) {
			throw new Error(`Error fetching submissions by user ID: ${userId}`);
		}
	}

	async createCustomRun(customRunData: CustomRun) : Promise<Record<string, any>> {
		try {
			customRunBeforeEvaluationProducer(customRunData);
			return {
				success: true,
				message: "Custom run created successfully"
			};
		} catch (error) {
			throw new Error(`Error in creating custom run`);
		}
	}
}