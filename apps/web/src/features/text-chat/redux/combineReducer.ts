import { combineReducers } from "@reduxjs/toolkit";
import textChat from "./slices/ChatSlice";

export default combineReducers(
    {
        textChat
    }
);

