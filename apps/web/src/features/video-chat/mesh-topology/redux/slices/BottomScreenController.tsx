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
    isFirstConnection: true,
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

            handleServerRecording: (state) => {
                state.isServerRecording = !state.isServerRecording;
            },

            handleLocalRecording: (state) => {
                state.isLocalRecording = !state.isLocalRecording;
            },

            handleWhiteBoard: (state) => {
                state.isWhiteBoardOpen = !state.isWhiteBoardOpen
            },

            handleMic: (state, action) => {
                state.isMicOn = action.payload
            },

            handleLocationTracking: (state) => {
                state.isLocationTrackingOn = !state.isLocationTrackingOn;
            },

            handleChat: (state) => {
                state.isChatOpen = !state.isChatOpen
            },

            handleCelebrationReceived: (state) => {
                state.isCelebrationReceived = !state.isCelebrationReceived
            },

            handleWishReceived: (state) => {
                state.isWishReceived = !state.isWishReceived
            },

            ToggleCameraMode: (state, action) => {
                const { cameraMode, isFirstConnection } = action.payload
                state.cameraMode = cameraMode
                state.isFirstConnection = isFirstConnection
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

export const bottomScreenControllerSelector = (state:any) => state.root.mesh.bottomScreenController






