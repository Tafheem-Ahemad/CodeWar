import { FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import { SubmissionRepository } from "./submissionRepository";
import { ProblemRepository } from "./problemRepository";

const repositoryPlugin = async (fastify: FastifyInstance) => {
    // Add submissionRepository to Fastify instance
    fastify.decorate("submissionRepository", new SubmissionRepository());
	// Add problemRepository to Fastify instance
	fastify.decorate("problemRepository", new ProblemRepository());
};

export default fp(repositoryPlugin);
