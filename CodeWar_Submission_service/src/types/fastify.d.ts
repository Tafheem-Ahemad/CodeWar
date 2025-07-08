import "fastify";
import { ProblemRepository } from "../repositories/problemRepository";
import { SubmissionRepository } from "../repositories/submissionRepository";
import { ProblemService } from "../services/problemService";
import { SubmissionService } from "../services/submissionService";

declare module "fastify" {
  interface FastifyInstance {
    problemRepository: ProblemRepository;
    submissionRepository: SubmissionRepository;
    problemService: ProblemService;
    submissionService: SubmissionService;
  }
}
