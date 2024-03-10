import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import url from 'url';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { RedisSubscriptionManager } from './subscriptions/RedisSubscriptionManager';
import { UserManager } from './users/UserManager';
import { extractUserId } from './auth';
import { PORT } from './config';

const app = express();
const port = PORT || 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

app.get('/healthcheck', (req, res) => res.send({}));

app.get('/', (_req: Request, res: Response) => {
    return res.status(200).json({
        uptime: process.uptime(),
        message: 'OK',
        timeStamp: Date.now()
    })
});

app.get('/verify', (req: Request, res: Response) => {
    const cookie = req.headers.cookie || '';
    if (cookie) {
        try {
            let jwt = "";
            cookie.split(';').forEach((item) => {
                const cookie = item.trim().split("=");
                if (cookie[0] === 'jwt') {
                    jwt = cookie[1]
                }
            })
            res.json({ jwt });
        } catch (error) {
            console.log({ error })
            res.json({ jwt: "" })
        }
    }
});

wss.on('connection', async (ws, req) => {
    const urlParts = url.parse(req.url || '', true);
    const query = urlParts.query;
    //@ts-ignore
    const jwt: string = query.jwt;
    let userId: any = await extractUserId(jwt || "");
    if (!userId) {
        console.log('No userId.Unauthorized');
        ws.close()
        return;
    }
    const hasAlreadyConnected = UserManager.getInstance().isUserAdded(userId)
    if (hasAlreadyConnected) {
        console.log('User already connnected in system. Blocking this connection.')
        return;
    }
    UserManager.getInstance().addUser(
        jwt,
        userId,
        ws
    );
})

process.on('uncaughtException', (err) => {
    console.log({ err });
    console.log('Uncaught exception has occured');
});

server.listen(port, () => {
    console.log(`Websocket server listening on PORT=${port}`);
})