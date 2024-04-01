export const useGetOnlyPeers = (allUsers, user) => {
    var peerClientsOnly = []
    if (allUsers?.length) {
        peerClientsOnly = allUsers.filter((u) => u._id !== user?._id)
    }
    return [peerClientsOnly];
}