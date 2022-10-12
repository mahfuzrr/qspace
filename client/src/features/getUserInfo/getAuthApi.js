import apiSlice from '../api/apiSlice';
import { userLoggedIn } from '../auth/authSlice';
import { setUserInfo } from './getUserInfoSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cookie: builder.query({
            query: () => ({
                url: '/api/user/cookie',
                credentials: 'include',
            }),
            // invalidatesTags: ['createRoom'],
            // refetchOnMountOrArgChange: true,

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.success && result) {
                        dispatch(
                            userLoggedIn({
                                accessToken: result?.data?.accessToken,
                                user: result.data?.message?.name,
                                role: result.data?.message?.role,
                                email: result.data?.message?.email,
                                isLogged: true,
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
            query: (email) => ({
                url: `/api/user/userinfo/${email}`,
                method: 'GET',
            }),
            providesTags: ['getUserInfo'],
        }),
    }),
});

export const { useCookieQuery, useGetUserInformationQuery } = authApi;
