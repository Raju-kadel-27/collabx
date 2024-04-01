import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5001';

// TODO: Consider namespaces in future
/*
    TODO: Authentication of clients on server using socket.handshake.query
        const socket = io('http://localhost:8080', {
            query: {
            username: 'user1',
            password: 'password1',
            },
        });
*/
const options = {
    ['force new connection']: true,
    reconnectionAttempts: 'Infinity',
    timeOut: 10_000,
    transports: ['websocket'],
};

let socketInstance:any = null;

export const initializeSocket = () => {
    if (!socketInstance) {
        socketInstance = io(SOCKET_SERVER_URL, options);
        console.log({ socketInstance })
    }
};

export const getSocket = () => {
    if (!socketInstance) {
        throw new Error('Socket instance is not initialized. Call initializeSocket() first.');
        // socketInstance=initializeSocket();
    }
    return socketInstance;
};






















