import { apiSlice } from "@/app/api/apiSlice";

export const TeamApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllTeamsByUserId: builder.query({
            query: () => ({
                url: `/api/team/getall`,
                method: 'GET',
            }),

            providesTags: (_result: any, _error: any, _arg: any) => {
                return [{
                    type: 'TeamWithChannels',
                    id: 'LIST'
                }]
            }
        }),

        createChannel: builder.mutation({
            query: (payload: any) => ({
                url: '/api/channel/create',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result: any, error: any, arg: any) => [
                {
                    type: 'TeamWithChannels',
                    id: 'LIST'
                }],
        }),

        getAllTeamMembers: builder.query({
            query: ({ teamId }: { teamId: string; }) => ({
                url: `/api/team/${teamId}/members`,
                method: 'GET',
            })
        }),

        createTeam: builder.mutation({
            query: (payload) => ({
                url: '/api/team/create',
                method: 'POST',
                body: payload
            })
        }),

        updateTeamName: builder.mutation({
            query: (payload) => ({
                url: `/api/team/update/name`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                    // dispatch(handleUser(data));

                } catch (error) {
                    console.log(error)
                }
            }
        }),

        addTeamMember: builder.mutation({
            query: (payload) => ({
                url: '/api/team/add/member',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

                    // dispatch(handleChats(data))

                } catch (error) {
                    console.log(error)
                }
            }
        }),

        removeTeamMember: builder.mutation({
            query: (payload) => ({
                url: '/api/team/remove/member',
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

        addTeamOwner: builder.mutation({
            query: (payload) => ({
                url: '/api/team/add/owner',
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

        removeTeamOwner: builder.mutation({
            query: (payload) => ({
                url: '/api/team/remove/owner',
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

        addChannel: builder.mutation({
            query: (payload) => ({
                url: '/add/channel/:teamId',
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

        removeChannel: builder.mutation({
            query: (payload) => ({
                url: '/api/team/remove/channel',
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

        deleteTeam: builder.mutation({
            query: () => ({
                url: '/api/team/delete',
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
});

export const {
    useGetAllTeamsByUserIdQuery,
    useGetAllTeamMembersQuery,
    useCreateTeamMutation,
    useCreateChannelMutation,
    useUpdateTeamNameMutation,
    useAddTeamMemberMutation,
    useAddChannelMutation,
    useRemoveChannelMutation,
    useRemoveTeamMemberMutation,
    useDeleteTeamMutation
} = TeamApiSlice;