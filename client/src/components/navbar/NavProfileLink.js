import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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

    console.log(photoURL);

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
                    <button className="dropdown-item" type="button" onClick={handleLogOut}>
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    );
}
