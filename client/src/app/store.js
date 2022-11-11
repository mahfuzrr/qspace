import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import questionSlice from '../features/createQuiz/createQuizSlice';
import getUserInfoSlice from '../features/getUserInfo/getUserInfoSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        userinfo: getUserInfoSlice,
        quesData: questionSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
