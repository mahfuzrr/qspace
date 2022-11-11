import apiSlice from '../api/apiSlice';
import { setUserInfo } from '../getUserInfo/getUserInfoSlice';

export const updateProfileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        update: builder.mutation({
            query: (data) => ({
                url: '/api/user/update-user',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['AddUserInfo'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data?.success) {
                        dispatch(
                            setUserInfo({
                                name: result?.data?.message?.name,
                                email: result?.data?.message?.email,
                                college: result?.data?.message?.college,
                            })
                        );
                    }
                } catch (err) {
                    // do nothing
                }
            },
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: 'api/user/update-password',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useUpdateMutation, useUpdatePasswordMutation } = updateProfileApi;