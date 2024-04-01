self.addEventListener('push', (event) => {
    try {
      const payload = event.data.json();
  
      // Validate and sanitize the payload
      const validatedPayload = validateAndSanitizePayload(payload);
  
      // Authenticate the push event
      authenticatePushEvent(event);
  
      // Rate limiting logic (Example: Allow displaying only one notification per minute)
      rateLimitNotifications(1, 60);
  
      const options = {
        body: validatedPayload.body,
        icon: validatedPayload.icon || 'path/to/default-icon.png',
        // Add other options as needed
      };
  
      event.waitUntil(
        self.registration.showNotification('Push Notification', options)
      );
    } catch (error) {
      console.error('Error processing push event:', error);
    }
  });
  
  function validateAndSanitizePayload(payload) {
    // Placeholder for payload validation and sanitization logic
    // Implement your specific validation and sanitization based on the structure and content of your push notifications
    // For example, ensure that the body is a non-empty string, sanitize HTML, etc.
  
    return {
      body: sanitize(payload.body),
      icon: sanitize(payload.icon),
      // Add other sanitized fields
    };
  }
  
  function authenticatePushEvent(event) {
    // Placeholder for authentication logic
    // Verify if the push event comes from a trusted source
    // Example: Check if the event's origin matches the expected server origin
  
    // For demonstration purposes, assume a valid origin is 'https://example.com'
    const expectedOrigin = 'https://example.com';
    const eventOrigin = event.currentTarget.location.origin;
  
    if (eventOrigin !== expectedOrigin) {
      throw new Error('Unauthorized push event: Invalid origin');
    }
  }
  
  function rateLimitNotifications(maxNotifications, timeWindowInSeconds) {
    // Placeholder for rate limiting logic
    // Control the rate at which notifications are displayed to prevent abuse or flooding
    // Example: Track the number of notifications displayed within the time window using IndexedDB or other storage mechanisms
    // Only allow displaying notifications if the limit is not exceeded
  
    const notificationsKey = 'notificationsCount';
    const currentTime = Math.floor(Date.now() / 1000);
    const storage = self.indexedDB.open('pushNotificationsDB');
  
    storage.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['notificationsStore'], 'readwrite');
      const store = transaction.objectStore('notificationsStore');
  
      const getRequest = store.get(notificationsKey
  