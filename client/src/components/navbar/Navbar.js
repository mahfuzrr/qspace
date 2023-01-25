import { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaBookReader } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { MdExplore, MdGroups, MdLibraryBooks } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Qspace-logo.png';
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
                    <img src={Logo} alt="logo" className="img-fluid" />
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
                    <ul className="navbar-nav mb-lg-0 me-3 d-flex justify-content-around">
                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center ${
                                    activeLink === 'home' ? 'active' : ''
                                }`}
                                aria-current="page"
                                to="/home"
                                onClick={() => setActive('home')}
                            >
                                <HiHome size={18} /> <span className="ms-1">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'quiz' ? 'active' : ''}`}
                                to="/quiz"
                                onClick={() => setActive('quiz')}
                            >
                                <FaBookReader /> <span className="ms-1">Quiz</span>
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
                                    <BsPlusCircleFill />
                                    <span className="ms-1">Create</span>
                                </Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'library' ? 'active' : ''}`}
                                to="/library"
                                onClick={() => setActive('library')}
                            >
                                <MdLibraryBooks /> <span className="ms-1">My Library</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'room' ? 'active' : ''}`}
                                to="/room"
                                onClick={() => setActive('room')}
                            >
                                <MdGroups size={18} /> <span className="ms-1">Room</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeLink === 'explore' ? 'active' : ''}`}
                                to="/explore"
                                onClick={() => setActive('explore')}
                            >
                                <MdExplore /> <span className="ms-1">Explore</span>
                            </Link>
                        </li>
                    </ul>

                    <NavProfileLink />
                </div>
            </div>
        </nav>
    );
}
