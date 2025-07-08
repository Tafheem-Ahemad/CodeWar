
import { Problem } from './problemSchema';

export interface ProblemRepositoryInterface {
	getProblemById(id: string): Promise<Problem>;
	getProblemsByIds(ids: string[]): Promise<Problem[]>;
}