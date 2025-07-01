
import BaseError  from "./baseError";
import { StatusCodes } from "http-status-codes";

class NotFound extends BaseError {
	public resourceName: string;
	public resourceValue: string;

    constructor(resourceName:string, resourceValue:string) {
        super("NotFound", StatusCodes.NOT_FOUND, `The requested resource: ${resourceName} with value ${resourceValue} not found`, {
            resourceName,
            resourceValue
        });

		this.resourceName = resourceName;
		this.resourceValue = resourceValue;

		Object.setPrototypeOf(this, NotFound.prototype);
    }
}

export default NotFound;