const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const dotenv = require('dotenv');

dotenv.config()
dotenv.config();

console.log('documenting code from here...')

console.log('server listening on server side code');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load VAPID keys from environment variables
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
    'mailto:your@email.com', // Replace with your contact email
    publicVapidKey,
    privateVapidKey
);

const subscriptionsFilePath = path.join(__dirname, 'subscriptions.json');

async function saveSubscriptions(subscriptions) {
    try {
        const data = JSON.stringify(subscriptions, null, 2);
        await fs.writeFile(subscriptionsFilePath, data, 'utf-8');
    } catch (error) {
        console.error('Error saving subscriptions:', error);
    }
}

async function loadSubscriptions() {
    try {
        const data = await fs.readFile(subscriptionsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading subscriptions:', error);
        return [];
    }
}

app.post('/subscribe', async (req, res) => {
    // Implement authentication mechanism if needed

    const subscription = req.body;
    const subscriptions = await loadSubscriptions();

    subscriptions.push(subscription);
    await saveSubscriptions(subscriptions);

    res.status(201).json({ message: 'Subscription successful' });
});

app.post('/send-notification', async (req, res) => {
    // Implement authentication mechanism if needed

    const { title, body, href, image } = req.body;

    const notificationPayload = JSON.stringify({
        title,
        body,
        href,
        image,
    });

    const subscriptions = await loadSubscriptions();

    await Promise.all(
        subscriptions.map(async (subscription) => {
            try {
                await webpush.sendNotification(subscription, notificationPayload);
            } catch (error) {
                console.error('Error sending notification:', error);
                // Optionally, remove invalid subscriptions
                if (error.statusCode === 410 && error.body.includes('unsubscribed')) {
                    const index = subscriptions.findIndex((s) => s.endpoint === subscription.endpoint);
                    if (index !== -1) {
                        subscriptions.splice(index, 1);
                        await saveSubscriptions(subscriptions);
                    }
                }
            }
        })
    );

    res.status(200).json({ message: 'Notifications sent successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
