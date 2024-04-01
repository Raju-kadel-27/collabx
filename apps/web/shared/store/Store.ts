
import UserRootReducer from "@features/authentication/redux/rootReducer";
import MeshRootReducer from "@features/video-chat/mesh-topology/redux/rootReducer";
import SfuRootReducer from "@features/video-chat/sfu-topology/redux/rootReducer";
import ChatRootReducer from "@features/text-chat/redux/rootReducer";
import ClassroomRootReducer from "@features/classroom/redux/rootReducer";
import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "../../src/app/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: UserRootReducer,
        mesh: MeshRootReducer,
        sfu: SfuRootReducer,
        textChat: ChatRootReducer,
        classroom: ClassroomRootReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch);
