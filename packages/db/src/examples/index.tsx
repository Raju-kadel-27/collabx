import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState('');

  useEffect(() => {
    // Load chat history from IndexedDB when the component mounts
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const db = await openDB('ChatAppDatabase', 1, {
        upgrade(db) {
          // Create or upgrade the database schema
          if (!db.objectStoreNames.contains('messages')) {
            const messagesStore = db.createObjectStore('messages', { keyPath: 'messageId' });
            messagesStore.createIndex('roomIndex', 'room');
          }
        },
      });

      const transaction = db.transaction('messages', 'readonly');
      const messagesStore = transaction.objectStore('messages');
      const messages = await messagesStore.getAll();
      setMessages(messages);

      // Close the database connection
      await transaction.done;
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const newMessage: Message = {
        messageId: Date.now().toString(),
        room: 'general', // Assuming a general chat room
        sender: 'user123',
        content: newMessageContent,
        timestamp: new Date().toISOString(),
      };

      const db = await openDB('ChatAppDatabase', 1);
      const transaction = db.transaction('messages', 'readwrite');
      const messagesStore = transaction.objectStore('messages');
      await messagesStore.add(newMessage);

      // Update the state to reflect the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the input field
      setNewMessageContent('');

      // Close the database connection
      await transaction.done;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSendMessage = () => {
    // Validate that the message content is not empty
    if (newMessageContent.trim() !== '') {
      sendMessage();
    }
  };

  return (
    <div>
      <div>
        <h2>Chat History</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.messageId}>
              <strong>{message.sender}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatApp;

// Define the Message type
interface Message {
  messageId: string;
  room: string;
  sender: string;
  content: string;
  timestamp: string;
}
