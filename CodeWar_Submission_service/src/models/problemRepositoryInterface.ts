
import { Problem } from '../models/problemSchema';

export interface ProblemRepositoryInterface {
	getProblemById(id: string): Promise<Problem>;
	getProblemsByIds(ids: string[]): Promise<Problem[]>;
}