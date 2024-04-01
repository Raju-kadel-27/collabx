import express from 'express';
import cors from 'cors';
import config from '../../config';
import { Request, Response, NextFunction } from 'express';
import routes from '../../database/routes';
import { corsOptions } from '../../config/corsOptions';
import { CelebrateErrorMiddleware } from '../middlewares/celebrate';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { getElasticClient } from '../elastic-client';

export default ({ app }: { app: express.Application }) => {

    // Useful if you're behind a reverse proxy (Nginx,BlueMix,AWS ELB)
    // It shows the real origin IP in the heroku or CloudWatch logs
    app.enable('trust proxy');

    app.use(cookieParser())

    app.use(cors(corsOptions));

    app.use(compression())

    app.use(express.json());

    app.locals.elasticClient = getElasticClient()

    app.get('/', (_req: Request, res: Response) => {

        res.status(200).json({ status: 'Server is OK' });
    })
    app.head('/status', (_req: Request, res: Response) => {

        res.status(200).json({ message: 'Heartbeat is ok' });
    })

    // handling search query in elastic search database query
    app.use('/getIndex', (
        req: Request,
        res: Response
    ) => {
        try {
            console.log('Getting response cache from getIndex Routes//');
            return res.status(200).json({ message: 'Handling world efficiently' });
        } catch (error) {
            console.log({ error })
        }
    })

    app.use(config.api.prefix, routes());

    // catch 404 and forward to error handler
    app.use((
        _req: Request,
        _res: Response,
        next: NextFunction) => {
        const err: any = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    // catch validation error from celebrate(Joi)
    app.use(CelebrateErrorMiddleware)

    // catch unauthorized error
    app.use((
        err: { name: string; status: number; message: string },
        _req: Request,
        res: Response,
        next: NextFunction) => {
        console.log(err, 'catchh')

        if (err.name === 'UnauthorizedError') {

            return res
                .status(err.status || 401)
                .send({ message: err.message })
                .end();
        }
        console.log(err, 'catch')

        return next(err);
    });

    app.use((
        err: any,
        _req: Request,
        res: Response,
        //  DO_NOT_REMOVE_THIS_PARAMETER
        _next: NextFunction
    ) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        })
    });

}
