import { apiSlice } from "@/app/api/apiSlice";
import { logOut, storeAccessToken } from "../slices/userSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        register: builder.mutation({
            query: (userDetails) => ({
                url: '/api/auth/register',
                method: 'POST',
                body: { ...userDetails }
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1200)

                } catch (error) {
                    console.log({ error })
                }
            }
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET',
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: { accessToken } } = await queryFulfilled;
                    dispatch(storeAccessToken({ accessToken }))

                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshTokenMutation
} = authApiSlice;