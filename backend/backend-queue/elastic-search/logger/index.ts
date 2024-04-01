import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

const logDir = 'logs';

// Ensure the log directory exists
fs.mkdirSync(logDir, { recursive: true });

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [

        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),

        new DailyRotateFile({
            level: 'info',
            filename: path.join(logDir, '%DATE%-app.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),

        new DailyRotateFile({
            level: 'error',
            filename: path.join(logDir, '%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
    exceptionHandlers: [

        new DailyRotateFile({
            filename: path.join(logDir, 'exceptions-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
    exitOnError: false, // Continue logging even after uncaught exceptions
});


// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    // Optionally, terminate the process or perform additional actions
});

