import { useEffect, useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useGetInfoQuery } from '../../features/singleRoom/getRoomInfo';
import RoomTasks from './RoomTasks';

export default function RoomRightSide() {
    const { roomId } = useParams();
    const [roomInfo, setRoomInfo] = useState({});
    const { role } = useSelector((state) => state.auth);

    const { data } = useGetInfoQuery(roomId);

    const handleCopy = () => {
        toast.success('Copied!', {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
        });
    };

    useEffect(() => {
        if (data?.success) {
            setRoomInfo(data?.message);
        }
    }, [data]);

    return (
        <div className="container" id="room-rightSide">
            <ToastContainer autoClose={1000} />
            <div className="container-fluid" id="room-right-allContents">
                {/* <!-- About Course starts --> */}
                <div className="container d-flex flex-column" id="about-course">
                    <div
                        className="container-fluid d-flex align-items-center"
                        id="room-about-header"
                    >
                        <i className="fa-solid fa-circle-info me-2" />
                        <h6 className="m-0">About Course</h6>
                    </div>
                    {/* <!-- Course Details --> */}
                    <div className="container-fluid" id="course-details">
                        <p className="m-0">
                            <span className="about-mini-title">Course Name: </span>
                            {roomInfo?.title}
                        </p>
                        <p className="m-0">
                            <span className="about-mini-title">Course Code: </span>
                            {roomInfo?.courseCode}
                        </p>
                        <p className="m-0">
                            <span className="about-mini-title">Teacher Name: </span>
                            {roomInfo?.teacherName}
                        </p>
                        {role === 'teacher' && (
                            <p className="ms-0 mt-3 me-0 mb-0">
                                <span className="about-mini-title">Access Code: </span>
                                {roomInfo?.accessCode}
                                <span id="copy-to-clip">
                                    <CopyToClipboard
                                        text={roomInfo?.accessCode}
                                        onCopy={handleCopy}
                                    >
                                        <i className="ms-3 fa-solid fa-copy" />
                                    </CopyToClipboard>
                                </span>
                            </p>
                        )}
                    </div>
                    {/* <!-- Course Details --> */}

                    <div className="container-fluid" id="course-description">
                        <p className="m-0">
                            <span className="about-mini-title">Description: </span>
                            {roomInfo?.description}
                        </p>
                    </div>
                </div>
                {/* <!-- About course ends --> */}

                {/* <!-- Student Progress --> */}
                <div className="container" id="course-progress">
                    <div className="container-fluid d-flex align-items-center position-relative">
                        <i className="fa-solid fa-chart-simple me-3" />
                        <p className="m-0">Student Progress</p>
                        <i className="fa-solid fa-arrow-right" />
                    </div>
                </div>

                <RoomTasks code={roomInfo?.accessCode} />
            </div>
        </div>
    );
}
