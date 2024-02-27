import myAudioFile from "./clap.wav"
import Lottie from "lottie-react";
import animation1 from "../../animations/animation_1.json";
import animation4 from "../../animations/animation_4.json";
import congrats from "../../animations/congrats.json"

const animation11 = <Lottie animationData={animation1} loop={true} />
const animation44 = <Lottie animationData={animation4} loop={true} />
const congrats_11 = <Lottie animationData={congrats} loop={true} />

export const Congratulations = () => {

    return (
        <div >

            <div className='hidden'>
                <audio loop id="audioElement" controls autoPlay style={{ display: 'none' }}>
                    <source src={myAudioFile} type="audio/mpeg" />
                </audio>
            </div>
            <div className='absolute top-10  left-80 '>
                {animation11}
            </div>
            <div className='absolute top-10  right-80 '>
                {animation11}
            </div>

            <div className='absolute h-80 w-96 left-30 top-50'>
                {animation44}
            </div>
            <div className='absolute h-80 w-96 left-30 top-[60vh]'>
                {animation44}
            </div>
            <div className='absolute h-80 w-96  left-[36vw] top-50'>
                {animation44}
            </div>
            <div className='absolute h-40 w-[442px]  left-[28vw] top-60'>
                {congrats_11}
            </div>
            <div className='absolute h-80 w-96 left-[36vw] top-80'>
                {animation44}
            </div>
            <div className='absolute h-80 w-96 right-32 top-50'>
                {animation44}
            </div>
            <div className='absolute h-80 w-96 right-44 top-[60vh]'>
                {animation44}
            </div>

        </div>
    )
}
