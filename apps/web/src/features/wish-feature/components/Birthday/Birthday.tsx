import React, { useEffect } from 'react'
import myAudioFile from "./birthday_song.mp3"
import Lottie from "lottie-react";
import animation4 from "../../animations/animation_4.json";
import birthday_1 from "../../animations/birthday_1.json"
import birthday_2 from "../../animations/birthday_2.json"
import birthday_3 from "../../animations/birthday_4.json"
import birthday_text from "../../animations/birthday_text.json"
import { useDispatch } from 'react-redux';
import { handleWishReceived } from '../../../video-chat/mesh-topology/redux/slices/BottomScreenController';

const animation44 = <Lottie animationData={animation4} loop={true} />
const birthday_11 = <Lottie animationData={birthday_1} loop={true} />
const birthday_22 = <Lottie animationData={birthday_2} loop={true} />
const birthday_33 = <Lottie animationData={birthday_3} loop={true} />
const birthday_text_11 = <Lottie animationData={birthday_text} loop={true} />

export const Birthday = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(handleWishReceived())
        }, 6000);
    }, [])

    useEffect(() => {
        const audioElement = document.getElementById('audioElement');
        if (audioElement && audioElement.paused) {
            audioElement.play();
        }
    }, []);

    return (
        <div>

            <div className='hidden'>
                <audio loop id="audioElement" controls autoPlay style={{ display: 'none' }}>
                    <source src={myAudioFile} type="audio/mpeg" />
                </audio>
            </div>

            <div >
                <div className='absolute h-80 w-96 left-64 top-[60vh]'>
                    {animation44}
                </div>
                <div className='absolute h-80 w-96 left-64 top-[60vh]'>
                    {animation44}
                </div>

                <div className='absolute h-92 w-96 left-[51vw] top-80'>
                    {birthday_text_11}
                </div>
                <div className='absolute h-92 w-96 left-[41vw] top-96'>
                    {birthday_11}
                </div>

                <div className='absolute rotate-90 h-80 w-96 left-[5vw] top-92'>
                    {birthday_33}
                </div>
                <div className='absolute rotate-180 h-80 w-96 right-[5vw] top-92'>
                    {birthday_33}
                </div>
                <div className='absolute h-80 w-96  left-[36vw] top-50'>
                    {birthday_22}
                </div>
            </div>
        </div>
    )
}