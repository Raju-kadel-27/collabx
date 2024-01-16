import './style.css';
import { useEffect, useRef } from 'react';
// import { getSocket } from '../../../../shared/helpers/Socket';

export const Canvas = ({ color, size }:any) => {
    // const socket = getSocket()
    var timeout = null
    let isDrawing = false;
    const ctxRef = useRef(null)

    useEffect(() => {

        // socket.on("canvas-data", function (data) {
        //     var interval = setInterval(function () {
        //         if (isDrawing) return;
        //         isDrawing = true;
        //         clearInterval(interval);
        //         var image = new Image();
        //         var canvas = document.querySelector('#board');
        //         var ctx = canvas.getContext('2d');
        //         image.onload = function () {
        //             ctx.drawImage(image, 0, 0);
        //             isDrawing = false;
        //         };
        //         image.src = data;
        //     }, 200)
        // })

        return () => {
            // socket.off('canvas-data')
        }
    }, [])

    useEffect(() => {
        if (ctxRef.current) {
            console.log('Ran inside ctx')
            ctxRef.current.strokeStyle = color
            ctxRef.current.lineWidth = size
        }
    }, [color, size])

    useEffect(() => {

        const drawOnCanvas = () => {
            var canvas = document.querySelector('#board');
            ctxRef.current = canvas.getContext('2d');
            var ctx = ctxRef.current

            var sketch = document.querySelector('#sketch');
            var sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

            var mouse = { x: 0, y: 0 };
            var last_mouse = { x: 0, y: 0 };

            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - e.currentTarget.offsetLeft
                mouse.y = e.pageY - e.currentTarget.offsetTop;
            }, false);

            /* Drawing on Paint App */
            ctx.lineWidth = size;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = color;

            canvas.addEventListener('mousedown', function (e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false);

            var onPaint = function () {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();

                if (timeout != undefined) clearTimeout(timeout);
                timeout = setTimeout(function () {
                    var base64ImageData = canvas.toDataURL("image/png");
                    socket.emit("canvas-data", base64ImageData);
                }, 1000)
            };
        }
        
        drawOnCanvas()
    }, [])

    return (
        <div
            style={{ height: '100vh' }}
            className=" w-screen bg-white overflow-hidden" id="sketch">
            <canvas
                style={{ height: '100%' }}
                className=" w-full" id="board"></canvas>
        </div>
    )
}
