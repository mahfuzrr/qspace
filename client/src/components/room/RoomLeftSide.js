/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
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
                            >
                                <i className="fa-solid fa-circle-plus d-block" />
                                <span className="d-block ms-2">Add</span>
                            </button>

                            <ul
                                className="dropdown-menu"
                                aria-labelledby="room-add-btn"
                                id="add-room-post-quiz"
                            >
                                <li className="dropdown-item">
                                    <p className="dropdown-item m-0">Add Quiz</p>
                                </li>
                                <li>
                                    <p
                                        className="dropdown-item m-0"
                                        role="presentation"
                                        onClick={handleClose}
                                    >
                                        Add Post
                                    </p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                {/* <!-- add and buton section --> */}

                {/* <!-- Add sort button section --> */}
                <div className="container d-flex justify-content-end" id="room-sort">
                    {/* <!-- sort button section --> */}
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
                    {/* <!-- sort button section --> */}
                </div>
                {/* <!-- Add sort button section --> */}
            </div>

            {isOpen && <TextEditor handleClose={handleClose} />}

            <div className="container-fluid" id="room-allPost">
                {postData
                    .slice(0)
                    .reverse()
                    .map((post) => (
                        <RoomPostCard key={post._id} content={post} />
                    ))}
            </div>
        </div>
    );
}
