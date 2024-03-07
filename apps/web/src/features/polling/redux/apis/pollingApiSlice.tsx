import { apiSlice } from "@/app/api/apiSlice";
import { FormatPayload } from "@/features/tabs/post-tab/utils/formatPayload";

interface GetAllPollsByChannel {
    channelId: string;
    limit: string;
    cursor: string;
};
interface CreatePoll {
    channelId: string;
    title: string;
    description: string;
    createdBy: string;
    tags: string[];
    comments: Comment[]
};
interface UpdatePoll {
    pollId: string;
    fieldsToUpdate: {
        title?: string;
        description?: string;
        createdBy?: string;
        tags?: string[];
        comments?: Comment[]
    }
};
interface DeletePoll {
    pollId: string;
};
interface CastVote {
    userId: string;
    pollId: string;
    optionId: string;
    votedAt: Date;

};
interface PostComment {
    pollId: string;
    content: string;
    commentedBy: string;
    createdAt: string;
};
interface UpdateComment {
    pollId: string;
    fieldsToUpdate: {
        content: string;
    }
};
interface DeleteComment {
    pollId: string;
    commentId: string;
};
interface AddTag {
    pollId: string;
    tagName: string;
};
interface RemoveTag {
    pollId: string;
    tagName: string;
};
interface GetPollMetadata {
    workerId: string;
    channelId: string;
    pollId: string;
    conceptEmitter: string;

};
interface GetOptionMetadataa {
    pollId: string;
    channelId: string;
};

// route.get('/get/:channelId', PollController.getPollsByChannelId);
// route.get('/pollstats', PollController.getPollStats)
// route.get('/pollmetadata', PollController.getPollMetadata)
// route.get('/option/metadata', PollController.getOptionMetadata)
// route.post('/create', PollController.createPoll);
// route.patch('/update', PollController.updatePoll);
// route.delete('/delete', PollController.deletePoll);

// route.post('/cast/vote', PollController.castVote);
// route.post('/post/comment', PollController.postComment);
// route.post('/update/comment', PollController.updateComment);
// route.post('/delete/comment', PollController.deleteComment);

export const TaskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getPollsByChannel: builder.query({
            query: ({ channelId, limit, cursor }: GetAllPollsByChannel) => ({
                url: `/api/polls/get/${channelId}?limit=${limit}&cursor=${cursor}`,
                method: 'GET',
            }),
            providesTags: (result: any, error: any, arg: any) => {
                console.log({ result, error, arg })
                return [{
                    type: 'POLL',
                    id: 'LIST'
                }]
            }
        }),

        getPollStats: builder.query({
            query: (payload: GetPollStats) => ({
                url: `/api/polls/pollstats`,
                method: 'GET',
            }),
            providesTags: (result: any, error: any, arg: any) => {
                console.log({ result, error, arg })
                return [{
                    type: 'POLL',
                    id: 'LIST'
                }]
            }
        }),

        getPollMetadata: builder.query({
            query: (payload: GetPollMetadata) => ({
                url: `/api/polls/pollmetadata`,
                method: 'GET',
            }),
            providesTags: (result: any, error: any, arg: any) => {
                console.log({ result, error, arg })
                return [{
                    type: 'POLL',
                    id: 'LIST'
                }]
            }
        }),

        getOptionMetadata: builder.query({
            query: (payload: GetOptionMetadata) => ({
                url: `/api/polls/option/metadata}`,
                method: 'GET',
            }),
            providesTags: (result: any, error: any, arg: any) => {
                console.log({ result, error, arg })
                return [{
                    type: 'POLL',
                    id: 'LIST'
                }]
            }
        }),

        castVote: builder.mutation({
            query: (payload: CastVote) => ({
                url: '/api/polls/cast/vote',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        createPoll: builder.mutation({
            query: (payload: CreatePoll) => ({
                url: '/api/polls/create',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        postComment: builder.mutation({
            query: (payload: PostComment) => ({
                url: '/api/polls/post/comment',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        updateComment: builder.mutation({
            query: (payload: UpdateComment) => ({
                url: '/api/polls/update/comment',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        deleteComment: builder.mutation({
            query: (payload: DeleteComment) => ({
                url: '/api/polls/delete/comment',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        updatePoll: builder.mutation({
            query: (payload: UpdatePoll) => ({
                url: `/api/tasks/update/${payload._id}`,
                method: 'POST',
                body: payload
            }),

            async onQueryStarted({ channelId, limit, cursor }: any, { dispatch, queryFulfilled }) {
                const patchedResult = dispatch(
                    TaskApiSlice
                        .util
                        .upsertQueryData('getAllTasks',
                            { channelId, limit, cursor },
                            (draft: any) => {
                                let serializedPayload = FormatPayload(newPost.data);
                                return [
                                    ...draft,
                                    serializedPayload
                                ]
                            })
                )
                try {

                    await queryFulfilled();

                } catch (error) {
                    await patchedResult.undo()
                    console.log({ error });
                }


            },

            // invalidatesTags: (result: any, error: any, arg: any) => [
            //     { type: 'Task', id: 'LIST' }
            // ],
        }),

        deletePoll: builder.mutation({
            query: (payload: DeletePoll) => ({
                url: `/api/polls/delete/${pollId}`,
                method: 'POST',
            }),

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        addTag: builder.mutation({
            query: (payload: AddTag) => ({
                url: '/api/polls/add/tag',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),

        removeTag: builder.mutation({
            query: (payload: RemoveTag) => ({
                url: '/api/polls/remove/tag',
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
            },

            invalidatesTags: (result: any, error: any, arg: any) => [
                { type: 'Task', id: 'LIST' }
            ],
        }),
    })
});

export const {
    useGetPollsByChannelQuery,
    useGetPollStatsQuery,
    useGetPollMetadataQuery,
    useGetOptionMetadataQuery,
    useCastVoteMutation,
    useCreatePollMutation,
    usePostCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useUpdatePollMutation,
    useDeletePollMutation,
    useAddTagMutation,
    useRemoveTagMutation
} = TaskApiSlice