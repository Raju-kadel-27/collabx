import { useState, useEffect } from 'react'

export default function useWindowSize() {
    const isClient = typeof window === 'object';
    function getSize() {
        return {
            height: isClient ? window.innerHeight : undefined,
            width: isClient ? window.innerWidth : undefined
        }
    }
    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) return false;
        function handleSize() {
            return getSize()
        }
        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize');
    }, [])

    return windowSize;
}