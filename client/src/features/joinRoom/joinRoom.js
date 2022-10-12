import apiSlice from '../api/apiSlice';

export const joinRoomApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        joinRoom: builder.mutation({
            query: (data) => ({
                url: '/api/user/join-room-student',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['createRoom'],
        }),
    }),
});

export const { useJoinRoomMutation, useGetStudentRoomQuery } = joinRoomApi;
