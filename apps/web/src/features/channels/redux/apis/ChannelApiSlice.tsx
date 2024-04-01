import { apiSlice } from "@/app/api/apiSlice";
// import { handleChats, handleUser } from "./chatSlice";

console.log("Members channels");

export const channelApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        // createChannel: builder.mutation({
        //     query: (payload: any) => ({
        //         url: '/api/channel/create',
        //         method: 'POST',
        //         body: payload
        //     }),
        //     invalidatesTags: (result: any, error: any, arg: any) => [
        //         {
        //             type: 'TeamWithChannels',
        //             id: 'LIST'
        //         }],
        // }),

        updateChannelName: builder.mutation({
            query: (payload: any) => ({
                url: `/update/channelname/${payload.channelId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    // console.log({ data })
                    // dispatch(handleUser(data));

                } catch (error) {
                    console.log(error)
                }
            }
        }),


        addChannelAdmin: builder.mutation({
            query: (payload: any) => ({
                url: `/add/admin/${payload.channelId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

                    // dispatch(handleChats(data))

                } catch (error) {
                    console.log(error)
                }
            }
        }),


        removeChannelAdmin: builder.mutation({
            query: (payload: any) => ({
                url: `/remove/admin/${payload.channelId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

                } catch (error) {
                    console.log(error)
                }
            }
        }),


        addChannelMember: builder.mutation({
            query: (payload: any) => ({
                url: `/add/member/${payload.channelId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

                } catch (error) {
                    console.log(error)
                }
            }
        }),


        removeChannelMember: builder.mutation({
            query: (payload: any) => ({
                url: `/remove/member/${payload.channelId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

                } catch (error) {
                    console.log(error)
                }
            }
        }),


        addChannel: builder.mutation({
            query: (payload) => ({
                url: '/api/team/add/channel',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    // console.log({ data })

                } catch (error) {
                    console.log(error)
                }
            }
        }),


        removeChannel: builder.mutation({
            query: (payload) => ({
                url: '/remove/tab/:channelId',
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


        deleteChannel: builder.mutation({
            query: (channelId: string) => ({
                url: `/delete/channel/${channelId}`,
                method: 'POST',
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

    })
})


export const {
    // useCreateChannelMutation,
    useUpdateChannelNameMutation,
    useAddChannelAdminMutation,
    useRemoveChannelAdminMutation,
    useAddChannelMemberMutation,
    useRemoveChannelMemberMutation,
    // useAddChannelTabMutation,
    // useRemoveChannelTabMutation,
    useDeleteChannelMutation
} = channelApiSlice;