import { useState, useEffect } from 'react';
export const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    localStorage.setItem('persist', true)

    useEffect(() => {
        // localStorage.setItem('persist', persist)
    }, [persist, setPersist])

    return [persist , setPersist]
}