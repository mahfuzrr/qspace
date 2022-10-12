import apiSlice from '../api/apiSlice';

export const getRoomInfo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInfo: builder.query({
            query: (id) => ({
                url: `api/user/getinfo/${id}`,
                method: 'GET',
            }),
            providesTags: ['getRoomInfo'],
        }),
    }),
});

export const { useGetInfoQuery } = getRoomInfo;
