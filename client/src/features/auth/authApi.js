import apiSlice from '../api/apiSlice';
import { setUserInfo } from '../getUserInfo/getUserInfoSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/api/user/login',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // console.log('result: ', result);
                    if (result?.data?.success) {
                        // console.log(result.data);
                        dispatch(
                            userLoggedIn({
                                accessToken: result?.data?.info?.accessToken,
                                user: result.data.info?.userName,
                                role: result?.data?.info?.role,
                                email: result.data.info?.email,
                                isLogged: true,
                                photoURL: result.data.info?.photoURL,
                            })
                        );

                        dispatch(
                            setUserInfo({
                                name: result.data?.info?.userName,
                                email: result.data.info?.email,
                                college: result.data.info?.college,
                            })
                        );
                    }
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
