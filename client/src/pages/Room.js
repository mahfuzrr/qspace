import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import RoomContents from '../components/room/RoomContents';
import Sidebar from '../components/sidebar/Sidebar';

export default function Room() {
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex mt-5 mb-5" id="home-content">
                <RoomContents />
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
