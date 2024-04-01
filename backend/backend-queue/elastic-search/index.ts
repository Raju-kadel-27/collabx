import express, { Request, Response } from 'express';
import compression from 'compression';
import config from './configs';
import { logger } from './logger';
import helmet from 'helmet';
import { ElasticManager } from './elastic-client/ElasticManger';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(compression());

app.get('/', (
    _req: Request,
    res: Response
) => {
    res.status(200).json({ status: 'Api server is  running' })
})

app.get('/_health', (
    _req: Request,
    res: Response
) => {
    res.status(200).json({ status: 'HeartBeat is OK' })
})

app.post('/messages', (
    req: Request,
    res: Response
) => {
    try {

        ElasticManager.getInstance().createIndex('indexName');
        logger.info('Created the index on document');

    } catch (error) {
        logger.error({ error });
    }
})

app.listen(
    config.PORT,
    () => {
        logger.info(`INFO___Server is listening on port ${config.PORT}`);
        logger.error('ERROR___Nothing wrong !! Cool.Just Testing //');
        logger.warn('WARNING___Nothing wrong !! Cool.Just Testing //');
        logger.silly('SILLY___Nothing wrong !! Cool.Just Testing //');
    }
)




