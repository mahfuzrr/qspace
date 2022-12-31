import apiSlice from '../api/apiSlice';

export const getStudentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: (id) => ({
                url: `/api/user/get-studentlists/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['getStudents'],
        }),
        removeUser: builder.mutation({
            query: (data) => ({
                url: `/api/user/remove-student/${data?.email}/${data?.courseid}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['getStudents'],
        }),
    }),
});

export const { useGetAllStudentsQuery, useRemoveUserMutation } = getStudentApi;
