import {
    bottomScreenControllerSelector,
    handleCelebrationReceived,
    handleWishReceived
} from "../../redux/slices/BottomScreenController";
import { useDispatch, useSelector } from "react-redux";
import { BottomScreenController } from "../BottomScreenController/BottomScreenController";
import RightDrawer from "../RightDrawer/RightDrawer";
import { SingleVideoRoom } from "../RoomLayout/SingleVideoRoom";
import { useEffect } from "react";
import { MESH__ACTIONS as ACTIONS } from "../../actions/actions";
import { getSocket } from '../../../../../../shared/helpers/SocketInit';
import { ChannelDataProvider } from "../ChannelDataProvider/ChannelDataProvider";
import { Congratulations } from "@/features/wish-feature/components/Congratulations/Congratulations";
import { Birthday } from "@/features/wish-feature/components/Birthday/Birthday";
import { CanvasContainer } from "@/features/tabs/whiteboard-tab/components/CanvasContainer";

export const VideoContainer = (
    { provideRef,
        handleToggleMic,
        peerClientsOnly,
        isMute
    }: any) => {
    const dispatch = useDispatch();
    const socket = getSocket();

    useEffect(() => {
        const handleMessage = ({ message }: any) =>
            message === 'BIRTHDAY' ?
                dispatch(handleWishReceived())
                : dispatch(handleCelebrationReceived())

        socket.on(ACTIONS.SEND__JOYS, handleMessage)

        return () => {
            socket.off(ACTIONS.SEND__JOYS, handleMessage)
        }
    }, [])

    const {
        isChatOpen,
        isWhiteBoardOpen,
        isWishReceived,
        isCelebrationReceived
    } = useSelector(bottomScreenControllerSelector, (prev, next) => prev === next)

    let RequiredRoomsLayout;

    RequiredRoomsLayout =
        <SingleVideoRoom
            isMute={isMute}
            clients={peerClientsOnly}
            provideRef={provideRef}
            handleToggleMic={handleToggleMic} />

    return (
        <div style={{
            backgroundColor: 'black',
            overflowY: 'hidden',
            overflowX: 'hidden',
        }} className={`   { h-screen ${isChatOpen ? 'w-[calc(100vw-300px)]' : 'w-full'} mr-auto }`}>

            {
                isChatOpen
                &&
                (
                    <ChannelDataProvider>
                        <RightDrawer />
                    </ChannelDataProvider>
                )
            }

            {/* {
                isLocationTrackingOn
                &&
                <ShowPeerTracking setShowPeerTracking={setShowPeerTracking} />
            } */}

            {
                isWhiteBoardOpen
                &&
                <CanvasContainer />
            }

            {
                isWishReceived
                &&
                <Birthday />
            }

            {
                isCelebrationReceived
                &&
                <Congratulations />
            }

            {RequiredRoomsLayout}

            <BottomScreenController />

        </div>
    );
};