// import { importSPKI, jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';
// import { AUTH_JWT_PUBLIC_KEY } from '../config'

const alg = "RS256";
let config = {
    accessTokenSecret: 'this_is_jwt_secret_key-access-token'
}

// export const extractUserId = async (jwt: string): Promise<string | null> => {

//     if (jwt) {

//         const publicKey = await importSPKI(AUTH_JWT_PUBLIC_KEY, alg);
//         const payloadRes = await jwtVerify(jwt, publicKey, {
//             issuer: "@raju-kadel-*",
//             audience: '!visualUsers#'
//         })
//         console.log({ payloadRes });
//         if (payloadRes.payload.sub) {
//             return payloadRes.payload.sub as string;
//         } else {
//             return null;
//         }

//     } else {
//         return null;
//     }
// }



export const extractUserId = (token: string) => {
    if (!token) return;

    return new Promise((resolve,reject) => {
        jwt.verify(
            token,
            config.accessTokenSecret,
            (err: any, decoded: any) => {
                if (err) {
                    console.log(err)
                    reject()
                    return null
                }
                console.log({ decoded }, 'from backend-ws')
                console.log(decoded.userId)
                resolve(decoded.userId)
            }
        )
    }
    )
}