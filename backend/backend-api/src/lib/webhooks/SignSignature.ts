import config from "../../config";
const crypto = require('crypto');

function signPayload(
    payload: object,
    secretKey: string
) {
    const hmac = crypto.createHmac('sha256', secretKey);
    const signature = hmac.update(JSON.stringify(payload)).digest('hex');
    return signature;
}

const payloadData = {
    transactionId: '123456',
    amount: 50.00,
    customer: 'John Doe'
};

const signature = signPayload(
    payloadData,
    config.webhookSecretKey
);

const requestOptions = {
    method: 'POST',
    headers: {
        'X-Signature': signature,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payloadData)
};

// This is my webhook-endpoint
fetch('https://your-webhook-endpoint.com/webhook', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
