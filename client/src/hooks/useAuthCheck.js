import Cookies from 'js-cookie';
import { useCookieQuery } from '../features/getUserInfo/getAuthApi';

export default function useAuthCheck() {
    let token = Cookies.get('qspace');
    if (token) token = JSON.parse(token);
    else token = '';

    useCookieQuery(token?.accessToken);

    if (token && token?.accessToken) return true;
    return false;
}
