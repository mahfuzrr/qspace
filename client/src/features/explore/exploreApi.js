import apiSlice from '../api/apiSlice';

export const exploreApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPublicCourses: builder.query({
            query: () => ({
                url: '/api/user/get-public-quiz',
            }),
        }),
    }),
});

export const { useGetPublicCoursesQuery } = exploreApi;
