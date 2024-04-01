import { apiSlice } from "@/app/api/apiSlice";
import { FormatPayload } from "@/features/tabs/post-tab/utils/formatPayload";

export const TaskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({

        getAllTasks: builder.query({

            query: (
                { channelId, limit, cursor }:
                    {
                        channelId: string;
                        limit: string;
                        cursor: string;
                    }) => ({
                        url: `/api/tasks/getalltasks/${channelId}?limit=${limit}&cursor=${cursor}`,
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
                    type: 'Task',
                    id: 'LIST'
                }]
            }
        }),

        createTask: builder.mutation({
            query: (payload: any) => ({
                url: '/api/tasks/create',
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

        updateTask: builder.mutation({
            query: (payload: any) => ({
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

        deleteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/api/tasks/delete/${taskId}`,
                method: 'POST',
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const data = await queryFulfilled;
                    console.log({ data })

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
    useDeleteTaskMutation,
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation
} = TaskApiSlice