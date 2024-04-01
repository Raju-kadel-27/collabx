import 'reflect-metadata'; // To use @Decorators
import config from './config';
import express from 'express';
import { Logger } from '../src/lib/loaders/logger';
import * as Controllers from './database/controllers'

console.log('Password did not match properly...');
console.log('Handling all the api routes in Router Fetch');

async function startServer() {

    const app = express();
    await require('./lib/loaders').default({ expressApp: app })

    const server = app.listen(config.port);

    server.on('error', (err) => {
        if (err.name === 'EADDRINUSE') {
            Logger.error(`Port ${config.port} is already in use`);
            process.exit(1);
        } else {
            Logger.error(err);
            process.exit(1);
        }
    })

    server.on('listening', () => {
        Logger.info(`
        ################################################
        🛡️ Server listening on port: ${config.port}  
        ################################################
        `)
    })

    process.on
        (
            'uncaughtException',
            (err) => {
                Logger.error('UNCAUGHT EXCEPTION! 💥Shutting down');
                Logger.error(err.name, err.message);
                process.exit(1);
            }
        );

    process.on(
        'unhandledRejection',
        (err:
            {
                name: string;
                message: string
            }
        ) => {
            Logger.error('UNHANDLED REJECTION! 💥Shutting down');
            Logger.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
};

startServer()