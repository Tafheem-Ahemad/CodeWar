import {sanitizeMarkdownContent} from "../utils/markdownSanitizer";
import { problemSchema } from "../models/createProblemSchema";
import ProblemRepository from "../repositories/problemRepository";
import { CodeSubs } from "../models/codeSubsSchema";
import { availableLanguages } from "../utils/constants";
import {UpdateProblem} from "../models/updateProblemSchema";
import {Testcases} from "../models/testcasesSchema";

class ProblemService {

	private problemRepository: ProblemRepository;
    constructor(problemRepository:ProblemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData:problemSchema) : Promise<problemSchema> {
        // 1. Sanitize the markdown for description
        problemData.description = await sanitizeMarkdownContent(problemData.description);

		// 2. check the CodeSubs are present for all the languages
        const isAllCodeStubesPresnt = await this.checkCodeSubsForProblem(problemData.codeSubs);
		if (!isAllCodeStubesPresnt) {
			throw new Error("Code stubs are not present for all languages");
		}

		// 3. Can be check the testcases are valid or not
        return problem;
    }

    async getProblem(problemId:string) : Promise<ProblemDetails>  {
        const problem = await this.problemRepository.getProblem(problemId);
        return problem;
    }

    async deleteProblem(problemId:string) : Promise<problemSchema> {
        const problem = await this.problemRepository.deleteProblem(problemId);
        return problem;
    }

	async updateProblem(problemData:UpdateProblem) : Promise<UpdateProblem> {
		
		return problemData;
	}

	async checkCodeSubsForProblem(codeSubs: CodeSubs[]) : Promise<boolean> {
		// Check if all languages in codeSubs are available in the system
		const languages = codeSubs.map(sub => sub.language);
		const isValid = languages.every(lang => availableLanguages.includes(lang));
		
		if (!isValid) {
			return false;
		}
		return true;
	}
}

export default ProblemService;