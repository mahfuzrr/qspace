import { useEffect, useState } from 'react';
import LeftSideQuestions from './ExploreLeftSideQs';
import RightSideNavigator from './ExploreRightSideQs';

export default function ExploreQpage() {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };

    const [windowDimension, setWindowDimension] = useState(getWindowDimensions());
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowDimension(getWindowDimensions());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {windowDimension.width <= 890 && (
                <div className="container-fluid position-relative" id="side-nav-question-hidden">
                    <span className="question-sideNav" onClick={handleToggle} role="presentation">
                        <i className="fa-solid fa-circle-arrow-left" />
                    </span>
                </div>
            )}
            <div className="container-fluid overflow-hidden" id="quiz-page-contents">
                <div className="container-fluid d-flex" id="quiz-page-wrapper">
                    <LeftSideQuestions />
                    {windowDimension.width > 890 ? (
                        <RightSideNavigator />
                    ) : (
                        windowDimension.width <= 890 && isOpen && <RightSideNavigator />
                    )}
                </div>
            </div>
        </>
    );
}
