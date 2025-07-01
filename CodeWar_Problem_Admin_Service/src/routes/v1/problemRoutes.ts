import express from "express";
import { validate } from "../../validators/submissionValidator";
import { createProblemSchema } from "../../models/createProblemSchema";
import { updateProblemSchema } from "../../models/updateProblemSchema";
import {pingProblemController , addProblem, getProblem, updateProblem, deleteProblem} from "../../controllers/problemController";

export const problemRouter = express.Router();

// If any request comes and route continues with /ping, we map it to pingProblemController
problemRouter.get('/ping', pingProblemController);

problemRouter.post('/', validate(createProblemSchema), addProblem);

problemRouter.get('/:id', getProblem);

problemRouter.put('/:id', validate(updateProblemSchema), updateProblem);

problemRouter.delete('/:id', deleteProblem);

// export default problemRouter;