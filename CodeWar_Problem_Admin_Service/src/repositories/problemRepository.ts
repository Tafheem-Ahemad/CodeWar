import NotFoundError from "../errors/notFoundError";
import BadRequestError from "../errors/badRequestError";
import { problemSchema } from "../models/createProblemSchema";

class ProblemRepository {

    async createProblem(problemData:problemSchema) {
        try {

            
            // return problem;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProblems() {
        try {
            
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getProblem(id: string) {
        try {
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    } 

    async deleteProblem(id: string) {
        try {
           
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

export default ProblemRepository;