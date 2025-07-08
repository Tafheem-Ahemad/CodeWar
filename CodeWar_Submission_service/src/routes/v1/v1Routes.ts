import problemRoutes from "./problemRoutes";
import submissionRoutes from "./submissionRoutes";
import { FastifyInstance } from "fastify";

export default async function v1Routes(fastify: FastifyInstance) {
	fastify.register(problemRoutes);
	fastify.register(submissionRoutes);
}