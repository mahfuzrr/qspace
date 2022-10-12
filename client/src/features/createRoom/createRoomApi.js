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
            query: () => ({
                url: 'api/user/get-all-rooms',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['createRoom'],
        }),
    }),
});

export const { useCreateRoomMutation, useGetRoomsQuery } = createRoomApi;
