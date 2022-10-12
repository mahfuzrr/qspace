import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import ProfileContents from '../components/profile/ProfileContents';

export default function Profile() {
    return (
        <>
            <Navbar />
            <div className="container overflow-hidden d-flex" id="profile-sidebar">
                <ProfileContents />
            </div>
            <Footer />
        </>
    );
}
