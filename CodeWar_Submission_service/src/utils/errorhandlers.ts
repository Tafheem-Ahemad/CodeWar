import { BaseError } from "../errors/baseError";
import { StatusCodes } from "http-status-codes";
import { FastifyRequest, FastifyReply } from "fastify";

export default function errorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply){
  	if (error instanceof BaseError) {
		reply.status(error.statusCode).send({
			success: false,
		  	error: error.details,
		  	message: error.message,
		});
  	} else {
		reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			success: false,
		  	error:error instanceof Error ? error.message : "Internal Server Error",
			massage: "something went wrong!",
		});
  	}
}