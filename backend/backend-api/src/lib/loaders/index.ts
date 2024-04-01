import express from 'express'
import expressLoader from './express';
import mongooseLoader from './mongoose';
import { Logger } from './logger';
import { models } from '../../utils/InjectableService';
import dependencyInjectorLoader from './dependencyInjector';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB loaded and connected');

    dependencyInjectorLoader({ mongoConnection, models });

    Logger.info('✌️ Dependency Injector loaded');
    Logger.info('✌️ Jobs loaded');

    expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
}