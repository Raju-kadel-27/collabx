import { useState } from "react";
import { Canvas } from './Canvas';

export const CanvasContainer = () => {
    const [colour, setColour] = useState('')
    const [size, setSize] = useState('')
    const [isEraser, setIsEraser] = useState('')

    const handleColour = (e:any) => {
        setColour(e.target.value)
    }

    const handleSize = (e:any) => {
        setSize(e.target.value)
    }

    const handleEraser = (e:any) => {
        if (isEraser) {
            setColour('rgb(0 0 0)')
            setIsEraser('')
        }
        else {
            setColour('rgb(248 250 252)')
            setIsEraser('ON')
        }
    }

    return (
        <div
            style={{
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: 'white'
            }}
            className="container h-[95vh]  z-50 absolute top-0 left-0">

            <div
                className="tools-section z-50 absolute top-0 border-2 border-black my-2 w-fit px-3 py-2">
                <div className="color-picker-container">
                    <span className='p-2'>Brush Color : &nbsp;</span>
                    <input className='w-10' type="color" value={colour} onChange={handleColour} />
                </div>

                <div onClick={handleEraser} className="bg-slate-50 w-fit rounded-lg p-2 hover:cursor-pointer color-picker-container">
                    Eraser : {isEraser ? 'On' : 'Off'}
                </div>

                <div className="brushsize-container">
                     Brush Size : &nbsp;
                    <select style={{border:'1px',borderColor:'gray'}} value={size} onChange={handleSize}>
                        <option> 5 </option>
                        <option> 10 </option>
                        <option> 15 </option>
                        <option> 20 </option>
                        <option> 25 </option>
                        <option> 30 </option>
                    </select>
                </div>

            </div>

            <div className="board-container ">
                <Canvas
                    style={{ height: '100%' }}
                    color={colour} size={size}></Canvas>
            </div>
        </div>
    )
}
