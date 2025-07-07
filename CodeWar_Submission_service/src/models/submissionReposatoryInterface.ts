import { ProblemSubmission } from '../models/problemSubmissionSchema';
import { Submission } from '../models/submissionSchema';
import { ProblemStatus } from '../models/problemStatus';
import { User } from '../models/userSchema';
import { createSubmissionResponse } from '../models/createSubmissionResponse';


export interface SubmissionRepositoryInterface {
	createSubmission(submission: ProblemSubmission): Promise<createSubmissionResponse>;
	getSubmissionById(id: string): Promise<Submission>;
	getSubmissionsByUserId(userId: string): Promise<Submission[]>;
	getSubmissionByIds(ids: string[]): Promise<Submission[]>;
	updateSubmissionStatus(id: string, status: ProblemStatus): Promise<Submission>;
	getUserByID(id: string): Promise<User>;
}