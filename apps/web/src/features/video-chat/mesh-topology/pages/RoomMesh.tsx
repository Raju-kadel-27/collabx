import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useGetOnlyPeers, useRemoveDuplicate } from "../hooks"
import { VideoContainer } from "../components/VideoContainer/VideoContainer"
import { useWebRTC } from '../hooks/useWebRTC'
import { userSelector } from "../../../authentication/redux/slices/userSlice"

export default function RoomMesh() {
    const { roomId } = useParams()
    const userDetails = useSelector(userSelector, (prev, start) => prev === start)
    const { clients, provideRef, handleSelfMute } = useWebRTC(roomId, userDetails)
    const [duplicateFreeClients] = useRemoveDuplicate(clients)
    let [peerClientsOnly] = useGetOnlyPeers(duplicateFreeClients, userDetails)
    const [isMute, setIsMute] = useState(true)

    useEffect(() => {
        handleSelfMute(isMute, userDetails._id)
    }, [isMute])

    const handleToggleMic = (userId: string) => {
        if (userId !== userDetails?._id) {
            return
        }
        setIsMute(!isMute)
    }

    return (
        <VideoContainer
            isMute={isMute}
            provideRef={provideRef}
            handleToggleMic={handleToggleMic}
            peerClientsOnly={peerClientsOnly}
        />
    )
}
