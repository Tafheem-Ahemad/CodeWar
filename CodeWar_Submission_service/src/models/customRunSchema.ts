import {z} from 'zod';

const customRunSchema = z.object({
	problemId: z.string(),
	userId: z.string(),
	code: z.string(),
	language: z.string(),
	input: z.string()
}).strict();

export type CustomRun = z.infer<typeof customRunSchema>;
