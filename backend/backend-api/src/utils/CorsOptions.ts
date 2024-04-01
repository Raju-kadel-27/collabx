import allowedOrigins from "./AllowedOrigins"

export const corsOptions = {
    origin: (origin: string, callback: any) => {

        // !origin implies non-browser requests (maybe from server or even postman testing)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not Allowed By Cors'))
        }

    },
    // server allows credentials to be included in http requests from browser
    credentials: true,

    // provide 200 status code for preflight request from client
    optionsSuccessStatus: 200
}
