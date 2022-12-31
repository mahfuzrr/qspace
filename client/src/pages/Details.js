import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import RightSideNavigator from '../components/quizPage/RightSideNavigator';
import TeacherDetails from '../components/result/TeacherDetails';

export default function Details() {
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
            <Navbar />
            {windowDimension.width <= 890 && (
                <div className="container-fluid position-relative" id="side-nav-question-hidden">
                    <span className="question-sideNav" onClick={handleToggle} role="presentation">
                        <i className="fa-solid fa-circle-arrow-left" />
                    </span>
                </div>
            )}
            <div className="container-fluid overflow-hidden min-vh-100" id="quiz-details-page">
                <Toaster />
                <div className="container-fluid d-flex" id="quiz-details-page-wrapper">
                    <TeacherDetails />
                    {windowDimension.width > 890 ? (
                        <RightSideNavigator />
                    ) : (
                        windowDimension.width <= 890 && isOpen && <RightSideNavigator />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
