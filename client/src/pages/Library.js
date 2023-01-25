import { Toaster } from 'react-hot-toast';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import QuizControls from '../components/teacherQuiz/QuizControls';

export default function Library() {
    // const { role } = useSelector((state) => state.auth);
    return (
        <>
            <Navbar />
            <div className="container-fluid" id="quiz-dashboard">
                <Toaster />
                <div className="container-fluid" id="quiz-dashboard-contents">
                    <QuizControls />
                </div>
            </div>
            <Footer />
        </>
    );
}
