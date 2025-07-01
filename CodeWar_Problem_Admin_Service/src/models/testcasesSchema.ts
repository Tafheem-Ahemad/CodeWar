import {z} from "zod";
import {testcaseSchema} from "./testcaseSchema";

export const testcasesSchema = z.object({
	"testcases": z.array(testcaseSchema).min(1, "At least one testcase is required"),
}).strict();

export type Testcases = z.infer<typeof testcasesSchema>;