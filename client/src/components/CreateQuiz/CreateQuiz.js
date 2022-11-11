/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import CreateQuizNav from './CreateQuizNav';
import QuizInfo from './QuizInfo';

export default function CreateQuiz() {
    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', unloadCallback);
        return () => window.removeEventListener('beforeunload', unloadCallback);
    }, []);

    return (
        <>
            <CreateQuizNav />
            <ToastContainer />
            <div className="container-fluid overflow-hidden" id="create-quiz-contents">
                <div className="container-fluid" id="all-content-create-quiz">
                    <QuizInfo />
                </div>
            </div>
        </>
    );
}
