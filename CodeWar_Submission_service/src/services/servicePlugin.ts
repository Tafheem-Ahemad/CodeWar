import fastifyPlugin from "fastify-plugin";
import fastify, { FastifyInstance } from "fastify";
import { ProblemService } from "./problemService";
import { submissionService } from "./submissionService";

const servicePlugin = async (fastify: FastifyInstance) => {
	// Add problemService to Fastify instance
	fastify.decorate("problemService", new ProblemService(fastify.problemRepository));
	
	// Add submissionService to Fastify instance
	fastify.decorate("submissionService", new submissionService(fastify.submissionRepository));
};

export default fastifyPlugin(servicePlugin,{
	name: "servicePlugin",
	dependencies: ["repositoryPlugin"], // Ensure repositoryPlugin is registered before this one
});