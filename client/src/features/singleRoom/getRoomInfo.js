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
        deletePost: builder.mutation({
            query: (data) => ({
                url: '/api/user/delete-post',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['getCoursePost', 'getPrivatePost'],
        }),
    }),
});

export const { useGetInfoQuery, useDeletePostMutation } = getRoomInfo;
