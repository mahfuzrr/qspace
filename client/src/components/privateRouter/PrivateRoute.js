import { Navigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';

export default function PrivateRoute({ children }) {
    const isLoggedIn = useAuthCheck();
    return isLoggedIn ? children : <Navigate to="/" />;
}
