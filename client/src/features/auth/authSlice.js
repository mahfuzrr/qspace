/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: undefined,
    user: undefined,
    email: undefined,
    role: undefined,
    isLogged: null,
    photoURL: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.isLogged = action.payload.isLogged;
            state.photoURL = action.payload.photoURL;
        },

        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
            state.isLogged = false;
            state.role = undefined;
            state.email = undefined;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
