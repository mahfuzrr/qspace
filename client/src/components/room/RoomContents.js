/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import JoinRoom from '../joinRoom/JoinRoom';
import CreateRoom from './CreateRoom';
import RoomLists from './RoomLists';

export default function RoomContents({ data }) {
    const { email, role } = useSelector((state) => state.auth);
    const [roomLists, setRoomLists] = useState([]);
    const [Role, setRole] = useState('student');

    useEffect(() => {
        if (email && role === 'teacher') {
            if (data?.success && data?.message?.course) {
                setRoomLists(data?.message?.course);
            }
        } else if (email && role === 'student') {
            if (data?.success && data?.message?.course) {
                setRoomLists(data?.message?.course);
            }
        }
        setRole(role);
    }, [data, email, role]);

    return (
        <div className="container min-vh-100" id="room-content-left">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="container-fluid" id="room-inner-content">
                <div className="container d-flex justify-content-around" id="room-upper-header">
                    <div className="container">
                        <h5>Room List</h5>
                    </div>
                    <div className="container d-flex align-items-center justify-content-end">
                        <i
                            className="fa-solid fa-circle-plus"
                            data-bs-toggle="modal"
                            data-bs-target={Role === 'teacher' ? '#create-room-modal' : '#joinRoom'}
                        />
                    </div>
                </div>
                {Role === 'teacher' ? <CreateRoom /> : <JoinRoom />}

                <div className="container mt-5" id="all-room-cards">
                    <div className="container-fluid d-flex justify-content-center row gap-5">
                        {roomLists.map((content) => (
                            <RoomLists key={content?._id} content={content} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
