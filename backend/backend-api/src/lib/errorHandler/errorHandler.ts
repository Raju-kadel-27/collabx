import { LoggerInstance as Logger } from "../loaders/logger";
import { uuid } from 'uuidv4';

export const errorHandler = (err: any, req: any, res: any, next: any) => {
    const trackingId = uuid();
    Logger.error(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`)
    Logger.error(
        'Express error handler dump with tracking ID: %s, error dump: %o',
        trackingId, err);

    const status = res.statusCode ? res.statusCode : 500;
    res.status(status)
    res.send(
        `<h1>Internal Server Error</h1>
        <p>If you report this error, please also report this 
        <i>tracking ID</i> which makes it possible to locate your session
        in the logs which are available to the system administrator: 
        <b>${trackingId}</b></p>`
    );
};
// res.json({ message: err.message, isError: true })
