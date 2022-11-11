import apiSlice from '../api/apiSlice';

export const getQuizInfoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizInfo: builder.query({
            query: (email) => ({
                url: `/api/user/get-quizzes/${email}`,
            }),
            providesTags: ['getQuizInfo'],
        }),
        getQuestions: builder.query({
            query: (id) => ({
                url: `/api/user/get-questions/${id}`,
            }),
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/api/user/delete-question/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getQuizInfo'],
        }),
        editStatus: builder.mutation({
            query: (data) => ({
                url: '/api/user/update-quiz-status',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['getQuizInfo'],
        }),
    }),
});

export const {
    useGetQuizInfoQuery,
    useGetQuestionsQuery,
    useDeleteQuestionMutation,
    useEditStatusMutation,
} = getQuizInfoApi;
