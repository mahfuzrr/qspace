import apiSlice from '../api/apiSlice';

export const quizPageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => ({
                url: '/api/user//get-all-quizzes',
            }),
            providesTags: ['quizPage'],
        }),
    }),
});

export const { useGetAllQuizQuery } = quizPageApi;
