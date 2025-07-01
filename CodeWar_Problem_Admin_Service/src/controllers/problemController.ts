import { Request,Response } from "express";
import ProblemRepository from "../repositories/problemRepository";
import ProblemService from "../service/problemService";
const { StatusCodes } = require('http-status-codes');

const problemService = new ProblemService(new ProblemRepository());

export function pingProblemController(req: Request, res: Response) {
	res.json({message: 'Problem controller is up'});
    return ;
}

export async function addProblem(req: Request, res: Response) {
    try {
        console.log("incoming req body", req.body);
        const newproblem = await problemService.createProblem(req.body);
       	res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new problem',
            error: {},
            data: newproblem
        });
		return;
    } catch(error: any) {
        
    }
}

export async function getProblem(req: Request, res: Response) {
    try {
        const problem = await problemService.getProblem(req.params.id);
		res.status(StatusCodes.OK).json({
			success: true,
            error: {},
            message: 'Successfully fetched a problem',
            data: problem
        })
		return ;
    } catch(error) {

    }
}

export async function deleteProblem(req: Request, res: Response) {
    try {
        const deletedProblem = await problemService.deleteProblem(req.params.id);
		res.status(StatusCodes.OK).json({
			success: true,
            message: 'Successfully deleted the problem',
            error: {},
            data: deletedProblem
        });
		return ;
    } catch(error) {

    }
}

export async function updateProblem(req: Request, res: Response) {
    try {
        // nothing implemented
        // throw new NotImplemented('Add Problem');
    } catch(error) {
        // next(error);
    }
}
