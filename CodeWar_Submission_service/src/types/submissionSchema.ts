
import { ProblemStatus } from "./problemStatus";

export type Submission = {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: ProblemStatus;
  createdAt: Date;
};