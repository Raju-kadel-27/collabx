import { apiSlice } from "@/app/api/apiSlice";

export const Slice = apiSlice.injectEndpoints({

    endpoints: (builder: any) => ({

        getAllAnnouncement: builder.query({

            query: (channelId: string) => ({
                url: `/api/announcement/getall/${channelId}`,
                method: 'GET',
            }),
            providesTags: (result: any, error: any, arg: any) => {
                console.log({ result, error, arg })
                return [{
                    type: 'Announcement',
                    id: 'LIST'
                }]
            }
        }),

        createAnnouncement: builder.mutation({

            query: (payload: any) => ({
                url: '/api/announcement/create',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result: any, error: any, arg: any) => [
                {
                    type: 'Announcement',
                    id: 'LIST'
                }
            ]
        }),

        updateAnnouncement: builder.mutation({
            query: (payload: any) => ({
                url: '/api/announcement/update',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Announcement', id: 'LIST' }
            ]
        }),

        deleteAnnouncement: builder.mutation({
            query: (announcementId: string) => ({
                url: `/api/announcement/delete/${announcementId}`,
                method: 'POST',
            }),
            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Announcement', id: 'LIST' }
            ]
        }),

    })
});

export const {
    useDeleteAnnouncementMutation,
    useGetAllAnnouncementQuery,
    useCreateAnnouncementMutation,
    useUpdateAnnouncementMutation
} = Slice;