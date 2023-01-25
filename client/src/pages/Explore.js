import ExploreContent from '../components/explore/ExploreContent';
import Footer from '../components/footer/Footer';
import NavBar from '../components/navbar/Navbar';

export default function Explore() {
    return (
        <>
            <NavBar />
            <div className="container overflow-hidden mt-5 mb-5 min-vh-100" id="explore-content">
                <div className="container-fluid pb-4" id="explore-wrap">
                    <ExploreContent />
                </div>
            </div>
            <Footer />
        </>
    );
}
