import { ToastContainer } from 'react-toastify';
import QuizInfo from '../components/CreateQuiz/QuizInfo';
import Navbar from '../components/navbar/Navbar';

export default function Create() {
    // useEffect(() => {
    //     const unloadCallback = (event) => {
    //         event.preventDefault();
    //         // eslint-disable-next-line no-param-reassign
    //         event.returnValue = '';
    //         return '';
    //     };

    //     window.addEventListener('beforeunload', unloadCallback);
    //     return () => window.removeEventListener('beforeunload', unloadCallback);
    // }, []);
    return (
        <>
            <Navbar />
            <ToastContainer />
            <QuizInfo />
        </>
    );
}
