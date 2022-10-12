import Footer from '../components/footer/Footer';
import HomeContent from '../components/home/HomeContent';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex mt-5 mb-5" id="home-content">
                <HomeContent />
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
