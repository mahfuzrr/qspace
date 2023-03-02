import apiSlice from '../api/apiSlice';
import { userLoggedIn } from '../auth/authSlice';
import { setUserInfo } from './getUserInfoSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cookie: builder.query({
            query: (data) => ({
                url: `/api/user/reload-user-save/${data?.email}/${data?.accessToken}`,
            }),
            providesTags: ['AddUserInfo'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.success) {
                        // console.log(result.data);
                        dispatch(
                            userLoggedIn({
                                accessToken: result?.data?.accessToken,
                                user: result.data?.message?.name,
                                role: result.data?.message?.role,
                                email: result.data?.message?.email,
                                photoURL: result.data?.message?.photoURL,
                                isLogged: true,
                                id: result.data?.message?.id,
                            })
                        );

                        dispatch(
                            setUserInfo({
                                name: result.data?.message?.name,
                                email: result.data?.message?.email,
                                college: result.data?.message?.college,
                            })
                        );
                    }
                } catch (err) {
                    // do nothing
                }
            },
        }),

        getUserInformation: builder.query({
            query: (data) => ({
                url: `/api/user/userinfo/${data}`,
                method: 'GET',
            }),
            providesTags: ['getUserInfo'],
        }),
    }),
});

export const { useCookieQuery, useGetUserInformationQuery } = authApi;
