import { IoGiftSharp } from "react-icons/io5";
import { apiSlice } from "../../../../../src/app/api/apiSlice";


export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        sendMessage: builder.mutation({

            query: (payload) => ({
                url: '/api/message/sendmessage',
                method: 'POST',
                body: payload.body
            }),

            async onQueryStarted(payload, { dispatch, getState, getCacheEntry, queryFulfilled }) {
                const patchResult = dispatch(
                    messageApiSlice.util
                        .updateQueryData(
                            'getAllMessages',
                            payload.chatId,
                            (draft) => {
                                return [...draft, payload.body]
                            })
                )
                console.log('Optimistic update: getstate api', getState().api);
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo()
                    console.log('Dangerrrrrrrrrrrrrrrr')
                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },
        }),

        getAllMessages: builder.query({
            query: (chatId) => ({
                url: `/api/message/getmessages/${chatId}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    console.log({ arg }, '++++++++++++++++chatId-getAllMessages++++++++++++++++++++++');
                    console.log('Getting all messages from args pointer');
                    const data = await queryFulfilled;
                    console.log({ data }, 'getAllMessage')
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    })
})

export const {
    useSendMessageMutation,
    useGetAllMessagesQuery
} = messageApiSlice

