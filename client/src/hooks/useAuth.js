import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function useAuth() {
    // console.log(auth);
    const auth = useSelector((state) => state.auth);
    let cookie = Cookies.get('qspace-user');
    if (cookie) cookie = JSON.parse(cookie);

    if (auth?.accessToken && auth?.user && auth?.isLogged) {
        return true;
    }
    if (cookie?.accessToken) return true;

    return false;
}
