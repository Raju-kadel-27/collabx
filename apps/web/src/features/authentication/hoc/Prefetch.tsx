// import { chatApiSlice } from "../../../src/features/chat/chatApiSlice";
import { Outlet } from 'react-router-dom';
import { useEffect } from "react";
// import { store } from "../../../shared/store/store";

export const Prefetch = () => {
    useEffect(() => {
        // store.dispatch(chatApiSlice.util.prefetch('fetchAllChats', { force: true }));
        // store.dispatch(chatApiSlice.util.prefetch('fetchAllChats', 'notesList', { force: true }));
    }, [])

    return (<Outlet />)
}
