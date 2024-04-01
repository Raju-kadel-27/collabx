import { combineReducers } from "@reduxjs/toolkit";
import channelMessage from "./slices/ChannelMessage";
import bottomScreenController from "./slices/BottomScreenController";

export default combineReducers({
    bottomScreenController,
    channelMessage
})