import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useJoinRoomMutation } from '../../features/joinRoom/joinRoom';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function JoinRoom() {
    const [accessCode, setAccessCode] = useState('');
    const [joinRoom] = useJoinRoomMutation();
    const { email } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (accessCode) {
            joinRoom({ accessCode, email });
        }
    };

    return (
        <div
            className="modal fade"
            id="joinRoom"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="joinRoomLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="joinRoomLabel">
                            Join Room
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            id="joinRoom-close-btn"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="container" id="join-room-body">
                            <form onSubmit={handleSubmit} id="join-room-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="join-room-code"
                                        name="join-room-code"
                                        onChange={(e) => setAccessCode(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="join-room-code">
                                        Access Code
                                    </label>
                                </div>

                                <div
                                    className="container-fluid d-flex justify-content-end align-items-center"
                                    id="join-room-btn-grp"
                                >
                                    <button className="btn" type="submit" id="join-room-btn">
                                        Join
                                    </button>
                                </div>
                            </form>
                            <div className="container-fluid d-flex flex-column">
                                <div className="container" id="join-room-note-content">
                                    <p className="mb-2">Note:</p>
                                    <ul>
                                        <li>Ask your teacher for a joining code.</li>
                                        <li>Then enter that code to join.</li>
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
