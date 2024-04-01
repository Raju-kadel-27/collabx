import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import config from '../../config';
import crypto from 'crypto';

function verifySignature(
    request: Request,
    secret: string
) {
    const hmac = crypto.createHmac('sha256', secret);
    const calculatedSignature = hmac.update(JSON.stringify(request.body)).digest('hex');
    return request.get('X-Signature') === calculatedSignature;
}

app.use((
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = verifySignature(req, config.webhookSecretKey);
    if (isValid) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.post('/webhook', (
    req: Request,
    res: Response
) => {

    const eventData = req.body;

    console.log('Received webhook event:', eventData);

    res.status(200).send('Webhook received successfully');
});




