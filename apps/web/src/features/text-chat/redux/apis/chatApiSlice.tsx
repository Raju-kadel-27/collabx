import { apiSlice } from "../../../../../src/app/api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        
        fetchAllUsers: builder.query({
            query: () => ({
                url: '/api/chats/fetchallusers',
                method: 'GET',
            })
           
        }),

        fetchAllChats: builder.query({
            query: (payload) => ({
                url: '/api/chats/fetchchats',
                method: 'POST',
                body: payload
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        accessChat: builder.mutation({
            query: payload => ({
                url: '/api/chats/accesschat',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        createGroupChat: builder.mutation({
            query: (payload) => ({
                url: '/api/chats/creategroup',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                } catch (error) {
                    console.log(error)
                }
            }
        }),


        // {
        //     "chatId": "658da95e75647b4ec4da72a1" ,
        //     "chatName": "LoveBirdsXX"
        //   }

        // Renaming group-name-by-all-users
        // fetching all the users-count-by-all-users

        // GET Routes@@ 
        // @Params /biild/getallusers
        renameGroupName: builder.mutation({
            query: (payload) => ({
                url: '/api/chats/renamegroup',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        // @@ params Fetchallusers
        // @ Route Fetch and activate GET @Routes
        deleteGroup: builder.mutation({
            query: (payload) => ({
                url: '/api/chats/deletegroup',
                method: 'POST',
                body: payload
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        // @@ params AddUserToGroup
        // @ Route Fetch and activate POST @Routes

        addUserToGroup: builder.mutation({
            query: (payload) => ({
                url: '/api/chats/adduser',
                method: 'PUT',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {

                    const data = await queryFulfilled;

                    console.log({ data })

                } catch (error) {
                    console.log(error)
                }
            }
        }),

        removeUserFromGroup: builder.mutation({
            query: (payload) => ({
                url: '/api/chats/removeuser',
                method: 'PUT',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data }, 'removeUser')
                } catch (error) {
                    console.log(error)
                }
            }
        }),

    })
})


// These are all the hooks from useQuery
export const {
    useFetchAllUsersQuery,
    useAccessChatMutation,
    useFetchAllChatsQuery,
    useAddUserToGroupMutation,
    useCreateGroupChatMutation,
    useDeleteGroupMutation,
    useRemoveUserFromGroupMutation,
} = chatApiSlice