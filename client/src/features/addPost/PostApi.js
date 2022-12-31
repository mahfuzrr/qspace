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
        getAllPosts: builder.query({
            query: (email) => ({
                url: `/api/user/get-all-posts/${email}`,
                method: 'GET',
            }),
            providesTags: ['getPrivatePost'],
        }),
        addComment: builder.mutation({
            query: (data) => ({
                url: '/api/user/add-comment',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['getCoursePost', 'getPrivatePost'],
        }),
        getComment: builder.query({
            query: (id) => ({
                url: `/api/user/get-comment/${id}`,
                method: 'GET',
            }),
            providesTags: ['getComment'],
        }),
        addPublicPost: builder.mutation({
            query: (data) => ({
                url: '/api/user/add-public-post-unq',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['getPrivatePost'],
        }),
    }),
});

export const {
    useAddCoursePostMutation,
    useGetCoursePostQuery,
    useGetAllPostsQuery,
    useAddCommentMutation,
    useGetCommentQuery,
    useAddPublicPostMutation,
} = PostApi;
