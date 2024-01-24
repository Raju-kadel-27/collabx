import { createSlice } from '@reduxjs/toolkit';
// let user = { fullName: 'Raju kadel', _id: 564523 * Math.floor(Math.random() * 1234), email: 'rajukadel@gmail.com' };

const initialState = {
    userDetails:{ _id: "658c2f62d2d12f120b0e2f94" } || null,
    accessToken: '',
    roles: []
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        storeAccessToken: (state, action) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
        },
        storeCredentials: (state, action) => {
            const { accessToken, user } = action.payload;
            state.accessToken = accessToken;
            state.userDetails = user;
        },
        logOut: (state) => {
            state.accessToken = '';
            state.userDetails = null;
            localStorage.removeItem('isUser');
            localStorage.removeItem('persist');
        }
    },
    extraReducers: {
    }
})

export const {
    storeAccessToken,
    logOut,
    storeCredentials
} = userSlice.actions;

export default userSlice.reducer

export const userSelector = (state: any) => state.root.user.user.userDetails;
export const selectAccessToken = (state: any) => state.root.user.user.accessToken;