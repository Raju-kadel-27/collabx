import { apiSlice } from "../../../../../src/app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        searchUser: builder.query({
            query: () => ({
                url: '/api/user/search',
                method: 'GET',
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    console.log({arg})

                    const data = await queryFulfilled;
                    console.log({ data }, 'searchAllUsers');

                } catch (error) {
                    console.log(error);
                }
            }
        }),

    })
})