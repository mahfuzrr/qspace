/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    college: '',
    isLogged: false,
};

const getUserInfoSlice = createSlice({
    name: 'userinfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.college = action.payload.college;
            state.isLogged = true;
        },
    },
});

export const { setUserInfo } = getUserInfoSlice.actions;
export default getUserInfoSlice.reducer;
