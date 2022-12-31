import apiSlice from '../api/apiSlice';

export const quizPageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => ({
                url: '/api/user/get-all-quizzes',
            }),
            providesTags: ['quizPage'],
        }),
        getCourseQuiz: builder.query({
            query: (email) => ({
                url: `/api/user/get-course-quizzes/${email}`,
            }),
            providesTags: ['quizPage'],
        }),
        submitQuiz: builder.mutation({
            query: (data) => ({
                url: '/api/user/submit-quizz',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['resultPage', 'standings'],
        }),
        getResult: builder.query({
            query: (data) => ({
                url: `/api/user/get-result/${data.email}/${data.quizid}`,
            }),
            providesTags: ['resultPage'],
        }),
        getDetails: builder.query({
            query: (id) => ({
                url: `/api/user/get-quiz-details/${id}`,
            }),
            providesTags: ['resultPage'],
        }),
        addMark: builder.mutation({
            query: (data) => ({
                url: '/api/user/update-quiz-mark',
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['resultPage'],
        }),
    }),
});

export const {
    useGetAllQuizQuery,
    useSubmitQuizMutation,
    useGetResultQuery,
    useGetCourseQuizQuery,
    useGetDetailsQuery,
    useAddMarkMutation,
} = quizPageApi;
