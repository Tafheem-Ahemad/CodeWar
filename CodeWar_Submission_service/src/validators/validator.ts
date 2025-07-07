import { ZodSchema } from "zod";
import {FastifyRequest, FastifyReply} from "fastify";

export const validate=function(schema: ZodSchema<unknown>) {
	return function(req: FastifyRequest, res: FastifyReply) {
		const data={
			...(typeof req.body === 'object' &&  req.body !== null ? req.body : {}),
			...(typeof req.query === 'object' && req.query !== null ?  req.query : {}),
			...(typeof req.params === 'object' && req.params !== null ? req.params : {}),
		}
		const result = schema.safeParse(data);
		if (!result.success) {
			return res.status(400).send({
				error: "Validation failed",
				details: result.error.errors,
			});
		}
		req.body = result.data;
	};
};
