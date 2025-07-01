import {z} from "zod";
import {testcasesSchema} from "./testcasesSchema";
import {difficultyLevels} from "../utils/constants";
import {solutionSchema} from "./solutionSchema";
import { codeSubsSchema } from "./codeSubsSchema";


export const createProblemSchema = z.object({
	"title": z.string().min(1, "Title is required"),
	"description": z.string().min(1, "Description is required"),
	"difficulty": z.enum(difficultyLevels),
	"tags": z.array(z.string()).min(1, "At least one tag is required"),
	"company": z.string().min(1, "Company is required"),
	"testcases": testcasesSchema,
	"solution": z.array(solutionSchema).min(1, "At least one solution is required"),
	"hints": z.array(z.string()).optional(),
	"editorial": z.string().optional(),
	"codeSubs": z.array(codeSubsSchema),
}).strict();

export type problemSchema = z.infer<typeof createProblemSchema>;