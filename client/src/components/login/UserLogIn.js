/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logImage from '../../assets/logIn.png';
import { useLoginMutation } from '../../features/auth/authApi';

export default function UserLogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);
    const [remember, setRemember] = useState(false);

    const [login, { data, isLoading }] = useLoginMutation();

    useEffect(() => {
        if (!data?.success) {
            setError(data?.message);
            if (data?.message === 'Invalid Password' || data?.message === 'User Not found') {
                toast.error(data?.message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else if (data?.success) {
            let cookie = {
                email: data?.info?.email,
                accessToken: data?.info?.accessToken,
            };
            cookie = JSON.stringify(cookie);

            Cookies.set('qspace', cookie, { expires: 2 });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        login({
            email,
            password,
        });
    };

    const handleShowHide = () => {
        setShow(!show);
    };

    return (
        <>
            <ToastContainer />
            <div className="container-fluid d-md-flex justify-content-between" id="login-content">
                <div className="container" id="login-left-side">
                    <div className="container-fluid d-flex flex-column" id="login-inner-side">
                        <div
                            className="container d-flex flex-column p-2 align-items-center"
                            id="login-header-content"
                        >
                            <h3>Log In</h3>
                            <p>Welcome Back Again, We are happy to see you here</p>
                        </div>

                        <div className="container mt-5" id="form-all-contents">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="form-control log-input-style"
                                    placeholder="Enter email"
                                    id="log-email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className={error?.email ? 'reg-error' : 'reg-noterror'}>
                                    {error?.email ? error?.email : ''}
                                </p>
                                <div
                                    className="container-fluid p-0 position-relative"
                                    id="log-show-pass-group"
                                >
                                    <input
                                        type={!show ? 'text' : 'password'}
                                        className="form-control mt-4 log-input-style"
                                        placeholder="Enter password"
                                        id="log-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <p className={error?.password ? 'reg-error' : 'reg-noterror'}>
                                        {error?.password ? error?.password : ''}
                                    </p>
                                    <span>
                                        <i
                                            className={
                                                show ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                                            }
                                            onClick={handleShowHide}
                                        />
                                    </span>
                                </div>
                                <div className="container-fluid w-100 d-flex justify-content-between p-1 mt-4">
                                    <div className="form-check w-50" id="remember-group">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="remember"
                                            onChange={() => setRemember(!remember)}
                                        />
                                        <label className="form-check-label" htmlFor="remember">
                                            Remember me
                                        </label>
                                    </div>
                                    <div
                                        className="container w-50 d-flex align-items-center justify-content-end"
                                        id="forgot-password"
                                    >
                                        <a href="/">Forget Password?</a>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn mt-4 w-100"
                                    id="log-button"
                                    disabled={isLoading}
                                >
                                    Log In
                                </button>
                            </form>
                            <div
                                className="container-fluid d-flex align-items-center justify-content-end mt-4"
                                id="user-reg"
                            >
                                <p>
                                    Don&apos;t have an account?
                                    <a
                                        href="/"
                                        className="ms-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#register"
                                    >
                                        Register
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="container d-flex align-items-center justify-content-center"
                    id="login-right-side"
                >
                    <img className="img-fluid" src={logImage} alt="LogIn" />
                </div>
            </div>
        </>
    );
}
