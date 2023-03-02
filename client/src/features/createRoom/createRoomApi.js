import apiSlice from '../api/apiSlice';

export const createRoomApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRoom: builder.mutation({
            query: (data) => ({
                url: '/api/user/create-room',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['createRoom'],
        }),
        getRooms: builder.query({
            query: (email) => ({
                url: `api/user/get-all-rooms/${email}`,
                method: 'GET',
            }),
            providesTags: ['createRoom'],
        }),
    }),
});

export const { useCreateRoomMutation, useGetRoomsQuery } = createRoomApi;
