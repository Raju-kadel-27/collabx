import { storeAccessToken } from '@/features/authentication/redux/slices/userSlice';
import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react"
// import type { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        /**
         * Getting access token from authSlice
         */
        const accessToken = getState().root.user.user.accessToken;
        console.log({ accessToken }, 'adding accesstoken');
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
    /**
     *  console.log(args)  requestUrl,method,body
        console.log(api)   dispatch, getState()
     */
    let result = await baseQuery(args, api, extraOptions);
    // console.log({ result });

    if (result?.error?.status === 403) {
        /**
         * Access token expired.
         * Sending refresh token to get new access token.
         */
        const refreshResult: any = await baseQuery('/api/auth/refresh', api, extraOptions);
        if (refreshResult?.data) {
            /**
             * Store new access token to authSlice
             * Then,retry original request
             */
            // console.log(refreshResult?.data, 'access token fresh after rotation');
            const { accessToken } = refreshResult?.data
            api.dispatch(storeAccessToken({ accessToken }));
            result = await baseQuery(args, api, extraOptions);
        }
        else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired.";
            }

            return refreshResult;
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['team', 'channel'],
    endpoints: builder => ({})
})

