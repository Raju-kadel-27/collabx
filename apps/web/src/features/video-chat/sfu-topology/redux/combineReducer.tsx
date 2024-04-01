import { combineReducers } from "@reduxjs/toolkit";
import bottomScreenController from "./slices/BottomScreenController";
import fileShare from "./slices/Fileshare";
import notifications from "./slices/Notifications";
import room from './slices/Room';
import channelMessage from "./slices/ChannelMessage";

export default combineReducers(
    {
        bottomScreenController,
        fileShare,
        notifications,
        room,
        channelMessage
    }
);

