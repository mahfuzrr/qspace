/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

export default function UserRegister() {
    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [institute, setInstitute] = useState('');
    const [allError, setAllError] = useState({});
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const successNotify = (data) => {
        toast.success(data, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
            autoClose: 1000,
        });
    };

    const handleAnother = (imgurl, reqBody) => {
        // eslint-disable-next-line no-param-reassign
        reqBody.photoURL = imgurl;

        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: userName,
                    photoURL: reqBody.photoURL,
                })
                    .then((finalRes) => {
                        axios
                            .post('http://localhost:5000/api/user/register', reqBody)
                            .then((upRess) => {
                                if (upRess?.data?.success) {
                                    successNotify(upRess?.data?.message);
                                    setSuccess(true);
                                }
                            })
                            .catch((err) => {
                                setSuccess(false);
                                toast.error(err.message, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 1000,
                                });
                            });
                    })
                    .catch((err2) => {
                        toast.error(err2.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    });
            })
            .catch((err1) => {
                toast.error(err1.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setAllError({});
        setError(false);

        if (userName?.length === 0) {
            setError(true);
            setAllError({ name: 'User name is required' });
            return;
        }
        if (email.length === 0) {
            setError(true);
            setAllError({ email: 'Email is required' });
            return;
        }
        if (password.length === 0) {
            setError(true);
            setAllError({ password: 'Password is required' });
            return;
        }

        const imgData = e.target.avatar.files[0];
        const formData = new FormData();
        formData.append('image', imgData);

        const body = {
            userName,
            email,
            password,
            role,
            institution: institute,
        };

        if (formData.get('image') === 'undefined') {
            handleAnother('https://i.ibb.co/hcCP2K4/u.png', body);
            return;
        }

        const imgbbUrl = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imageHostKey}`;

        fetch(imgbbUrl, {
            method: 'POST',
            body: formData,
        })
            .then((result) => {
                result.json().then((upRes) => {
                    if (upRes?.success) {
                        handleAnother(upRes?.data?.url, body);
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
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
                            <IoCloseCircle />
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
                            <p className={error ? 'reg-error' : 'reg-noterror'}>
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
                            <p className={error ? 'reg-error' : 'reg-noterror'}>
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
                                <p className={error ? 'reg-error' : 'reg-noterror'}>
                                    {allError?.password ? allError?.password : ''}
                                </p>
                                <span role="presentation" onClick={handleShowHide}>
                                    {show ? <FaEye /> : <FaEyeSlash />}
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
                            <p className={error ? 'reg-error' : 'reg-noterror'}>
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
                            <p className={error ? 'reg-error' : 'reg-noterror'}>
                                {allError?.avatar ? allError?.avatar : ''}
                            </p>
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
