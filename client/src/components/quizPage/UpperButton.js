import { useEffect, useState } from 'react';

export default function UpperButton({ handleResult }) {
    const [active, setActive] = useState('');

    const handleStandings = () => {
        setActive('standings');
    };

    const handleRes = () => {
        setActive('result');
        if (active !== 'result') handleResult();
    };

    useEffect(() => {
        const url = window.location.pathname;
        const updatedUrl = url.split('/');
        if (updatedUrl.includes('result')) {
            setActive('result');
        } else if (updatedUrl.includes('standings')) {
            setActive('standings');
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
            <button
                type="button"
                className={`btn ${active === 'result' && 'active-res-btn'}`}
                onClick={() => handleRes()}
            >
                Result
            </button>
        </div>
    );
}
