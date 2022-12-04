import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';
import HomeContent from '../components/home/HomeContent';
import Loader from '../components/Loader/Loader';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetPrivatePostQuery } from '../features/addPost/PostApi';

export default function Home() {
    const { email } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetPrivatePostQuery(email);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex mt-5 mb-5" id="home-content">
                <HomeContent data={data} />
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
