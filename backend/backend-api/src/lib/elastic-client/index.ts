import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import Container from 'typedi';

let esClient: Client | null = null;

export function getElasticClient() {
    try {
        const logger = Container.get<Logger>('logger');
        try {
            if (!esClient) {

                esClient = new Client({ node: 'http://localhost:9200' });

                logger.info('Elastic-search client initialized successfully')
            }
            return esClient;
        } catch (error) {
            logger.error(error)
        }
    } catch (error) {
        console.log('Error!! Getting the logger instance from typedi container')
    }
}
