let initializedConnections:any = {}

const handleReceiveMessage = (event:any) => {
    const message = event.data
    console.log({ message })
};

const handleReceiveChannelStatusChange = (event:any) => {
    console.log({ event })
};

const receiveChannelCallback = (event:any) => {
    const receiveChannel = event.channel
    receiveChannel.onmessage = handleReceiveMessage
    receiveChannel.onopen = handleReceiveChannelStatusChange
    receiveChannel.onclose = handleReceiveChannelStatusChange
};

export const SendMessageViaChannel = (connections:any) => {
    const allConnectionsUserIds = Object.keys(connections.current)
    allConnectionsUserIds.forEach(userId => {
        if (!initializedConnections[userId]) {
            connections.current[userId].ondatachannel = receiveChannelCallback
            initializedConnections[userId] = true;
        }
    })
}
