import problemController from "../../controllers/problemController";
import { FastifyInstance } from "fastify";

export default async function problemRoutes(fastify: FastifyInstance) {
	fastify.get("/problems",problemController.getAllProblems);

	fastify.get("/problems/getMany",problemController.getProblemsByIds);

  	fastify.get("/problem/:id",problemController.getProblemById);
}