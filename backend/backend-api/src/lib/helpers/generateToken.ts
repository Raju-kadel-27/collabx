import Container from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../../config';

interface User {
    _id: string;
    name: string;
    email: string;
    roles: string[];
}
export const formatUser = (user: any): User => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
    }
}

interface Decoded {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
}

export const generateToken = (user: User, jwtSecret: string, expInMin: number): string => {
    const expiresIn = Math.floor(Date.now() / 1000) + expInMin;
    return jwt.sign(
        {
            userId: user._id,
            userName: user.name,
            email: user.email,
            roles: ['Admin', 'User']
        },

        jwtSecret,
        { expiresIn }
    );
};


export const verifyJWT = async (refreshToken: string): Promise<{ accessToken: string }> => {

    return new Promise((resolve, reject) => {
        jwt.verify(
            refreshToken,
            config.refreshTokenSecret,
            async (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    reject(new Error('Forbidden'));
                    return;
                }
                try {
                    const userModel = Container.get<any>('userModel');
                    const foundUser = await userModel.findById(decoded?.userId).exec();
                    console.log({ foundUser });
                    if (!foundUser) {
                        reject(new Error('Unauthorized'));
                        return;
                    }

                    const formattedUser = formatUser(foundUser);
                    const accessToken = generateToken(formattedUser, config.accessTokenSecret, 2);
                    resolve({ accessToken });
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
}

