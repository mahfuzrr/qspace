import { useState } from 'react';
import { FaMoon, FaRegBell } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavProfileLink from './NavProfileLink';

export default function Navbar() {
    let url = window.location.pathname;
    url = url.slice(1, url.length);

    const [activeLink, setActive] = useState(url);

    const { role } = useSelector((state) => state.auth);

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light lh-lg" id="navbar">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    QSpace
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navBar"
                    aria-controls="navBar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse container navbar-collapse justify-content-end" id="navBar">
                    <ul className="navbar-nav mb-lg-0 d-flex justify-content-around">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                                aria-current="page"
                                to="/home"
                                onClick={() => setActive('home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'quiz' ? 'active' : ''}`}
                                to="/quiz"
                                onClick={() => setActive('quiz')}
                            >
                                Quiz
                            </Link>
                        </li>
                        {role === 'teacher' && (
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        activeLink === 'dashboard' ? 'active' : ''
                                    }`}
                                    to="/dashboard"
                                    onClick={() => setActive('dashboard')}
                                >
                                    Create
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'room' ? 'active' : ''}`}
                                to="/room"
                                onClick={() => setActive('room')}
                            >
                                Room
                            </Link>
                        </li>
                        <li className="nav-item" id="bell-icon">
                            <FaRegBell />
                        </li>
                        <li id="theme">
                            <FaMoon />
                        </li>
                    </ul>

                    <NavProfileLink />
                </div>
            </div>
        </nav>
    );
}
