import jwt from 'jsonwebtoken';
import { AccessToken, RefreshToken } from '../types/auth';

//@roles are stored in database during user registration
export const generateAccessToken = (payload: AccessToken) => {
    const { id, userName, roles } = payload
    return jwt
        .sign(
            {
                "userInfo": {
                    id,
                    userName,
                    roles
                }
            },
            process.env.JWT_ACCESS_TOKEN_SECRET || 'secret_key_deep_RSA-879-GSA__89',
            { expiresIn: '2m' }
        )
}

export const generateRefreshToken = (payload: RefreshToken) => {
    const { id, userName, roles } = payload;
    return jwt
        .sign(
            {
                "userInfo": {
                    id,
                    userName,
                    roles
                }
            },
            process.env.JWT_REFRESH_TOKEN_SECRET || 'secret_key_deep_RSA-879-GSA__89',
            { expiresIn: '1d' }
        )
}
