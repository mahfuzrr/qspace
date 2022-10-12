import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['createRoom', 'getRoomInfo', 'getCoursePost', 'getPrivatePost'],
    endpoints: () => ({}),
});

export default apiSlice;
