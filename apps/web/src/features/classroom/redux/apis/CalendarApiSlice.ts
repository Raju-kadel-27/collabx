import { apiSlice } from "../../app/api/apiSlice";
import { handleChats, handleUser } from "./chatSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        accessChat: builder.mutation({
            query: userId => ({
                url: '/chat/accesschat',
                method: 'POST',
                body: userId
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    dispatch(handleUser(data));

                } catch (error) {
                    console.log(error)
                }
            }
        }),

        fetchChat: builder.query({
            query: () => ({
                url: '/chat/fetchchat',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    dispatch(handleChats(data))

                } catch (error) {
                    console.log(error)
                }
            }
        }),

      
        createGroupChats: builder.mutation({
            query: (userId) => ({
                url: '/chat/group',
                method: 'POST',
                body: userId
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        addToGroup: builder.mutation({
            query: userId => ({
                url: '/chat/groupadd',
                method: 'PUT',
                body: userId
            })
        }),

        renameGroup: builder.mutation({
            query: userId => ({
                url: '/chat/rename',
                method: 'PUT',
                body: userId
            })
        }),

        removeGroup: builder.mutation({
            query: userId => ({
                url: '/chat/groupremove',
                method: 'PUT',
                body: userId
            })
        }),

    })
})