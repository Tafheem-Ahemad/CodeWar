import problemServiceDB from './../config/problemServiceDBConnection';
import { ProblemRepositoryInterface } from '../models/problemRepositoryInterface';
import { Problem } from '../models/problemSchema';
import { NotFoundError } from '../errors/notFoundError';

export class ProblemRepository implements ProblemRepositoryInterface {
	dbconnection: typeof problemServiceDB;
	constructor() {
		this.dbconnection = problemServiceDB;
	}

	async getProblemById(id: string): Promise<Problem> {
		const problem = await this.dbconnection.problem.findUnique({
			where: { id: id },
			select: {
				id: true,
				title: true,
				description: true,
				difficulty: true,
				tags: true,
				companies: true,
				editorial: true,
				hints: true,
				testcase: {
					select: {
						input: true,
						output: true
					},
					where:{
						isHidden: false
					}
				},
				codeSubs: {
					select: {
						language: true,
						startSnippet: true,
						endSnippet: true,
						userSnippet: true
					}
				}
			}
		});

		if (!problem) {
			throw new NotFoundError(`Problem with ID ${id} not found.`);
		}

		return problem as Problem;
	}

	async getProblemsByIds(ids: string[]): Promise<Problem[]> {
		const problems = await this.dbconnection.problem.findMany({
			where: {
				id: {
					in: ids
				}
			},
			select: {
				id: true,
				title: true,
				description: true,
				difficulty: true,
				tags: true,
				companies: true,
				editorial: true,
				hints: true,
				testcase: {
					select: {
						input: true,
						output: true
					},
					where:{
						isHidden: false
					}
				},
				codeSubs: {
					select: {
						language: true,
						startSnippet: true,
						endSnippet: true,
						userSnippet: true
					}
				}
			}
		});
		if(!problems){
			throw new NotFoundError(`No problems found for the provided IDs.`);
		}

		return problems as Problem[];
	}
}