import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useCreateRoomMutation } from '../../features/createRoom/createRoomApi';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function CreateRoom() {
    const [title, setTitle] = useState('');
    const [subjCode, setSubjCode] = useState('');
    const [description, setDescription] = useState('');

    const { email } = useSelector((state) => state.auth);
    const [createRoom] = useCreateRoomMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitObject = {
            title,
            email,
            courseCode: subjCode,
            description,
        };

        createRoom(submitObject);
        setTitle('');
        setSubjCode('');
        setDescription('');
        toast.success('Room created successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
        });
    };

    return (
        <div
            className="modal fade"
            id="create-room-modal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="create-room-modalLabel"
            aria-hidden="true"
        >
            <ToastContainer autoClose={1500} />
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="container d-flex align-items-center" id="modalHeader">
                            <h5 className="modal-title" id="create-room-modalLabel">
                                Create Room
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="close-create-btn"
                            />
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container" id="create-room-form-body">
                            <form onSubmit={handleSubmit} id="create-room-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        required
                                    />
                                    <label className="form-label" htmlFor="title">
                                        Title
                                    </label>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="courseCode"
                                        onChange={(e) => setSubjCode(e.target.value)}
                                        value={subjCode}
                                        required
                                    />
                                    <label className="form-label" htmlFor="courseCode">
                                        Subject Code
                                    </label>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        name="course-description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        required
                                    />
                                    <label className="form-label" htmlFor="course-description">
                                        Description
                                    </label>
                                </div>

                                <div
                                    className="container-fluid d-flex justify-content-end align-items-center"
                                    id="room-create-btn-grp"
                                >
                                    <button className="btn" type="submit" id="room-create-btn">
                                        Create
                                    </button>
                                </div>
                            </form>
                            <div className="container-fluid d-flex flex-column">
                                <div className="container" id="note-content">
                                    <p>Note:</p>
                                    <ul>
                                        <li>For joining code, enter the room after creating</li>
                                        <li>Invite students via joining code</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
