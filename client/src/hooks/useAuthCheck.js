import { useEffect, useState } from 'react';
import { useCookieQuery } from '../features/getUserInfo/getAuthApi';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const { data } = useCookieQuery();
    // const { isLogged } = useSelector((state) => state.auth);
    // let authChecked = false;
    // console.log(isLogged);

    useEffect(() => {
        if (data?.success) {
            setAuthChecked(true);
            // console.log(data);
        }
    }, [setAuthChecked, data?.success]);

    return authChecked;
}
