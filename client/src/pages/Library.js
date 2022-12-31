import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import QuizControls from '../components/teacherQuiz/QuizControls';
import QuizFilters from '../components/teacherQuiz/QuizFilters';

export default function Library() {
    const { role } = useSelector((state) => state.auth);
    return (
        <>
            <Navbar />
            <div className="container-fluid" id="quiz-dashboard">
                <Toaster />
                <div className="container-fluid" id="quiz-dashboard-contents">
                    {role === 'teacher' && <QuizFilters />}
                    <QuizControls />
                </div>
            </div>
            <Footer />
        </>
    );
}
