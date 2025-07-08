import v1Routes from "./v1/v1Routes";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

const apiRouters = async (fastify: FastifyInstance) => {
	fastify.register(v1Routes, { prefix: "/v1" });
};

export default fastifyPlugin(apiRouters, {
	name: "apiRouters",
	dependencies: ["repositoryPlugin", "servicePlugin"], // Ensure these plugins are registered before this one
});
