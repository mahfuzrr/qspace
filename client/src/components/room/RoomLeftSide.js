/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import roomCover from '../../assets/nature-background-9.jpg';
import { useGetCoursePostQuery } from '../../features/addPost/PostApi';
import TextEditor from '../textEditor/TextEditor';
import RoomPostCard from './RoomPostCard';

export default function RoomLeftSide() {
    const [isOpen, setIsOpen] = useState(false);
    const [postData, setPostData] = useState([]);
    const { roomId } = useParams();

    const { data } = useGetCoursePostQuery(roomId);

    const { role } = useSelector((state) => state.auth);

    const handleClose = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (data?.success) {
            setPostData(data?.message);
        }
    }, [data]);

    return (
        <div className="container" id="room-leftSide">
            <div className="container-fluid" id="room-cover-wrap">
                <img src={roomCover} alt="nature" id="room-cover" />
            </div>
            <div className="container-fluid mt-3 d-flex justify-content-between" id="room-add-sort">
                {/* <!-- add and buton section --> */}
                <div className="container" id="room-add">
                    {role === 'teacher' && (
                        <div className="dropdown">
                            <button
                                className="btn"
                                type="button"
                                id="room-add-btn"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleClose}
                            >
                                <IoAddCircleSharp size={23} />
                                <span className="d-block ms-2">Add Post</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* <!-- Add sort button section --> */}
                {/* <div className="container d-flex justify-content-end" id="room-sort">
                    
                    <div className="d-flex align-items-center justify-content-between" id="select">
                        <label htmlFor="sort-content" className="form-label d-block p-0 m-0">
                            Sort by:
                        </label>
                        <select
                            id="sort-content"
                            className="form-select form-select-sm m-0"
                            name="sort-content"
                        >
                            <option value="quiz">Quiz</option>
                            <option value="post">Post</option>
                        </select>
                    </div>  
                </div> */}
            </div>

            {isOpen && <TextEditor handleClose={handleClose} />}

            <div className="container-fluid" id="room-allPost">
                <div className="container-fluid" id="room-post-cards">
                    {postData
                        .slice(0)
                        .reverse()
                        .map((post) => (
                            <RoomPostCard key={post._id} content={post} />
                        ))}
                </div>
            </div>
        </div>
    );
}
