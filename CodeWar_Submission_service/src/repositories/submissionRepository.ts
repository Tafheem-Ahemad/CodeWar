import submissionServiceDB from './../config/submissionServiceDBConnection';
import { NotFoundError } from '../errors/notFoundError';
import { SubmissionRepositoryInterface } from '../types/submissionReposatoryInterface';
import { ProblemSubmission } from '../models/problemSubmissionSchema';
import { Submission } from '../types/submissionSchema';
import { ProblemStatus } from '../types/problemStatus';
import { User } from '../types/userSchema';
import { createSubmissionResponse } from '../types/createSubmissionResponse';

export class SubmissionRepository implements SubmissionRepositoryInterface {
	dbConnection: typeof submissionServiceDB;
  	constructor() {
		this.dbConnection = submissionServiceDB;
  	}

  	async createSubmission(submission: ProblemSubmission): Promise<createSubmissionResponse> {

		try{
			const createdSubmission  = await this.dbConnection.submission.create({
				data: {
					problemId: submission.problemId,
					userId: submission.userId,
					code: submission.code,
					language: submission.language
				},
			});

			if (!createdSubmission) {
				console.error("Failed to create submission");
				return {
					success: false,
					submissionId: ""
				};
			}

			return {
				success: true,
				submissionId: createdSubmission.id
			};
		}catch(error) {
			console.error("Error creating submission:", error);
			return {
				success: false,
				submissionId: ""
			};
		}
	}

  	async getSubmissionById(id: string): Promise<Submission> {
	    const submission = await this.dbConnection.submission.findUnique({
	        where: {
	            id: id
	        }
	    });

		if(!submission) {
			throw new NotFoundError(`Submission with ID ${id} not found.`);
		}

	    return submission as Submission;
	}

	async getSubmissionsByUserId(userId: string): Promise<Submission[]> {
		const submissions = await this.dbConnection.submission.findMany({
			where: {
				userId: userId
			}
		});

		if(!submissions || submissions.length === 0) {
			throw new NotFoundError(`No submissions found for user ID ${userId}.`);
		}

		return submissions as Submission[];
	}

	async getSubmissionByIds(ids : string[]): Promise<Submission[]> {
		const submissions = await this.dbConnection.submission.findMany({
			where: {
				id: {
					in: ids
				}
			}
		});

		if(!submissions || submissions.length === 0) {
			throw new NotFoundError(`No submissions found for the provided IDs.`);
		}

		return submissions as Submission[];
	}

	async updateSubmissionStatus(id: string, status: string): Promise<Submission> {
	    const updatedSubmission = await this.dbConnection.$transaction(async (prisma) => {
	        // Update the submission status
	        const submission = await prisma.submission.update({
	            where: { id },
	            data: { status },
	        });

	        if (status === ProblemStatus.ACCEPTED) {
				// If status is ACCEPTED, check if this user has already solved this problem
	            const existingAccepted = await prisma.submission.findFirst({
	                where: {
	                    userId: submission.userId,
	                    problemId: submission.problemId,
	                    status: ProblemStatus.ACCEPTED,
	                    NOT: { id },
	                },
	            });

	            if (!existingAccepted) {
	                await prisma.user.update({
	                    where: { id: submission.userId },
	                    data: {
	                        problemSolved: {
	                            increment: 1,
	                        },
	                    },
	                });
	            }
	        }

	        return submission;
	    });

	    if(!updatedSubmission){
	        throw new Error(`Failed to update submission with ID ${id}.`);
	    }

	    return updatedSubmission as Submission;
	}

	async getUserByID(id: string): Promise<User> {
	    const user = await this.dbConnection.user.findUnique({
	        where: {
	            id: id,
	        },
	        select: {
	            id: true,
            	username: true,
            	email: true,
            	problemSolved: true,
				bio: true,
				profilePicture: true,
				createdAt: true
	        }
	    });

	    if (!user) {
	        throw new NotFoundError(`User with ID ${id} not found.`);
	    }

		return user as User;
	}
}