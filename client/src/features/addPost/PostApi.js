import apiSlice from '../api/apiSlice';

export const PostApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCoursePost: builder.mutation({
            query: (data) => ({
                url: '/api/user/add-course-post',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['getCoursePost', 'getPrivatePost'],
        }),
        getCoursePost: builder.query({
            query: (roomId) => ({
                url: `/api/user/get-course-post/${roomId}`,
                method: 'GET',
            }),
            providesTags: ['getCoursePost'],
        }),
        getPrivatePost: builder.query({
            query: (email) => ({
                url: `/api/user/get-private-post/${email}`,
                method: 'GET',
            }),
            providesTags: ['getPrivatePost'],
        }),
    }),
});

export const { useAddCoursePostMutation, useGetCoursePostQuery, useGetPrivatePostQuery } = PostApi;
