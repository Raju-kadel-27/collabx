const rateLimit = require('express-rate-limit')
import { Logger } from "../loaders/logger"

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` per minute
    message:
        { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
    handler: (req: any, res: any, next: any, options: any) => {
        Logger
            .warn(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`)
        res.status(options.statusCode).send(options.message)
    },
    // Return rate limit info in the `RateLimit-*` headers
    standardHeaders: true,
    // Disable the `X-RateLimit-*` headers
    legacyHeaders: false,
})

