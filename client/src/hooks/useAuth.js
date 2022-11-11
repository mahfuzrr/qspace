import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function useAuth() {
    // console.log(auth);
    const auth = useSelector((state) => state.auth);
    const cookie = Cookies.get('qspace');

    if (auth?.accessToken && auth?.user && auth?.isLogged) {
        return true;
    }
    if (cookie) return true;

    return false;
}
