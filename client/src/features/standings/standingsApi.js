import apiSlice from '../api/apiSlice';

export const standingsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStandings: builder.query({
            query: (id) => ({
                url: `/api/user/standings-api/${id}`,
            }),
            providesTags: ['standings'],
        }),
    }),
});

export const { useGetStandingsQuery } = standingsApi;
