import Footer from '../components/footer/Footer';
import Loader from '../components/Loader/Loader';
import Navbar from '../components/navbar/Navbar';
import QuizContents from '../components/quiz/QuizContents';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetAllQuizQuery } from '../features/quiz/quizPageApi';

export default function Quiz() {
    const { data, isLoading } = useGetAllQuizQuery();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid w-100 d-flex mt-5" id="quiz-section-content">
                <QuizContents data={data} />
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
