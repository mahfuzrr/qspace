import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function NavProfileLink() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        Cookies.remove('qspace');
        navigate('/');
    };

    const { photoURL } = useSelector((state) => state.auth);

    return (
        <div className="btn-group ms-lg-5 position-relative">
            <button
                type="button"
                className="btn"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
                id="user-image"
            >
                <img src={photoURL} alt="user" className="img-fluid" />
            </button>
            <ul className="dropdown-menu dropdown-menu-start" id="drop-menu">
                <li>
                    <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" type="button" onClick={handleLogOut}>
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    );
}
