import { celebrate, errors, isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

// (schema: any) to accommodate different Joi schemas
export const CelebrateMiddleware = (schema: any) => celebrate({ body: schema });

export const CelebrateErrorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (isCelebrateError(err)) {
        // Celebrate validation error
        const validationErrorDetails = Array.from(err.details).map(([segment, joiError]) => {
            return {
                segment,
                message: joiError.message,
                path: joiError.cause,
            };
        });

        return res.status(400).json({
            error: {
                message: 'Validation error',
                details: validationErrorDetails,
            },
        });
    }

    next(err);
};

