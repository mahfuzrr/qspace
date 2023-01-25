import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExploreUpButton() {
    const [active, setActive] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();

    const handleStandings = () => {
        navigate(`/standings/${id}`);
        setActive('standings');
    };

    const handleRes = () => {
        navigate(`/result/${id}`);
        setActive('result');
    };

    const handleDetails = () => {
        navigate(`/quiz-details/${id}`);
        setActive('details');
    };

    const { role } = useSelector((state) => state.auth);

    useEffect(() => {
        const url = window.location.pathname;
        const updatedUrl = url.split('/');

        if (updatedUrl.includes('result')) {
            setActive('result');
        } else if (updatedUrl.includes('standings')) {
            setActive('standings');
        } else if (updatedUrl.includes('quiz-details')) {
            setActive('details');
        }
    }, []);

    return (
        <div className="container d-flex justify-content-end mt-3 gap-3" id="quiz-page-upper-btn">
            <button
                type="button"
                className={`btn ${active === 'standings' && 'active-res-btn'}`}
                onClick={handleStandings}
            >
                Standings
            </button>
            {role === 'teacher' ? (
                <button
                    type="button"
                    className={`btn ${active === 'details' && 'active-res-btn'}`}
                    onClick={handleDetails}
                >
                    Details
                </button>
            ) : (
                <button
                    type="button"
                    className={`btn ${active === 'result' && 'active-res-btn'}`}
                    onClick={handleRes}
                >
                    Result
                </button>
            )}
        </div>
    );
}
