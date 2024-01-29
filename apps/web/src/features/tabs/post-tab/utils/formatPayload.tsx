export const FormatPayload = (payload: any) => {
    return {
        _id: payload._id,
        attachments: payload.attachments,
        authorId: payload.authorId,
        channelId: payload.channelId,
        content: payload.content,
        reactions: payload.reactions,
        reactionsCount: payload.reactionsCount,
        replies: payload.replies,
        teamId: payload.teamId,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        sharedChannels: payload.sharedChannels,
    }
}