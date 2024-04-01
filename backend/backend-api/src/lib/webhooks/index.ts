const crypto = require('crypto');
import mongoose from '../loaders/mongoose';
import async from 'async';

const WebhookEventSchema = new mongoose.Schema({
    event: String,
    data: Object,
    timestamp: { type: Date, default: Date.now }
});

const WebhookEvent = mongoose.model('WebhookEvent', WebhookEventSchema);

function verifySignature(request, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    const calculatedSignature = hmac.update(JSON.stringify(request.body)).digest('hex');
    return request.get('X-Signature') === calculatedSignature;
}

app.post('/webhook', async (req, res) => {
    if (!verifySignature(req, config.webhookSecret)) {
        return res.status(401).send('Unauthorized');
    }
    const eventData = req.body;

    const savedEvent = await new WebhookEvent({
        event: eventData.event,
        data: eventData.data
    }).save();

    async.waterfall([
        async.apply(processEvent, eventData)
    ], (err) => {
        if (err) {
            console.error('Error processing webhook event:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Webhook received successfully');
    });
});

app.listen(port, () => {
    console.log(`Webhook server listening at http://localhost:${port}/webhook`);
});
