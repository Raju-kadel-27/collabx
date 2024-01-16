import { apiSlice } from "@/app/api/apiSlice";

export const PostApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder: any) => ({

        getAllPosts: builder.query({
            query: ({ channelId }: { channelId: string }) => ({
                url: `api/posts/getall/${channelId}`,
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


        createPost: builder.mutation({
            query: (payload: any) => ({
                url: '/api/posts/create',
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


        updatePost: builder.mutation({
            query: (payload: any) => ({
                url: `/api/posts/update/${payload.postId}`,
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


        deletePost: builder.mutation({
            query: (postId:string) => ({
                url: `/api/posts/delete/${postId}`,
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

        increamentPostReaction: builder.mutation({
            query: (payload:any) => ({
                url: `/api/posts/increament/reaction/${payload.postId}`,
                method: 'POST',
                body:payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })
                } catch (error) {
                    console.log({ error })
                }
            }
        }),

        decreamentPostReaction: builder.mutation({
            query: (payload:any) => ({
                url: `/api/posts/decreament/reaction/${payload.postId}`,
                method: 'POST',
                body: payload

            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled();
                    console.log({ data })
                } catch (error) {
                    console.log({ error })
                }
            }
        }),

        addPostReplies: builder.mutation({
            query: (payload:any) => ({
                url: `/api/posts/add/reply/${payload.postId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled();
                    console.log({ data })
                } catch (error) {
                    console.log({ error })
                }
            }
        }),

        updatePostReplies: builder.mutation({
            query: (payload:any) => ({
                url: `/api/posts/update/reply/${payload.postId}`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled();
                    console.log({ data })
                } catch (error) {
                    console.log({ error })
                }
            }
        }),

        deletePostReplies: builder.mutation({
            query: (postId: string) => ({

                url: `/api/posts/delete/reply/${postId}`,
                method: 'POST'
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled();
                    console.log({ data })
                } catch (error) {
                    console.log({ error })
                }
            }
        }),
    })
});


export const {

    useGetAllPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useIncreamentPostReactionMutation,
    useDecreamentPostReactionMutation,
    useAddPostRepliesMutation,
    useUpdatePostRepliesMutation,
    useDeletePostRepliesMutation

} = PostApiSlice