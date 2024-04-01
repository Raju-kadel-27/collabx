import express from 'express';
import type { Request, Response } from 'express';
import uuidV4 from 'uuidv4';
const app = express();
PushManager =()=>{
    try {
       console.log('managing notification-here') ;
    } catch (error) {
            console.log(error)
    }
}
const handleNotification = () => {
    console.log('Handling notification');
    console.log(uuidV4)
}
app.get('/', (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).send('Sending heartbeat okay')
    } catch (error) {
        console.log(error)
    }
})
app.listen('2000', (e) => {
    console.log(e)
})
app.on('unhandled-rejection', () => {
    console.log('Handling unhandled-rejection type')
})

