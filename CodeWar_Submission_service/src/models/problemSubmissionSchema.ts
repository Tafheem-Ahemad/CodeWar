import {z} from 'zod';

const problemSubmissionSchema = z.object({
  	problemId: z.string(),
  	userId: z.string(),
  	code: z.string(),
  	language: z.string(),
}).strict();

export type ProblemSubmission = z.infer<typeof problemSubmissionSchema>;
