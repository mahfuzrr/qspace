import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import RightSideNavigator from '../components/quizPage/RightSideNavigator';
import Result from '../components/result/Result';
import { useGetResultQuery } from '../features/quiz/quizPageApi';

export default function ResultPage() {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };

    const [windowDimension, setWindowDimension] = useState(getWindowDimensions());
    const [isOpen, setIsOpen] = useState(false);
    const [resultData, setResultData] = useState({});

    const { email } = useSelector((state) => state.userinfo);
    const { id } = useParams();

    const { data } = useGetResultQuery({ email, quizid: id });

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (data?.success) {
            console.log(data);
            setResultData(data?.message);
        }
        const handleResize = () => {
            setWindowDimension(getWindowDimensions());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [data]);

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
            <div className="container-fluid overflow-hidden" id="result-page-contents">
                <div className="container-fluid d-flex" id="result-page-wrapper">
                    <Result resultData={resultData} />
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
