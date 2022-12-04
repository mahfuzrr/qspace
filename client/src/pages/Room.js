import Footer from '../components/footer/Footer';
import Loader from '../components/Loader/Loader';
import Navbar from '../components/navbar/Navbar';
import RoomContents from '../components/room/RoomContents';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetRoomsQuery } from '../features/createRoom/createRoomApi';

export default function Room() {
    const { data, isLoading } = useGetRoomsQuery({ count: 5 }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex mt-5 mb-5" id="home-content">
                <RoomContents data={data} />
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
