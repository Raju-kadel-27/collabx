import express, { Request, Response } from 'express';
import client from 'prom-client';
import config from './config';
import responseTime from 'response-time';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register }); 

const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "This tells how much time is taken by req and res",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 700]
})

const totalRequestCounter = new client.Counter({
    name: "total_req",
    help: "Tells total req"
})

const app = express();

app.use(responseTime((
    req: Request,
    res: Response,
    time: any
) => {
    totalRequestCounter.inc()
    reqResTime.labels({
        method: req.method,
        route: req.route,
        status_code: res.statusCode
    }).observe(time)
}))


app.get('/', (
    req: Request,
    res: Response
) => {
    console.log('called home route');
    setTimeout(() => {
        res.status(200).json({
            message: "Hello world",
            status: 200
        })
    }, Math.random() * 2000)
})

app.get('/posts', (
    req: Request,
    res: Response
) => {
    console.log('called home route');
    setTimeout(() => {
        res.status(200).json({
            message: "Hello world",
            status: 200
        })
    }, Math.random() * 2000)
})
app.get('/profile', (
    req: Request,
    res: Response
) => {
    console.log('called home route');
    setTimeout(() => {
        res.status(200).json({
            message: "Hello world",
            status: 200
        })
    }, Math.random() * 2000)
})

app.get('/metrics', async (
    req: Request,
    res: Response
) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics()
    res.send(metrics);
})


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

