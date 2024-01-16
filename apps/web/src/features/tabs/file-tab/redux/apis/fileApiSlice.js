import { apiSlice } from "../../app/api/apiSlice";

export const TeamApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({


        createFolder: builder.mutation({
            query: (payload) => ({
                url: '/createfolder',
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


        getFolders: builder.mutation({
            query: (payload) => ({
                url: '/getfolders',
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



        addFile: builder.mutation({
            query: (payload) => ({
                url: '/addfile',
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



        updateFile: builder.mutation({
            query: (payload) => ({
                url: '/updateFile',
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



        updateFolderName: builder.mutation({
            query: (payload) => ({
                url: '/updatefoldername',
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

    })

});



export const {
    useCreateFolderMutation,
    useGetFoldersMutation,
    useAddFileMutation,
    useUpdateFileMutation,
    useUpdateFolderNameMutation,
} = TeamApiSlice;