/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: [
        'createRoom',
        'getRoomInfo',
        'getCoursePost',
        'getPrivatePost',
        'AddUserInfo',
        'getQuizInfo',
        'quizPage',
        'resultPage',
    ],
    endpoints: () => ({}),
});

export default apiSlice;
