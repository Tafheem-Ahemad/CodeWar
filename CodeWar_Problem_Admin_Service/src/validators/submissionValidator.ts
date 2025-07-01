import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {

		const data={
			...req.body,
			...req.query,
			...req.params,
			...req.headers
		};

		if (!schema.safeParse(data).success) {
			throw new Error('Validation failed');
		}

        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Invalid request params received',
            data: {},
            error: error 
        });
		return;
    }
};