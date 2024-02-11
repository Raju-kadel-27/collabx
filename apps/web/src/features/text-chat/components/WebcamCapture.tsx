import React, { useState } from 'react';
import Webcam from 'react-webcam';

export const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imagee, set] = useState(null)

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        set(imageSrc)
    };

    return (
        <div className='w-full justify-between h-fit'>
            <div className='w-full flex justify-start h-fit'>
                <Webcam
                    height={'350px'}
                    width={'350px'}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg" // You can specify the format
                />
                <button className='bg-pink-400 text-white' onClick={capture}>Capture Photo</button>
            </div>
            {
                imagee
                &&
                (
                    <div className='w-full flex justify-start h-fit'>
                        <img src={imagee} />
                        <button className='bg-green-600 text-white w-full' onClick={capture}>Accept</button>
                    </div>
                )
            }


        </div>
    )
}
