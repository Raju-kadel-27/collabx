import { useSelector } from "react-redux";
import { BottomScreenController } from "../BottomScreenControllers/BottomScreenControllers";
import RightDrawer from "../RightDrawer/RightDrawer";
import MultipleRooms from "../RoomLayout/MultipleRooms";
import { bottomScreenControllerSelector } from "../../redux/slices/BottomScreenController";
import { CanvasContainer } from "@/features/tabs/whiteboard-tab/components/CanvasContainer";

export const VideoContainer = (
    { provideRef,
        handleToggleMic,
        peerClientsOnly,
        isMute
    }:any) => {

    const { isChatOpen, isWhiteBoardOpen, isWishReceived } = useSelector(bottomScreenControllerSelector, (prev, next) => prev === next)
    let RequiredRoomsLayout;
    // if (roomLength === 1)
    //     RequiredRoomsLayout =
    //         <SingleVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength === 2)
    //     RequiredRoomsLayout =
    //         <TwoVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength === 3)
    //     RequiredRoomsLayout =
    //         <ThreeVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength === 4)
    //     RequiredRoomsLayout =
    //         <FourVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength > 4)
    RequiredRoomsLayout =
        <MultipleRooms
            isWhiteBoardOpen={isWhiteBoardOpen}
            isMute={isMute}
            clients={peerClientsOnly}
            provideRef={provideRef}
            handleToggleMic={handleToggleMic} />

    return (
        <div style={{
            backgroundColor: 'black',
            overflowY: 'hidden'
        }} className="h-screen w-full ">

            {
                isChatOpen
                &&
                (
                    <RightDrawer />
                )
            }

            {/* {
                showPeerTracking
                &&
                <ShowPeerTracking setShowPeerTracking={setShowPeerTracking} />
            } */}

            {isWhiteBoardOpen && <CanvasContainer />}

            {/* { isWishReceived && <WishBirthday />} */}

            {RequiredRoomsLayout}

            <BottomScreenController />
        </div>
    );
};