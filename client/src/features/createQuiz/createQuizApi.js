import apiSlice from '../api/apiSlice';

export const createQuizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation({
            query: (data) => ({
                url: '/api/user/create-quiz',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['getQuizInfo'],
        }),
        getCourses: builder.query({
            query: (email) => ({
                url: `/api/user/get-courses/${email}`,
            }),
        }),
    }),
});

export const { useCreateQuizMutation, useGetCoursesQuery } = createQuizApi;
