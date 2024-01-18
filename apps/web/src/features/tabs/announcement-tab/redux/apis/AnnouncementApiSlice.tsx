import { apiSlice } from "@/app/api/apiSlice";

export const AnnouncementApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder: any) => ({

        getAllAnnouncement: builder.query({

            query: (channelId: string) => ({
                url: `/api/announcement/getall/${channelId}`,
                method: 'GET',
            }),

            async onQueryStarted(arg: unknown, { dispatch, queryFulfilled }: unknown) {
                try {
                    console.log({ arg })
                    console.log({ dispatch })
                    const data = await queryFulfilled;
                    console.log({ data })
                    // dispatch(handleUser(data));
                } catch (error) {
                    console.log(error)
                }
            },

            providesTags: (result: any, error: any, arg: any) => {
                console.log({ result, error, arg })
                return [{
                    type: 'Announcement',
                    id: 'LIST'
                }]
                //     if (result?.ids) {
                //         return [
                //             { type: 'User', id: 'LIST' },
                //             ...result.ids.map(id => ({ type: 'User', id }))
                //         ]
                //     } else return [{ type: 'User', id: 'LIST' }]
                // }
            }

        }),

        createAnnouncement: builder.mutation({

            query: (payload: any) => ({
                url: '/api/announcement/create',
                method: 'POST',
                body: payload
            }),

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Announcement', id: 'LIST' }
            ],
        }),

        updateAnnouncement: builder.mutation({
            query: (payload: any) => ({
                url: '/api/announcement/update',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Announcement', id: 'LIST' }
            ],
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                    // dispatch(handleUser(data));:any

                } catch (error) {
                    console.log(error)
                }
            }
        }),

        deleteAnnouncement: builder.mutation({
            query: (announcementId: string) => ({
                url: `/api/announcement/delete/${announcementId}`,
                method: 'POST',
            }),
            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Announcement', id: 'LIST' }
            ],
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
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
    useDeleteAnnouncementMutation,
    useGetAllAnnouncementQuery,
    useCreateAnnouncementMutation,
    useUpdateAnnouncementMutation
} = AnnouncementApiSlice;