import { useEffect, useRef, useState } from 'react';

const useWebcamCapture = () => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const getMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        getMediaStream();

    }, []);

    const capture = () => {
        console.log('called00')

        if (webcamRef.current) {

            console.log('called')
            const image = webcamRef.current.getScreenshot();
            setImageSrc(image);
        }
    };

    return { webcamRef, capture, imageSrc };
};

export default useWebcamCapture;
