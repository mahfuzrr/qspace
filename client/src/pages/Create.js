import { Toaster } from 'react-hot-toast';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import QuizControls from '../components/teacherQuiz/QuizControls';
import QuizFilters from '../components/teacherQuiz/QuizFilters';

export default function Create() {
    return (
        <>
            <Navbar />
            <div className="container-fluid" id="quiz-dashboard">
                <Toaster />
                <div className="container-fluid" id="quiz-dashboard-contents">
                    <QuizFilters />
                    <QuizControls />
                </div>
            </div>
            <Footer />
        </>
    );
}
