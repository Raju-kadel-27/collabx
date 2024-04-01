import Container from "typedi"
import config from "../../config"
import { Logger } from "winston"

import jwt from 'jsonwebtoken';

// null | {userName:string; email:string; _id:string}

export const verifyRawJWT = (token: string) => {
    console.log({ token });
    if (!token) return;
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            config.accessTokenSecret,
            (err: any, decoded: any) => {
                if (err) {
                    console.log(err);
                    reject()
                    return null
                }
                if (decoded.userId
                    && decoded.email
                    && decoded.roles.length) {
                    resolve(true);
                }
            }
        )
    })


}

export const verifyJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    // Some browsers alter headers (this may handle the edge cases)
    const isToken =
        (authHeader && authHeader.split(' ')[0] === 'Bearer') ||
        (authHeader && authHeader.split(' ')[0] === 'Token')
    if (!isToken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        config.accessTokenSecret,
        (err: any, decoded: any) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const logger = Container.get<Logger>('logger');
            logger.info({ decoded });
            req.userId = decoded.userId
            req.userName = decoded.userName
            req.email = decoded.email
            req.roles = decoded.roles
            next()
        }
    )
}



