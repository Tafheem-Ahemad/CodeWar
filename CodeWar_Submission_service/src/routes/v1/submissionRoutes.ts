import submissionController from "../../controllers/submissionController";
import { FastifyInstance } from "fastify";
import {validate} from "../../validators/validator";
import {customRunSchema} from "../../models/customRunSchema";
import {problemSubmissionSchema} from "../../models/problemSubmissionSchema";

export default async function submissionRoutes(fastify: FastifyInstance) {
	fastify.get("/submission/:id", submissionController.getSubmissionById);
	fastify.get("/submissions/user/:id", submissionController.getSubmissionsByUserId);
	fastify.get("/submissions/getMany", submissionController.getSubmissionByIds);
	fastify.get("/user/:id", submissionController.getUserByID);

	fastify.post("/submission",
		{
			preHandler: validate(problemSubmissionSchema)
		}
		,submissionController.createSubmission
		);

	fastify.post("/customRun", 
		{
			preHandler: validate(customRunSchema)
		},
			submissionController.createCustomRun
		);
}

