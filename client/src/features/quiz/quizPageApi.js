import apiSlice from '../api/apiSlice';

export const quizPageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => ({
                url: '/api/user/get-all-quizzes',
            }),
            providesTags: ['quizPage'],
        }),
        submitQuiz: builder.mutation({
            query: (data) => ({
                url: '/api/user/submit-quizz',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['resultPage'],
        }),
        getResult: builder.query({
            query: (data) => ({
                url: `/api/user/get-result/${data.email}/${data.quizid}`,
            }),
            providesTags: ['resultPage'],
        }),
    }),
});

export const { useGetAllQuizQuery, useSubmitQuizMutation, useGetResultQuery } = quizPageApi;
