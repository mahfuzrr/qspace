import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import QuizContents from '../components/quiz/QuizContents';
import Sidebar from '../components/sidebar/Sidebar';

export default function Quiz() {
    return (
        <>
            <Navbar />
            <div className="container-fluid w-100 d-flex mt-5" id="quiz-section-content">
                <QuizContents />
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
