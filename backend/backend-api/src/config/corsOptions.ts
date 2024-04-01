import { allowedOrigins } from "./allowedOrigins"

export const corsOptions = {
    origin: (origin:any, callback:any) => {
        console.log({origin,callback})

        // !origin implies non-browser requests (from server maybe) or even postman testing
        if ( !origin || allowedOrigins.indexOf(origin) !== -1 ) {
            callback(null, true)
            console.log('allowed by cors')
        } else {
            callback(new Error('Not allowed by CORS'))
            console.log('not allowed by cors')

        }
    },
    // server allows credentials to be included in http requests from browser
    credentials: true,
    // provide 200 status code for preflight request
    optionsSuccessStatus: 200
}
