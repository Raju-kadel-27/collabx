import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { VideoContainer } from "../components/VideoContainer/VideoContainer";
import { userSelector } from '@features/authentication/redux/slices/userSlice';
import {
    useGetOnlyPeers,
    useRemoveDuplicate,
    UseSFUTopology
} from "../hooks";

export default function RoomSfu() {

    const { roomId } = useParams();
    const user = useSelector(userSelector, (prev, next) => prev === next);
    const { clients, provideRef, handleSelfMute } = UseSFUTopology(roomId, user);
    const [duplicateFreeClients] = useRemoveDuplicate(clients)
    let [peerClientsOnly] = useGetOnlyPeers(duplicateFreeClients, user)
    const [isMute, setIsMute] = useState(true)

    useEffect(() => {
        handleSelfMute(isMute, user._id)
    },
        [isMute])

    const handleToggleMic = (userId: string) => {
        if (userId !== user?._id) {
            return
        }
        setIsMute(!isMute);
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
