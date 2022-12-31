import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../Loader/Loader';

export default function TeacherRoute({ children }) {
    const isLoggedIn = useAuthCheck();
    const { role } = useSelector((state) => state.auth);

    if (!role) {
        return <Loader />;
    }

    return isLoggedIn && role === 'teacher' ? children : <Navigate to="/" />;
}
