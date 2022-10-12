/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRegister() {
    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [institute, setInstitute] = useState('');
    const [isError, setError] = useState(false);
    const [allError, setAllError] = useState({});
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(true);

    const navigate = useNavigate();

    const successNotify = (data) => {
        toast.success(data, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            userName,
            email,
            password,
            role,
            institution: institute,
        };

        axios
            .post('http://localhost:5000/api/user/register', body)
            .then((res) => {
                if (!res?.data?.success) {
                    setError(true);
                    setAllError(res.data.errors);
                    setSuccess(false);
                } else {
                    successNotify(res.data.message);
                    setError(false);
                    setSuccess(true);
                    setuserName('');
                    setEmail('');
                    setPassword('');
                    setInstitute('');
                    setRole('');
                }
            })
            .catch((err) => console.log(err));
    };

    const handleShowHide = () => {
        setShow(!show);
    };

    useEffect(() => {
        if (success) {
            const modal = document.getElementById('register');
            modal.classList.remove('show');
            modal.style.display = 'none';
            const backdrop = document.getElementsByClassName('fade');
            for (let i = 0; i < backdrop.length; i += 1)
                backdrop[i].classList.remove('modal-backdrop');
        }
    }, [success, navigate]);

    return (
        <div
            className="modal fade"
            id="register"
            tabIndex="-1"
            aria-labelledby="regModal"
            aria-hidden={success}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title" id="regModal">
                            Sign Up
                        </h5>
                        <span id="close" data-bs-dismiss="modal" aria-label="Close">
                            <i className="fa-solid fa-circle-xmark" />
                        </span>
                    </div>

                    <div className="modal-body" id="reg-form">
                        <form method="post" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control input-field"
                                id="uname"
                                placeholder="Enter name"
                                name="userName"
                                onChange={(e) => {
                                    setuserName(e.target.value);
                                }}
                            />
                            <p className={isError ? 'reg-error' : 'reg-noterror'}>
                                {allError?.name ? allError?.name : ''}
                            </p>
                            <input
                                type="email"
                                className="form-control mt-3 input-field"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <p className={isError ? 'reg-error' : 'reg-noterror'}>
                                {allError?.email ? allError?.email : ''}
                            </p>
                            <div
                                className="container-fluid position-relative p-0"
                                id="reg-show-pass-group"
                            >
                                <input
                                    type={!show ? 'text' : 'password'}
                                    className="form-control mt-3 input-field"
                                    id="pass"
                                    placeholder="Enter password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <p className={isError ? 'reg-error' : 'reg-noterror'}>
                                    {allError?.password ? allError?.password : ''}
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
                            <div
                                className="container-fluid p-0 d-flex flex-column mt-3"
                                id="role-selector"
                            >
                                <p>Role</p>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        id="teacher"
                                        checked={role === 'teacher'}
                                        onChange={() => setRole('teacher')}
                                    />
                                    <label className="form-check-label" htmlFor="teacher">
                                        Teacher
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        id="student"
                                        checked={role === 'student'}
                                        onChange={() => setRole('student')}
                                    />
                                    <label className="form-check-label" htmlFor="student">
                                        Student
                                    </label>
                                </div>
                            </div>
                            <p className={isError ? 'reg-error' : 'reg-noterror'}>
                                {allError?.roll ? allError?.roll : ''}
                            </p>
                            <input
                                type="text"
                                className="form-control mt-3 input-field"
                                id="institute"
                                placeholder="College/University name"
                                name="institution"
                                onChange={(e) => setInstitute(e.target.value)}
                            />
                            <label htmlFor="avatar" className="mt-3" id="profile-label">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                className="form-control mt-1 input-field"
                                id="avatar"
                                name="avatar"
                            />
                            <button
                                type="submit"
                                className="btn mt-5"
                                id="subForm"
                                disabled={success}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
