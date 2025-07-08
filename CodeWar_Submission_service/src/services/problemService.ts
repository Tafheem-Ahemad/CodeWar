import { FastifyInstance } from 'fastify';
import { ProblemRepository } from '../repositories/problemRepository';


export class ProblemService {
	private problemRepository: any;
	constructor(problemRepository: ProblemRepository) {
		this.problemRepository = problemRepository;
	}

	async getProblemById(id: string) {
		try {
		const problem = await this.problemRepository.getProblemById(id);
		return problem;
		} catch (error) {
		throw new Error(`Error fetching problem with ID ${id}`);
		}
	}

	async getProblemsByIds(ids: string[]) {
		try {
		const problems = await this.problemRepository.getProblemsByIds(ids);
		return problems;
		} catch (error) {
		throw new Error(`Error fetching problems with IDs ${ids.join(', ')}`);
		}
	}

	async getAllProblems() {
		try{
			const problems = await this.problemRepository.getAllProblems();
			return problems;
		} catch (error) {
			throw new Error('Error fetching all problems');
		}
	}
}