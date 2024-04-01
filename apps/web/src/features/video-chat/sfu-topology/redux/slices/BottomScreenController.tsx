import { createSlice } from '@reduxjs/toolkit'
import { MEDIA__TYPE } from '../../actions/actions'

const initialState =
{
    isRaiseHand: false,
    isServerRecording: false,
    isLocalRecording: false,
    isWhiteBoardOpen: false,
    isMicOn: false,
    isLocationTrackingOn: false,
    isChatOpen: false,
    isWishReceived: false,
    isCelebrationReceived: false,
    cameraMode: MEDIA__TYPE.CAMERA

}

export const BottomScreenControllerSlice = createSlice(
    {
        name: 'BottomScreenControllerSlice',
        initialState,
        reducers:
        {
            handleRaiseHand: (state) => {
                state.isRaiseHand = !state.isRaiseHand;
            },

            handleServerRecording: (state, action) => {
                state.isServerRecording = action.payload;
            },

            handleLocalRecording: (state, action) => {
                state.isLocalRecording = action.payload;
            },

            handleWhiteBoard: (state) => {
                state.isWhiteBoardOpen = !state.isWhiteBoardOpen;
            },

            handleMic: (state, action) => {
                state.isMicOn = action.payload;
            },

            handleLocationTracking: (state) => {
                state.isLocationTrackingOn = !state.isLocationTrackingOn;
            },

            handleChat: (state) => {
                state.isChatOpen = !state.isChatOpen;
            },

            handleCelebrationReceived: (state) => {
                state.isCelebrationReceived = !state.isCelebrationReceived;
            },

            handleWishReceived: (state, action) => {
                state.isWishReceived = action.payload;
            },

            ToggleCameraMode: (state, action) => {
                const { cameraMode } = action.payload;
                state.cameraMode = cameraMode;
            }
        },
    }
)

export const
    {
        handleRaiseHand,
        handleServerRecording,
        handleLocalRecording,
        handleWhiteBoard,
        handleMic,
        handleLocationTracking,
        handleChat,
        handleCelebrationReceived,
        handleWishReceived,
        ToggleCameraMode

    } = BottomScreenControllerSlice.actions

export default BottomScreenControllerSlice.reducer

export const bottomScreenControllerSelector = (state: any) => state.root.sfu.bottomScreenController




