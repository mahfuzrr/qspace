import apiSlice from '../api/apiSlice';
import { setUserInfo } from '../getUserInfo/getUserInfoSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // register: builder.mutation({
        //     query: (data) => ({
        //         url: 'api/user/register',
        //         method: 'POST',
        //         body: data,
        //     }),

        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;
        //             dispatch(setResponseData(result.data));
        //         } catch (err) {
        //             // do nothing
        //         }
        //     },
        // }),
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
                        dispatch(
                            userLoggedIn({
                                accessToken: result?.data?.info?.accessToken,
                                user: result.data.info?.userName,
                                role: result?.data?.info?.role,
                                email: result.data.info?.email,
                                isLogged: true,
                            })
                        );

                        dispatch(
                            setUserInfo({
                                name: result.data?.info?.userName,
                                email: result.data.info?.email,
                                college: result.data.info?.college,
                            })
                        );

                        // const cookieObj = {
                        //     accessToken: result?.data?.info?.accessToken,
                        //     user: result.data.info?.userName,
                        //     role: result?.data?.info?.role,
                        //     email: result.data.info?.email,
                        // };

                        // Cookies.set('qspace-user', JSON.stringify(cookieObj), { expires: 7 });
                    }
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
