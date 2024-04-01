// PushNotificationButtons.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PushNotificationButtons = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const handleSubscribe = async () => {
      try {
        const registration = await navigator.serviceWorker.register('service-worker.js');
        const pushSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
        });

        setSubscription(pushSubscription);

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/subscribe`, pushSubscription);
        alert('Subscription successful!');
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    };

    const handleSendNotification = async () => {
      try {
        if (!subscription) {
          alert('You need to subscribe first.');
          return;
        }

        const title = 'Hello';
        const body = 'This is a push notification!';
        const href = 'https://example.com';
        const image = 'https://example.com/image.jpg';

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/send-notification`, {
          title,
          body,
          href,
          image,
        });
        alert('Notification sent successfully!');
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    };

    return () => {
      // Clean up if needed
    };
  }, [subscription]);

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
};

export default PushNotificationButtons;
