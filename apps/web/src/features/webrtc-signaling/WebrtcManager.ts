import { EventEmitter } from 'events';

interface SignalingMessage {
    type: string;
    data: any;
}

interface ChatMessage {
    userId: string;
    message: string;
}

interface VideoToggleEvent {
    userId: string;
    isVideoMuted: boolean;
}

class RealTimeCommunicationManager extends EventEmitter {
    constructor() {
        super();
    }

    handleSignalingMessage(message: SignalingMessage): void {
        try {
            this.emit('signaling-message', message);
        } catch (error) {
            this.emitError('signaling-error', error);
        }
    }

    toggleLocalVideo(userId: string, isVideoMuted: boolean): void {
        try {
            this.emit('video-toggled', { userId, isVideoMuted });
        } catch (error) {
            this.emitError('video-toggle-error', error);
        }
    }

    sendChatMessage(userId: string, message: string): void {
        try {
            this.emit('message-sent', { userId, message });
        } catch (error) {
            this.emitError('chat-error', error);
        }
    }

    private emitError(eventName: string, error: Error): void {
        console.error(`Error in ${eventName}: ${error.message}`);
        this.emit('error', { eventName, error });
    }
}

// Example usage:
const rtcManager = new RealTimeCommunicationManager();

// Add event listeners
rtcManager.on('signaling-message', (message: SignalingMessage) => {
    console.log('Received signaling message:', message);
});

rtcManager.on('video-toggled', ({ userId, isVideoMuted }: VideoToggleEvent) => {
    console.log(`User ${userId} ${isVideoMuted ? 'muted' : 'unmuted'} their video.`);
});

rtcManager.on('message-sent', ({ userId, message }: ChatMessage) => {
    console.log(`User ${userId} sent a message: ${message}`);
});

rtcManager.on('error', ({ eventName, error }) => {
    console.error(`Error in ${eventName}: ${error.message}`);
});

// Simulate receiving a signaling message
const receivedSignalingMessage: SignalingMessage = { type: 'offer', data: '...' };
rtcManager.handleSignalingMessage(receivedSignalingMessage);

// Simulate toggling local video
rtcManager.toggleLocalVideo('localUser123', true);

// Simulate sending a chat message
rtcManager.sendChatMessage('localUser123', 'Hello, there!');
