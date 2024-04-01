import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "./api/apiSlice";
import MeshReducer from "@features/video-chat/mesh-topology/redux/combineReducer";
import SfuReducer from "@features/video-chat/sfu-topology/redux/combineReducer";
import ChatRootReducer from "@features/text-chat/redux/combineReducer";
import UserReducer from "@features/authentication/redux/combineReducer";
import TeamReducer from '@/features/Team/redux/slices/team';

const rootReducer = combineReducers({
    user: UserReducer,
    team: TeamReducer,
    textChat: ChatRootReducer,
    mesh: MeshReducer,
    sfu: SfuReducer,
})

export const store = configureStore({
    reducer: {
        root: rootReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

