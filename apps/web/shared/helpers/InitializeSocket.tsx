import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { initializeSocket } from './SocketInit';

const InitializeSocket = () => {
    const initializationRef = useRef(0);
    const [isInitialized, set] = useState(null);

    if (!isInitialized) {
        initializeSocket();
        initializationRef.current = 1
        set(1)
    }
    else {
        return <Outlet />
    }
}
export default InitializeSocket;



