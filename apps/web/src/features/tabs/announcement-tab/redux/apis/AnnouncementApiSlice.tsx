import { apiSlice } from "@/app/api/apiSlice";

export const AnnouncementApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder: any) => ({

        getAllAnnouncement: builder.mutation({
            query: ({ channelId }: { channelId: string }) => ({
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
            }
        }),

        createAnnouncement: builder.mutation({
            query: (payload: any) => ({
                url: '/api/announcement/create',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

                    // dispatch(handleUser(data));

                } catch (error) {
                    console.log(error)
                }
            }
        }),

        updateAnnouncement: builder.mutation({
            query: (payload: any) => ({
                url: '/api/announcement/update',
                method: 'POST',
                body: payload
            }),
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
            query: () => ({
                url: '/api/announcement/delete/:announcementId',
                method: 'POST',
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

    })
});


export const {
    useDeleteAnnouncementMutation,
    useGetAllAnnouncementQuery,
    useCreateAnnouncementMutation,
    useUpdateAnnouncementMutation
} = AnnouncementApiSlice