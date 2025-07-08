import { ProblemSubmission } from '../models/problemSubmissionSchema';
import { Submission } from './submissionSchema';
import { ProblemStatus } from './problemStatus';
import { User } from './userSchema';
import { createSubmissionResponse } from './createSubmissionResponse';


export interface SubmissionRepositoryInterface {
	createSubmission(submission: ProblemSubmission): Promise<createSubmissionResponse>;
	getSubmissionById(id: string): Promise<Submission>;
	getSubmissionByIds(ids: string[]): Promise<Submission[]>;
	getSubmissionsByUserId(userId: string): Promise<Submission[]>;
	updateSubmissionStatus(id: string, status: ProblemStatus): Promise<Submission>;
	getUserByID(id: string): Promise<User>;
}