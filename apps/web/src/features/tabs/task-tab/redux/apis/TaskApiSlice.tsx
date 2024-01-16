import { apiSlice } from "@/app/api/apiSlice";

export const TaskApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder: any) => ({

        getAllTasks: builder.query({
            query: ({ channelId }: { channelId: string }) => ({
                url: `/api/tasks/getalltasks/${channelId}`,
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
            }
        }),


        updateTask: builder.mutation({
            query: (payload: any) => ({
                url: `/api/tasks/update/${payload.taskId}`,
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
            }
        }),


    })
});


export const {
    useDeleteTaskMutation,
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation
} = TaskApiSlice