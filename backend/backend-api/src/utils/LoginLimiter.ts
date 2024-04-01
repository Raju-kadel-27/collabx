import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: '',
    standardHeaders: true,
    legacyHeaders: false,

    // handler: (err, req, res, next) => {

    // },

})