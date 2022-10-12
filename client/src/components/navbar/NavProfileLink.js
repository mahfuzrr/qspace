import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import userImage from '../../assets/user.png';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function NavProfileLink() {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        Cookies.remove('qspace-user');
    };

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
                <img src={userImage} alt="user" className="img-fluid" />
            </button>
            <ul className="dropdown-menu dropdown-menu-start" id="drop-menu">
                <li>
                    <button className="dropdown-item" type="button">
                        <Link
                            to="/profile"
                            className="text-decoration-none text-dark w-100 d-inline-block"
                        >
                            Profile
                        </Link>
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" type="button">
                        Settings
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
